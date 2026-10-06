-- MozBookStore Supabase schema. Safe to run again after the initial setup.

begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id integer primary key,
  title text not null,
  price_mzn integer not null check (price_mzn > 0),
  pdf_path text not null
);

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'products'
      and column_name = 'title'
  ) then
    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'products'
        and column_name = 'titulo'
    ) then
      alter table public.products rename column titulo to title;
    else
      alter table public.products add column title text;
    end if;
  elsif exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'products'
      and column_name = 'titulo'
  ) then
    execute format(
      'update public.products set title = titulo where title is null or btrim(title) = %L',
      ''
    );
  end if;

  if exists (
    select 1
    from public.products
    where title is null or btrim(title) = ''
  ) then
    raise exception 'Every product needs a title. Populate title or titulo before running setup.sql.';
  end if;
end;
$$;

alter table public.products
  alter column title set not null;

alter table public.products
  add column if not exists pdf_path text;

alter table public.products
  add column if not exists price_mzn numeric(10, 2);

update public.products
set price_mzn = case lower(btrim(title))
  when 'calistenia para iniciantes' then 280
  when 'ciclismo para iniciantes' then 280
  when 'corrida para iniciantes' then 250
  when 'crossfit para iniciantes' then 300
  when 'culinária para iniciantes' then 250
  when 'culinaria para iniciantes' then 250
  when 'escalada para iniciantes' then 300
  when 'futebol para iniciantes' then 250
  when 'ginástica para iniciante' then 270
  when 'ginástica para iniciantes' then 270
  when 'ginastica para iniciante' then 270
  when 'ginastica para iniciantes' then 270
  when 'musculação para iniciantes' then 300
  when 'musculacao para iniciantes' then 300
  when 'natação para iniciantes' then 250
  when 'natacao para iniciantes' then 250
  when 'patinagem no gelo para iniciantes' then 300
  when 'queda de braço para iniciantes' then 220
  when 'queda de braco para iniciantes' then 220
  when 'skate para iniciantes' then 320
  else price_mzn
end;

update public.products as product
set price_mzn = nullif(
  regexp_replace(
    coalesce(
      nullif(to_jsonb(product) ->> 'preco', ''),
      nullif(to_jsonb(product) ->> 'preco_mzn', ''),
      nullif(to_jsonb(product) ->> 'price', '')
    ),
    '[^0-9.]',
    '',
    'g'
  ),
  ''
)::numeric
where product.price_mzn is null;

do $$
declare
  products_without_price text;
begin
  select string_agg(
    format('ID %s (%s)', id, coalesce(title, 'sem título')),
    ', ' order by id
  )
  into products_without_price
  from public.products
  where price_mzn is null or price_mzn <= 0;

  if products_without_price is not null then
    raise exception
      'Não foi possível determinar um price_mzn positivo para: %. Corrija o título ou preencha a coluna preco/preco_mzn/price.',
      products_without_price;
  end if;
end;
$$;

alter table public.products
  alter column price_mzn set not null;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id integer not null references public.products (id),
  product_title text not null,
  amount numeric(10, 2) not null,
  currency text not null check (currency in ('MZN', 'ZAR')),
  region text not null check (region in ('mozambique', 'other')),
  payment_method text not null check (payment_method in ('mpesa', 'emola', 'sa_bank')),
  transaction_reference text not null
    check (char_length(transaction_reference) between 1 and 160),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references public.profiles (id)
);

create unique index if not exists orders_one_approved_product_per_user
  on public.orders (user_id, product_id)
  where status = 'approved';

-- Stage changed IDs first so product swaps preserve foreign keys and existing orders.
create temporary table mozbookstore_product_id_remap (
  old_id integer primary key,
  new_id integer not null,
  staging_id integer not null unique
) on commit drop;

insert into pg_temp.mozbookstore_product_id_remap (old_id, new_id, staging_id)
with target_products(title, new_id) as (
  values
    ('Calistenia para Iniciantes', 1),
    ('Ciclismo para Iniciantes', 2),
    ('Corrida para Iniciantes', 3),
    ('CrossFit para Iniciantes', 4),
    ('Culinária para Iniciantes', 5),
    ('Escalada para Iniciantes', 6),
    ('Futebol para Iniciantes', 7),
    ('Ginástica para Iniciante', 8),
    ('Musculação para Iniciantes', 9),
    ('Natação para Iniciantes', 10),
    ('Patinagem no Gelo para Iniciantes', 11),
    ('Queda de Braço para Iniciantes', 12),
    ('Skate para Iniciantes', 13)
)
select
  products.id,
  target_products.new_id,
  (select coalesce(max(id), 0) from public.products)
    + row_number() over (order by products.id)::integer
