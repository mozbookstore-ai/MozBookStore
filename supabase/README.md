# Configuração do Supabase

O site continua estático, mas o login, os pedidos, as aprovações e os PDFs
privados dependem de um projecto Supabase. Não publique a aplicação até concluir
estes passos:

1. Crie um projecto no Supabase e abra o **SQL Editor**.
2. Execute todo o conteúdo de `setup.sql`. O script cria/actualiza os perfis,
   produtos (incluindo `price_mzn`), encomendas, políticas RLS e o bucket
   privado `ebooks-private`. Na tabela `products` existente, o script migra
   `titulo` para `title` quando necessário, adiciona `price_mzn` e tenta
   recuperar preços de colunas antigas `preco`, `preco_mzn` ou `price`.
   Se não conseguir identificar um preço, indica os IDs e títulos que precisam
   de correcção antes de continuar. O trigger de encomendas também lê título
   como `title` ou `titulo` e valida `price_mzn`.
3. A ligação para o projecto actual está configurada em `../script.js`. Se
   mudares de projecto, actualiza `CONFIG_SUPABASE.url` e
   `CONFIG_SUPABASE.anonKey` com o **Project URL** e a chave publicável
   (`anon`/`publishable`) de **Project Settings → API**. Essa chave pública pode
   estar no cliente; nunca uses a `service_role`/secret key no JavaScript.
4. Em **Authentication → URL Configuration**, registe o URL publicado do site
   como Site URL e como Redirect URL. Sirva o site por HTTP/HTTPS; não use
   `file://`. Para GitHub Pages, use
   `https://mozbookstore-ai.github.io/MozBookStore/` como Site URL e adicione
   esse mesmo endereço à lista de Redirect URLs. O código usa esse endereço
   para a recuperação de palavra-passe.
5. Active a confirmação de email nas definições de autenticação. Crie e confirme
   a conta `mozbookstore@gmail.com` no site. Depois execute no SQL Editor:
   `update public.profiles set role = 'admin' where lower(email) = 'mozbookstore@gmail.com';`
   O papel administrativo não é atribuído pelo navegador nem automaticamente
   pelo email: só quem tem acesso ao SQL Editor pode concedê-lo.
6. Em **Storage → ebooks-private**, crie a pasta `guias` e carregue os PDFs
   com estes nomes exactos:
   - ID 1: `calistenia.pdf`
   - ID 2: `ciclismo-para-iniciantes.pdf`
   - ID 3: `corrida-para-iniciantes.pdf`
   - ID 4: `crossfit-para-iniciantes.pdf`
   - ID 5: `culinaria-para-iniciantes.pdf`
   - ID 6: `escalada-para-iniciantes.pdf`
   - ID 7: `futebol-para-iniciantes.pdf`
   - ID 8: `ginastica-para-iniciantes.pdf`
   - ID 9: `musculacao-para-iniciantes.pdf`
   - ID 10: `natacao-para-iniciantes.pdf`
   - ID 11: `patinagem-no-gelo.pdf`
   - ID 12: `queda-de-braco.pdf`
   - ID 13: `skate-para-iniciantes.pdf`
   O caminho, incluindo `guias/`, está configurado no JavaScript e em
   `products.pdf_path`. Executar `setup.sql` remapeia também as encomendas
   existentes para os novos IDs, preservando os livros comprados. Se alterar
   qualquer nome, actualize ambos e volte a executar `setup.sql`. O bucket é
   privado: os links assinados permitem o download apenas ao administrador e
   a clientes com encomenda aprovada.

## Funcionamento

- O cliente regista-se/inicia sessão antes de comprar.
- Moçambique apresenta M-Pesa e e-Mola em MZN. África do Sul/outros países
  apresenta transferência bancária em ZAR.
- O carrinho aceita vários títulos e quantidades ajustáveis por título. Os
  preços são actualizados automaticamente; o checkout grava uma linha por
  título, com a quantidade e o total calculado no banco a partir de
  `products.price_mzn`.
- Após registar o pedido pendente, o checkout abre o WhatsApp com um resumo
  pré-preenchido contendo os títulos, quantidades, preços, total e referência.
  O cliente deve confirmar o envio na aplicação do WhatsApp. Os formulários de
  pedidos e feedback também abrem mensagens pré-preenchidas no WhatsApp. O site
  não utiliza EmailJS para notificar pedidos ou alterações de estado.
- O catálogo segue a ordem numérica dos IDs (1–13), não a ordem alfabética.
- O registo de atividade apresenta ações principais (carrinho, formulários,
  autenticação, compras, navegação e quiz) com data e hora local até aos
  segundos. Esse registo fica guardado apenas no navegador/dispositivo actual;
  não inclui palavras-passe, referências de pagamento nem o conteúdo submetido
  nos formulários. As compras apresentam também as datas de criação e revisão
  guardadas no Supabase.
- `mozbookstore@gmail.com` vê as encomendas no botão **Administração** e pode
  aprovar ou rejeitar. A aprovação concede acesso ao PDF privado.
- A administração tem um resumo de vendas que conta apenas encomendas
  aprovadas, indica o número de encomendas e exemplares vendidos, e mostra a
  receita separada em MZN e ZAR, sem conversão ou soma entre moedas.
- Compras aprovadas ou rejeitadas movidas para a **Lixeira** podem ser
  restauradas durante 30 dias. O Supabase executa a remoção permanente de
  encomendas expiradas a cada 10 minutos através da extensão `pg_cron`; execute
  `setup.sql` para criar a coluna, permissões e tarefa agendada. Se o projecto
  não permitir activar extensões pelo SQL Editor, active `pg_cron` em
  **Database → Extensions** e volte a executar o script.
- **Minhas compras** mostra o histórico e só apresenta o botão de download para
  livros aprovados. Tanto o cliente como a administração podem apagar compras
  aprovadas ou rejeitadas, que passam para a Lixeira e deixam de conceder
  acesso ao PDF enquanto estiverem lá. Compras pendentes não podem ser
  apagadas. Links de download já emitidos permanecem válidos até expirarem,
  no máximo após 60 segundos.
- O link **Esqueceu-se da palavra-passe?** envia o email de recuperação e
  redirecciona para `https://mozbookstore-ai.github.io/MozBookStore/`, onde a
  pessoa define a nova palavra-passe.

Após alterar permissões ou executar uma actualização, volte a executar
`setup.sql` no SQL Editor para aplicar as políticas e permissões de exclusão.

Os PDFs não estão incluídos neste repositório: devem ser fornecidos e carregados
no bucket após a criação do projecto. As instruções de pagamento e os preços
devem ser confirmados no código e no banco antes da publicação.
