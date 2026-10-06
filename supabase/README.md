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
   `file://`.
   Para a recuperação de palavra-passe, inclua também
   `https://mozbookstore.netlify.app/` na lista de Redirect URLs.
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
- A referência submetida cria uma encomenda pendente. O preço e a moeda são
  calculados no banco de dados a partir de `products.price_mzn`, não aceites do
  navegador.
- Depois de registar uma encomenda, o site envia uma notificação de aprovação
  pendente para `emailDestino` em `../script.js`, através do serviço e template
  EmailJS já configurados. No template, confirme que o destinatário usa
  `{{to_email}}` e que o conteúdo inclui `{{mensagem}}`. Se o envio falhar, a
  encomenda continua registada e pendente, e o cliente recebe um aviso.
- O catálogo segue a ordem numérica dos IDs (1–13), não a ordem alfabética.
- `mozbookstore@gmail.com` vê as encomendas no botão **Administração** e pode
  aprovar ou rejeitar. A aprovação concede acesso ao PDF privado.
- **Minhas compras** mostra o histórico e só apresenta o botão de download para
  livros aprovados. Tanto o cliente como a administração podem apagar compras
  aprovadas ou rejeitadas; a exclusão é definitiva e remove o acesso ao PDF.
  Compras pendentes não podem ser apagadas. Links de download já emitidos
  permanecem válidos até expirarem, no máximo após 60 segundos.
- O link **Esqueceu-se da palavra-passe?** envia o email de recuperação e
  redirecciona para `https://mozbookstore.netlify.app/`, onde a pessoa define a
  nova palavra-passe.

Após alterar permissões ou executar uma actualização, volte a executar
`setup.sql` no SQL Editor para aplicar as políticas e permissões de exclusão.

Os PDFs não estão incluídos neste repositório: devem ser fornecidos e carregados
no bucket após a criação do projecto. As instruções de pagamento e os preços
devem ser confirmados no código e no banco antes da publicação.
