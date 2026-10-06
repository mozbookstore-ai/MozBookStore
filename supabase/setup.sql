-- MozBookStore Supabase schema. Safe to run again after the initial setup.

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
  price_mzn integer not null check (price_mzn > 0)
);

insert into public.products (id, title, price_mzn) values
  (1, 'Natação para Iniciantes', 250),
  (2, 'Musculação para Iniciantes', 300),
  (3, 'Futebol para Iniciantes', 250),
  (4, 'CrossFit para Iniciantes', 300),
  (5, 'Ciclismo para Iniciantes', 280),
  (6, 'Ginástica para Iniciante', 270),
  (7, 'Escalada para Iniciantes', 300),
  (8, 'Corrida para Iniciantes', 250),
  (9, 'Culinária para Iniciantes', 250),
  (10, 'Queda de Braço para Iniciantes', 220),
  (11, 'Calistenia para Iniciantes', 280),
  (12, 'Patinagem no Gelo para Iniciantes', 300)
on conflict (id) do update set
  title = excluded.title,
  price_mzn = excluded.price_mzn;

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
  product_row public.products%rowtype;
begin
  if new.user_id <> (select auth.uid()) then
    raise exception 'An order can only be created for the signed-in user.';
  end if;

  select * into product_row
  from public.products
  where id = new.product_id;

  if not found then
    raise exception 'The selected product does not exist.';
  end if;

  if new.region = 'mozambique' then
    if new.payment_method not in ('mpesa', 'emola') then
      raise exception 'Choose M-Pesa or e-Mola for Mozambique.';
    end if;
    new.amount := product_row.price_mzn;
    new.currency := 'MZN';
  elsif new.region = 'other' then
    if new.payment_method <> 'sa_bank' then
      raise exception 'Choose bank transfer for South Africa and other countries.';
    end if;
    new.amount := round(product_row.price_mzn / 3.5, 2);
    new.currency := 'ZAR';
  else
    raise exception 'The selected region is not supported.';
  end if;

  new.product_title := product_row.title;
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
        where orders.user_id = (select auth.uid())
          and orders.status = 'approved'
          and storage.objects.name = 'product-' || orders.product_id || '.pdf'
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

insert into public.profiles (id, email, full_name)
select
  id,
  lower(email),
  coalesce(raw_user_meta_data ->> 'full_name', '')
from auth.users
on conflict (id) do nothing;

-- After the administrator account is registered and verified, run:
-- update public.profiles set role = 'admin' where lower(email) = 'mozbookstore@gmail.com';