from public.products
join target_products on target_products.title = products.title
where products.id <> target_products.new_id;

insert into public.products (id, title, price_mzn, pdf_path)
select remap.staging_id, products.title, products.price_mzn, products.pdf_path
from pg_temp.mozbookstore_product_id_remap as remap
join public.products on products.id = remap.old_id;

do $$
begin
  if exists (
    select 1
    from pg_trigger
    where tgrelid = 'public.orders'::regclass
      and tgname = 'protect_order_update_before_update'
      and not tgisinternal
  ) then
    execute 'alter table public.orders disable trigger protect_order_update_before_update';
  end if;
end;
$$;

update public.orders
set product_id = remap.staging_id
from pg_temp.mozbookstore_product_id_remap as remap
where public.orders.product_id = remap.old_id;

delete from public.products
using pg_temp.mozbookstore_product_id_remap as remap
where public.products.id = remap.old_id;

insert into public.products (id, title, price_mzn, pdf_path) values
  (1, 'Calistenia para Iniciantes', 280, 'guias/calistenia.pdf'),
  (2, 'Ciclismo para Iniciantes', 280, 'guias/ciclismo-para-iniciantes.pdf'),
  (3, 'Corrida para Iniciantes', 250, 'guias/corrida-para-iniciantes.pdf'),
  (4, 'CrossFit para Iniciantes', 300, 'guias/crossfit-para-iniciantes.pdf'),
  (5, 'Culinária para Iniciantes', 250, 'guias/culinaria-para-iniciantes.pdf'),
  (6, 'Escalada para Iniciantes', 300, 'guias/escalada-para-iniciantes.pdf'),
  (7, 'Futebol para Iniciantes', 250, 'guias/futebol-para-iniciantes.pdf'),
  (8, 'Ginástica para Iniciante', 270, 'guias/ginastica-para-iniciantes.pdf'),
  (9, 'Musculação para Iniciantes', 300, 'guias/musculacao-para-iniciantes.pdf'),
  (10, 'Natação para Iniciantes', 250, 'guias/natacao-para-iniciantes.pdf'),
  (11, 'Patinagem no Gelo para Iniciantes', 300, 'guias/patinagem-no-gelo.pdf'),
  (12, 'Queda de Braço para Iniciantes', 220, 'guias/queda-de-braco.pdf'),
  (13, 'Skate para Iniciantes', 320, 'guias/skate-para-iniciantes.pdf')
on conflict (id) do update set
  title = excluded.title,
  price_mzn = excluded.price_mzn,
  pdf_path = excluded.pdf_path;

update public.orders
set product_id = remap.new_id
from pg_temp.mozbookstore_product_id_remap as remap
where public.orders.product_id = remap.staging_id;

delete from public.products
using pg_temp.mozbookstore_product_id_remap as remap
where public.products.id = remap.staging_id;

do $$
begin
  if exists (
    select 1
    from pg_trigger
    where tgrelid = 'public.orders'::regclass
      and tgname = 'protect_order_update_before_update'
      and not tgisinternal
  ) then
    execute 'alter table public.orders enable trigger protect_order_update_before_update';
  end if;
end;
$$;

alter table public.products
  alter column pdf_path set not null;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

create or replace function public.handle_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'user'
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = case
      when excluded.full_name <> '' then excluded.full_name
      else public.profiles.full_name
    end,
    role = public.profiles.role;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_or_updated on auth.users;
create trigger on_auth_user_created_or_updated
  after insert or update of email, raw_user_meta_data on auth.users
  for each row execute function public.handle_auth_user();

create or replace function public.prepare_order()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
declare
  product_data jsonb;
  product_title text;
  product_price_mzn numeric;
begin
  if new.user_id <> (select auth.uid()) then
    raise exception 'An order can only be created for the signed-in user.';
  end if;

  select to_jsonb(products) into product_data
  from public.products
  where id = new.product_id;

  if not found then
    raise exception 'The selected product does not exist.';
  end if;

  product_title := coalesce(
    nullif(product_data ->> 'title', ''),
    nullif(product_data ->> 'titulo', '')
  );
  product_price_mzn := coalesce(
    nullif(product_data ->> 'price_mzn', '')::numeric,
    nullif(
      regexp_replace(
        coalesce(
          nullif(product_data ->> 'preco_mzn', ''),
          nullif(product_data ->> 'preco', ''),
          nullif(product_data ->> 'price', '')
        ),
        '[^0-9.]',
        '',
        'g'
      ),
      ''
    )::numeric
  );

  if product_title is null then
    raise exception 'The product % has no title (title/titulo).', new.product_id;
  end if;
  if product_price_mzn is null or product_price_mzn <= 0 then
    raise exception 'The product % has no valid price_mzn.', new.product_id;
  end if;

  if new.region = 'mozambique' then
    if new.payment_method not in ('mpesa', 'emola') then
      raise exception 'Choose M-Pesa or e-Mola for Mozambique.';
    end if;
    new.amount := product_price_mzn;
    new.currency := 'MZN';
  elsif new.region = 'other' then
    if new.payment_method <> 'sa_bank' then
      raise exception 'Choose bank transfer for South Africa and other countries.';
    end if;
    new.amount := round(product_price_mzn / 3.5, 2);
    new.currency := 'ZAR';
  else
    raise exception 'The selected region is not supported.';
  end if;

  new.product_title := product_title;
  new.status := 'pending';
  new.reviewed_at := null;
  new.reviewed_by := null;
  return new;
end;
$$;

drop trigger if exists prepare_order_before_insert on public.orders;
create trigger prepare_order_before_insert
  before insert on public.orders
  for each row execute function public.prepare_order();

create or replace function public.protect_order_update()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Only an administrator can review orders.';
  end if;
  if new.id <> old.id
     or new.user_id <> old.user_id
     or new.product_id <> old.product_id
     or new.product_title <> old.product_title
     or new.amount <> old.amount
     or new.currency <> old.currency
     or new.region <> old.region
     or new.payment_method <> old.payment_method
     or new.transaction_reference <> old.transaction_reference
     or new.created_at <> old.created_at then
    raise exception 'Order details cannot be changed during review.';
  end if;
  if new.status not in ('pending', 'approved', 'rejected') then
    raise exception 'Invalid order status.';
  end if;
  new.reviewed_by := (select auth.uid());
  new.reviewed_at := now();
  return new;
end;
$$;

drop trigger if exists protect_order_update_before_update on public.orders;
create trigger protect_order_update_before_update
  before update on public.orders
  for each row execute function public.protect_order_update();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Users and admins can read profiles" on public.profiles;
create policy "Users and admins can read profiles"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());

drop policy if exists "Products are visible to everyone" on public.products;
create policy "Products are visible to everyone"
  on public.products for select to anon, authenticated
  using (true);

drop policy if exists "Users can read their orders and admins can read all" on public.orders;
create policy "Users can read their orders and admins can read all"
  on public.orders for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

drop policy if exists "Users can submit pending orders for themselves" on public.orders;
create policy "Users can submit pending orders for themselves"
  on public.orders for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and status = 'pending'
    and reviewed_at is null
    and reviewed_by is null
  );

drop policy if exists "Admins can review orders" on public.orders;
create policy "Admins can review orders"
  on public.orders for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Users and admins can delete finalized orders" on public.orders;
create policy "Users and admins can delete finalized orders"
  on public.orders for delete to authenticated
  using (
    status in ('approved', 'rejected')
    and (
      user_id = (select auth.uid())
      or public.is_admin()
    )
  );

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ebooks-private', 'ebooks-private', false, 52428800, array['application/pdf'])
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Approved customers and admins can download ebooks" on storage.objects;
create policy "Approved customers and admins can download ebooks"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'ebooks-private'
    and (
      public.is_admin()
      or exists (
        select 1
        from public.orders
        join public.products on products.id = orders.product_id
        where orders.user_id = (select auth.uid())
          and orders.status = 'approved'
          and storage.objects.name = products.pdf_path
      )
    )
  );

drop policy if exists "Admins can upload ebooks" on storage.objects;
create policy "Admins can upload ebooks"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'ebooks-private' and public.is_admin());

drop policy if exists "Admins can update ebooks" on storage.objects;
create policy "Admins can update ebooks"
  on storage.objects for update to authenticated
  using (bucket_id = 'ebooks-private' and public.is_admin())
  with check (bucket_id = 'ebooks-private' and public.is_admin());

drop policy if exists "Admins can delete ebooks" on storage.objects;
create policy "Admins can delete ebooks"
  on storage.objects for delete to authenticated
  using (bucket_id = 'ebooks-private' and public.is_admin());

grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant select on public.profiles to authenticated;
grant select, insert, update on public.orders to authenticated;
revoke delete on public.orders from anon, public;
grant delete on public.orders to authenticated;

insert into public.profiles (id, email, full_name)
select
  id,
  lower(email),
  coalesce(raw_user_meta_data ->> 'full_name', '')
from auth.users
on conflict (id) do nothing;

-- After the administrator account is registered and verified, run:
-- update public.profiles set role = 'admin' where lower(email) = 'mozbookstore@gmail.com';

commit;
