// --- CONFIGURAÇÃO DE CONTACTOS & DADOS BANCÁRIOS SA ---
const CONFIG_NOTIFICACOES = {
  numeroWhatsAppPrincipal: "258867568918",
  emailJsPublicKey: "-ft_UtWIa-tk49VHy",
  emailJsServiceId: "service_ldwmjo9",
  emailJsTemplateId: "template_qgdxq0d",
  emailDestino: "mozbookstore@gmail.com",
};

const CONFIG_SUPABASE = {
  url: "https://ovvhhpndakdmhdhqsnwf.supabase.co",
  anonKey: "sb_publishable_CSLkAAdsYkK6UpWqQFZgzQ_7vmklnHe",
};

const CONTAS_PAGAMENTO = {
  mpesa: ["+258 85 067 3457", "+258 85 636 7798"],
  emola: ["+258 86 756 8918"],
  sabank: {
    banco: "FNB (South Africa)",
    titular: "Kyara de Fátima Nhapossa",
    conta: "63211865647",
    branchCode: "255355",
    tipo: "Savings / Cheque Account",
  },
};

const CAMINHOS_PDF = {
  1: "guias/calistenia.pdf",
  2: "guias/ciclismo-para-iniciantes.pdf",
  3: "guias/corrida-para-iniciantes.pdf",
  4: "guias/crossfit-para-iniciantes.pdf",
  5: "guias/culinaria-para-iniciantes.pdf",
  6: "guias/escalada-para-iniciantes.pdf",
  7: "guias/futebol-para-iniciantes.pdf",
  8: "guias/ginastica-para-iniciantes.pdf",
  9: "guias/musculacao-para-iniciantes.pdf",
  10: "guias/natacao-para-iniciantes.pdf",
  11: "guias/patinagem-no-gelo.pdf",
  12: "guias/queda-de-braco.pdf",
  13: "guias/skate-para-iniciantes.pdf",
};

const TAXA_CAMBIO_ZAR = 3.5;

function converterPreco(precoMT) {
  const valorNumerico = parseFloat(precoMT.replace(" MT", ""));
  const valorZAR = (valorNumerico / TAXA_CAMBIO_ZAR).toFixed(2);
  return `R ${valorZAR}`;
}

// --- VARIÁVEIS GLOBAIS ---
let idiomaAtual = "pt";
let produtoSelecionado = null;
let categoriaAtivaAtual = "todos";
let supabaseClient = null;
let utilizadorAtual = null;
let perfilAtual = null;
let produtoCompraPendente = null;
let catalogOrderWarning = false;

// --- DICIONÁRIO DE TRADUÇÕES (PT / en-ZA) ---
const traducoes = {
  pt: {
    idiomaLabel: "🌐 Change language / Mudar idioma:",
    btnLogin: "🔑 Entrar / Registar",
    btnCompras: "🛒 Minhas compras",
    btnAdmin: "⚙️ Administração",
    btnLogout: "Sair",
    libraryTitle: "🛒 As Minhas compras",
    adminTitle: "⚙️ Aprovar pagamentos",
    backCatalog: "Voltar ao catálogo",
    lblRegiao: "País / Região",
    regiaoMozambique: "Moçambique",
    regiaoOutros: "África do Sul / Outros países",
    lblStatusPedido: "Estado",
    statusPendente: "Pendente de aprovação",
    statusAprovado: "Aprovado",
    statusRejeitado: "Rejeitado",
    btnDownload: "⬇️ Descarregar PDF",
    btnApprove: "Aprovar",
    btnReject: "Rejeitar / Revogar",
    btnRestore: "Reabrir para aprovação",
    lblSolicitante: "Cliente",
    lblReferenciaAdmin: "Referência",
    authRequired: "Inicie sessão para comprar e aceder à sua biblioteca.",
    authNotConfigured: "A ligação à plataforma ainda não está configurada.",
    orderPending:
      "Confirmação enviada. O acesso ao livro será libertado após a aprovação do pagamento.",
    orderNotificationFailed:
      "A encomenda ficou registada e pendente de aprovação, mas não foi possível enviar o email de notificação à equipa.",
    noOrders: "Ainda não existem encomendas.",
    noPurchases: "Ainda não tem compras.",
    adminOnly: "Esta área está disponível apenas para a administração.",
    orderSaved: "Estado da encomenda actualizado.",
    btnDeleteOrder: "Apagar compra",
    orderDeleting: "A apagar a compra...",
    orderDeleteError: "Não foi possível apagar a compra.",
    confirmDeleteOrder:
      "Apagar definitivamente a compra de “{book}”? O acesso ao livro será removido.",
    orderDeleted: "Compra apagada e acesso removido.",
    resetPasswordLink: "Esqueceu-se da palavra-passe?",
    showPassword: "Mostrar palavra-passe",
    hidePassword: "Ocultar palavra-passe",
    resetPasswordTitle: "Definir nova palavra-passe",
    newPasswordLabel: "Nova palavra-passe",
    confirmPasswordLabel: "Confirmar palavra-passe",
    savePasswordButton: "Guardar nova palavra-passe",
    resetPasswordSent:
      "Se existir uma conta com este email, receberá uma ligação para repor a palavra-passe.",
    passwordUpdated: "Palavra-passe actualizada. Já pode iniciar sessão.",
    passwordMismatch: "As palavras-passe não coincidem.",
    passwordResetError: "Não foi possível enviar o email de recuperação:",
    productOrderWarning:
      "Não foi possível validar os IDs e preços do catálogo no Supabase; a lista local foi mantida.",
    searchPlaceholder: "Pesquisar livros, exames, desporto, tecnologia...",
    heroTitulo: "A sua central académica e literária digital",
    heroSub:
      "Não encontra o livro que procura? Peça-o e nós adicionamo-lo! Pagamento via M-Pesa, e-Mola ou banco/cartão sul-africano.",
    btnIrPedido: "📚 Pedir um livro",
    btnIrFeedback: "💡 Enviar feedback",
    pedirTitulo:
      "📑 Não encontrou o livro que procura? Peça-o e nós adicionamos!",
    pedirSub:
      "Envie os detalhes do material pretendido. A nossa equipa recebe o pedido de imediato.",
    reqTituloPh: "Nome do livro ou exame *",
    reqAutorPh: "Autor / Categoria (Opcional)",
    reqContatoPh: "O seu nome e contacto (WhatsApp/email) *",
    btnPedir: "🚀 Pedir e Notificar a Equipa",
    feedbackTitle: "💡 Ajude-nos a melhorar",
    feedbackDescription:
      "Partilhe sugestões ou ideias para futuras melhorias da MozBookStore.",
    feedbackNamePh: "O seu nome (opcional)",
    feedbackEmailPh: "O seu email (opcional)",
    feedbackMessagePh: "Que melhoria gostaria de ver? *",
    feedbackSubmit: "Enviar feedback",
    feedbackSending: "A enviar o seu feedback...",
    feedbackSuccess: "Obrigado! O seu feedback foi enviado à equipa.",
    feedbackUnavailable:
      "Não foi possível enviar o feedback agora. Tente novamente mais tarde.",
    feedbackError:
      "O envio falhou. Verifique a ligação e tente novamente.",
    ultimosLivros: "🔥 Últimos livros adicionados a pedido:",
    badge1: "✅ Natação para Iniciantes",
    badge2: "✅ Treino de Força para Iniciantes",
    badge3: "✅ Futebol para Iniciantes",
    passo1Tit: "Peça ou escolha",
    passo1Desc: "Peça um livro no formulário ou escolha um do catálogo.",
    passo2Tit: "Pague e anexe o comprovativo",
    passo2Desc:
      "Transfira via M-Pesa, e-Mola ou banco/cartão sul-africano e indique a referência.",
    passo3Tit: "Descarregue o PDF",
    passo3Desc:
      "Após uma verificação rápida, poderá descarregar o seu documento.",
    catalogoTit: "Catálogo de livros disponíveis",
    btnIntro: "📖 Sinopse",
    btnComprar: "💳 Comprar",
    checkoutTitulo: "Pagar e receber o PDF",
    lblNome: "Nome completo *",
    lblEmail: "O seu email (para receber o PDF) *",
    lblMetodo: "Forma de pagamento",
    saBankOption: "Banco/cartão sul-africano (ZAR)",
    nomeCheckoutPh: "Ex.: José da Silva",
    emailCheckoutPh: "exemplo@gmail.com",
    referenciaPh: "Ex.: PP240929.1830.A12345 / número de referência",
    lblRef: "Código / Referência da transacção *",
    btnConfirmar: "📱 Confirmar e enviar pelo WhatsApp",
    txtSinopse: "📌 Introdução / Sinopse",
    txtAvisoPDF:
      "🔒 Para ler a obra completa em PDF, efectue o pagamento via M-Pesa, e-Mola ou cartão sul-africano.",
    btnFechar: "Fechar",
    btnComprarModal: "💳 Comprar agora",
    tabLogin: "Entrar",
    tabRegister: "Registar",
    loginTitle: "Bem-vindo de volta!",
    lblLoginEmail: "Email ou utilizador",
    loginEmailPh: "seu@email.com",
    lblLoginPass: "Palavra-passe",
    btnLoginSubmit: "Iniciar sessão",
    regTitle: "Crie a sua conta",
    lblRegName: "Nome completo",
    nomeRegPh: "O seu nome",
    lblRegEmail: "Email",
    regEmailPh: "seu@email.com",
    lblRegPass: "Palavra-passe",
    btnRegSubmit: "Criar conta",
    footerCopy: "&copy; 2026 MozBookStore - Todos os direitos reservados.",
    footerSocialTitle: "Siga-nos nas redes sociais para ficar a par das atualizações",
    topBarSocialTitle: "Siga-nos para atualizações:",
  },
  "en-ZA": {
    idiomaLabel: "🌐 Mudar idioma / Change language:",
    btnLogin: "🔑 Sign In / Register",
    btnCompras: "🛒 My purchases",
    btnAdmin: "⚙️ Administration",
    btnLogout: "Sign out",
    libraryTitle: "🛒 My purchases",
    adminTitle: "⚙️ Approve payments",
    backCatalog: "Back to catalogue",
    lblRegiao: "Country / Region",
    regiaoMozambique: "Mozambique",
    regiaoOutros: "South Africa / Other countries",
    lblStatusPedido: "Status",
    statusPendente: "Awaiting approval",
    statusAprovado: "Approved",
    statusRejeitado: "Rejected",
    btnDownload: "⬇️ Download PDF",
    btnApprove: "Approve",
    btnReject: "Reject / Revoke",
    btnRestore: "Reopen for approval",
    lblSolicitante: "Customer",
    lblReferenciaAdmin: "Reference",
    authRequired: "Sign in to purchase and access your library.",
    authNotConfigured: "The platform connection has not been configured yet.",
    orderPending:
      "Confirmation submitted. Book access will be released after payment approval.",
    orderNotificationFailed:
      "The order was recorded and is pending approval, but the notification email could not be sent to the team.",
    noOrders: "There are no orders yet.",
    noPurchases: "You have no purchases yet.",
    adminOnly: "This area is available to administrators only.",
    orderSaved: "Order status updated.",
    btnDeleteOrder: "Delete purchase",
    orderDeleting: "Deleting purchase...",
    orderDeleteError: "The purchase could not be deleted.",
    confirmDeleteOrder:
      "Permanently delete the purchase of “{book}”? Access to the book will be removed.",
    orderDeleted: "Purchase deleted and access removed.",
    resetPasswordLink: "Forgot your password?",
    showPassword: "Show password",
    hidePassword: "Hide password",
    resetPasswordTitle: "Set a new password",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm password",
    savePasswordButton: "Save new password",
    resetPasswordSent:
      "If an account exists for this email, you will receive a password reset link.",
    passwordUpdated: "Password updated. You can now sign in.",
    passwordMismatch: "The passwords do not match.",
    passwordResetError: "Could not send the recovery email:",
    productOrderWarning:
      "Could not validate catalogue IDs and prices from Supabase; keeping the local catalogue.",
    searchPlaceholder: "Search for books, exams, drama, philosophy...",
    heroTitulo: "Your Digital Academic & Literary Hub",
    heroSub:
      "Can't find the book you're looking for? Request it and we'll add it! Payment via M-Pesa, e-Mola or SA Bank Deposit/Card.",
    btnIrPedido: "📚 Request a book",
    btnIrFeedback: "💡 Send feedback",
    pedirTitulo: "📑 Didn't find your book? Request it and we'll add it!",
    pedirSub:
      "Send the details of the material you want. Our team receives the notification instantly.",
    reqTituloPh: "Book Name or Exam *",
    reqAutorPh: "Author / Category (Optional)",
    reqContatoPh: "Your Name and Contact (WhatsApp/Email) *",
    btnPedir: "🚀 Request & Notify Team",
    feedbackTitle: "💡 Help us improve",
    feedbackDescription:
      "Share suggestions or ideas for future improvements to MozBookStore.",
    feedbackNamePh: "Your name (optional)",
    feedbackEmailPh: "Your email (optional)",
    feedbackMessagePh: "What improvement would you like to see? *",
    feedbackSubmit: "Send feedback",
    feedbackSending: "Sending your feedback...",
    feedbackSuccess: "Thank you! Your feedback has been sent to the team.",
    feedbackUnavailable:
      "Feedback could not be sent right now. Please try again later.",
    feedbackError: "Sending failed. Check your connection and try again.",
    ultimosLivros: "🔥 Latest Books Added by Request:",
    badge1: "✅ Swimming for Beginners",
    badge2: "✅ Weight Training for Beginners",
    badge3: "✅ Football for Beginners",
    passo1Tit: "Request or Choose",
    passo1Desc: "Request a book using the form or select one from the catalog.",
    passo2Tit: "Pay & Attach Receipt",
    passo2Desc:
      "Transfer via M-Pesa, e-Mola or SA Bank/Card and upload the reference.",
    passo3Tit: "Download PDF",
    passo3Desc:
      "After a quick verification, your document will be available for download.",
    catalogoTit: "Available Books Catalogue",
    btnIntro: "📖 Synopsis",
    btnComprar: "💳 Buy",
    checkoutTitulo: "Pay & Receive PDF",
    lblNome: "Full Name *",
    lblEmail: "Your E-mail (To receive the PDF) *",
    lblMetodo: "Payment Method",
    saBankOption: "South African Bank / Card (ZAR)",
    nomeCheckoutPh: "E.g. Jose da Silva",
    emailCheckoutPh: "example@gmail.com",
    referenciaPh: "E.g. PP240929.1830.A12345 / Reference number",
    lblRef: "Transaction Code / Reference Number *",
    btnConfirmar: "📱 Confirm & Send on WhatsApp",
    txtSinopse: "📌 Introduction / Synopsis",
    txtAvisoPDF:
      "🔒 To read the full work in PDF, please make the payment via M-Pesa, e-Mola or SA Card.",
    btnFechar: "Close",
    btnComprarModal: "💳 Buy Now",
    tabLogin: "Sign In",
    tabRegister: "Register",
    loginTitle: "Welcome back!",
    lblLoginEmail: "Email or Username",
    loginEmailPh: "your@email.com",
    lblLoginPass: "Password",
    btnLoginSubmit: "Sign In",
    regTitle: "Create your account",
    lblRegName: "Full Name",
    nomeRegPh: "Your name",
    lblRegEmail: "Email",
    regEmailPh: "your@email.com",
    lblRegPass: "Password",
    btnRegSubmit: "Create Account",
    footerCopy: "&copy; 2026 MozBookStore - All rights reserved.",
    footerSocialTitle: "Follow us on social media for updates",
    topBarSocialTitle: "Follow us for updates:",
  },
};

// --- LISTA DE CATEGORIAS BILÍNGUES ---
const categoriasLista = [
  { id: "todos", pt: "Todos", en: "All" },
  { id: "exames", pt: "Exames & Materiais", en: "Exams & Materials" },
  { id: "desporto", pt: "Desporto & Fitness", en: "Sports & Fitness" },
  { id: "saude", pt: "Saúde & Bem-estar", en: "Health & Wellness" },
  {
    id: "educacao",
    pt: "Educação & Manuais Práticos",
    en: "Education & Practical Guides",
  },
  { id: "infantil", pt: "Livros Infantis", en: "Children's Books" },
  { id: "historias-curtas", pt: "Histórias Curtas", en: "Short Stories" },
  {
    id: "bandas-desenhadas",
    pt: "Bandas Desenhadas",
    en: "Comics & Graphic Novels",
  },
  {
    id: "psicologia",
    pt: "Psicologia & Comportamento",
    en: "Psychology & Behavior",
  },
  { id: "culinaria", pt: "Culinária & Alimentação", en: "Cooking & Nutrition" },
  { id: "negocios", pt: "Negócios & Carreira", en: "Business & Career" },
  { id: "ciencia", pt: "Ciência & Tecnologia", en: "Science & Technology" },
  { id: "historia", pt: "História & Geografia", en: "History & Geography" },
];

// --- CATÁLOGO DE PRODUTOS & SINOPSES BILÍNGUES ---
const produtos = [
  {
    id: 10,
    titulo: "Natação para Iniciantes",
    tituloEn: "Swimming for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "250 MT",
    imagem:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=800",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Guia prático do zero aos primeiros 30 dias para desenvolver conforto na água, controle da respiração, flutuação, propulsão e segurança na piscina.",
    introducaoEn:
      "Practical guide from scratch to the first 30 days to develop water comfort, breathing control, buoyancy, propulsion, and pool safety.",
  },
  {
    id: 9,
    titulo: "Musculação para Iniciantes",
    tituloEn: "Weight Training for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "300 MT",
    imagem:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Aprenda os fundamentos, monte seus primeiros treinos e evolua com técnica, consistência e segurança através de um roteiro prático de 30 dias.",
    introducaoEn:
      "Learn the fundamentals, set up your first workouts, and evolve with technique, consistency, and safety through a practical 30-day roadmap.",
  },
  {
    id: 7,
    titulo: "Futebol para Iniciantes",
    tituloEn: "Football for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "250 MT",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU_6n_ouvaR15zDwA2aWm1YZFRNChbb9Qy_48kRLUf5yTf2SBaeEClruw&s=10",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Guia prático do zero aos primeiros 30 dias para transformar a bola num instrumento previsível: receber, conduzir, passar, finalizar e tomar decisões simples.",
    introducaoEn:
      "Practical guide from scratch to the first 30 days to turn the ball into a predictable instrument: receiving, driving, passing, finishing, and making simple decisions.",
  },
  {
    id: 4,
    titulo: "CrossFit para Iniciantes",
    tituloEn: "CrossFit for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "300 MT",
    imagem:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Comece do zero, aprenda os movimentos fundamentais, domine o escalonamento e construa consistência com segurança e intensidade relativa.",
    introducaoEn:
      "Start from scratch, learn fundamental movements, master scaling, and build consistency safely with relative intensity.",
  },
  {
    id: 2,
    titulo: "Ciclismo para Iniciantes",
    tituloEn: "Cycling for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "280 MT",
    imagem:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Guia prático do zero aos primeiros 30 dias para aprender a escolher, ajustar, dominar o equilíbrio e pedalar com segurança na cidade ou na estrada.",
    introducaoEn:
      "Practical guide from scratch to the first 30 days to learn how to choose, adjust, master balance, and cycle safely in the city or on the road.",
  },
  {
    id: 8,
    titulo: "Ginástica para Iniciante",
    tituloEn: "Gymnastics for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "270 MT",
    imagem:
      "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&q=80&w=800",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Guia prático para desenvolver flexibilidade, força corporal básica, equilíbrio e coordenação através de movimentos gímnicos fundamentais.",
    introducaoEn:
      "Practical guide to develop flexibility, basic body strength, balance, and coordination through fundamental gymnastic movements.",
  },
  {
    id: 6,
    titulo: "Escalada para Iniciantes",
    tituloEn: "Climbing for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "300 MT",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJDGAPp9cWJjPqXTHtM1TZeDoRllfR_EnKqFzdXyqyqHz42yS57yK5QDL&s=10",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Aprenda técnicas de aderência, nós essenciais, leitura de vias e os princípios de segurança para dar os primeiros passos na escalada com confiança.",
    introducaoEn:
      "Learn grip techniques, essential knots, route reading, and safety principles to take your first steps in climbing with confidence.",
  },
  {
    id: 3,
    titulo: "Corrida para Iniciantes",
    tituloEn: "Running for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "250 MT",
    imagem:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=800",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Um programa progressivo do zero aos primeiros quilómetros contínuos, focando na postura, respiração correta e prevenção de lesões.",
    introducaoEn:
      "A progressive program from scratch to your first continuous kilometers, focusing on posture, correct breathing, and injury prevention.",
  },
  {
    id: 5,
    titulo: "Culinária para Iniciantes",
    tituloEn: "Cooking for Beginners",
    autor: "MozBookStore",
    categoria: "estilo-de-vida",
    preco: "250 MT",
    imagem:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    tipo: "PDF / Estilo de Vida & Culinária",
    tipoEn: "PDF / Lifestyle & Cooking",
    introducao:
      "Técnicas básicas de cozinha, uso correto de utensílios, temperos essenciais e receitas fáceis para dominar o fogão sem complicações.",
    introducaoEn:
      "Basic kitchen techniques, proper use of utensils, essential seasonings, and easy recipes to master cooking without complications.",
  },
  {
    id: 12,
    titulo: "Queda de Braço para Iniciantes",
    tituloEn: "Arm Wrestling for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "220 MT",
    imagem:
      "https://sme.goiania.go.gov.br/conexaoescola/wp-content/uploads/2024/10/ARM-2.png",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Conheça os ângulos de força, técnicas de pulso, posicionamento corporal e cuidados de prevenção de lesões específicos para a queda de braço.",
    introducaoEn:
      "Learn strength angles, wrist techniques, body positioning, and specific injury prevention care for arm wrestling.",
  },
  {
    id: 1,
    titulo: "Calistenia para Iniciantes",
    tituloEn: "Calisthenics for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "280 MT",
    imagem:
      "https://media.glamour.mx/photos/66831a93778fded3931a4663/master/w_1600%2Cc_limit/calistenia-que-es.jpg",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Treine usando apenas o peso do corpo. Aprenda progressões para flexões, agachamentos, barras e abdominais para construir força funcional em qualquer lugar.",
    introducaoEn:
      "Train using only your body weight. Learn progressions for push-ups, squats, pull-ups, and core exercises to build functional strength anywhere.",
  },
  {
    id: 11,
    titulo: "Patinagem no Gelo para Iniciantes",
    tituloEn: "Ice Skating for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "300 MT",
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE675nd-RqgBOdW7wO-oaUlFBeejWBfJ-a6xZ4lA2Na3JnWsyPQ5Jycvs&s=10",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Descubra como ajustar os patins, dominar o equilíbrio no gelo, dar as primeiras passadas com segurança e aprender a travar e cair corretamente.",
    introducaoEn:
      "Discover how to adjust skates, master balance on ice, take your first safe glides, and learn how to brake and fall correctly.",
  },

  {
    id: 13,
    titulo: "Skate para Iniciantes",
    tituloEn: "Skate for Beginners",
    autor: "MozBookStore",
    categoria: "desporto",
    preco: "320 MT",
    imagem:
      "https://img.redbull.com/images/c_crop,x_1638,y_0,h_2560,w_2048/c_fill,w_800,h_889/q_auto:low,f_auto/redbullcom/tv/FO-1YSE763FN5N11/abc-of-skateboarding-kickflip-skatepark",
    tipo: "PDF / Desporto & Saúde",
    tipoEn: "PDF / Sports & Health",
    introducao:
      "Aprenda a escolher o skate certo, dominar o equilíbrio, dar as primeiras voltas com segurança e aprender a travar e cair corretamente.",
    introducaoEn:
      "Learn how to choose the right skateboard, master balance, take your first safe rides, and learn how to brake and fall correctly.",
  },
];

// Inicialização EmailJS
(function () {
  if (
    CONFIG_NOTIFICACOES.emailJsPublicKey !== "SUA_PUBLIC_KEY_AQUI" &&
    typeof emailjs !== "undefined"
  ) {
    emailjs.init(CONFIG_NOTIFICACOES.emailJsPublicKey);
  }
})();

function alternarIdioma() {
  idiomaAtual = idiomaAtual === "pt" ? "en-ZA" : "pt";
  aplicarIdioma();
}

function aplicarIdioma() {
  const t = traducoes[idiomaAtual];
  document.documentElement.lang = idiomaAtual === "pt" ? "pt-MZ" : "en-ZA";
  document.title =
    idiomaAtual === "pt"
      ? "MozBookStore 📚 | Livraria e Central Académica Digital"
      : "MozBookStore 📚 | Digital Bookshop & Academic Hub";

  document.getElementById("btnTraduzir").innerHTML =
    idiomaAtual === "pt" ? "🇿🇦 English (SA)" : "🇲🇿 Português (MZ)";
  document.getElementById("txtIdiomaLabel").innerText = t.idiomaLabel;
  document.getElementById("txtBtnLogin").innerText = t.btnLogin;
  document.getElementById("btnBiblioteca").innerText = t.btnCompras;
  document.getElementById("btnAdmin").innerText = t.btnAdmin;
  document.getElementById("btnLogout").innerText = t.btnLogout;
  document.getElementById("searchInput").placeholder = t.searchPlaceholder;
  document.getElementById("txtHeroTitulo").innerText = t.heroTitulo;
  document.getElementById("txtHeroSub").innerText = t.heroSub;
  document.getElementById("btnIrPedido").innerText = t.btnIrPedido;
  document.getElementById("btnIrFeedback").innerText = t.btnIrFeedback;
  document.getElementById("txtPedirTitulo").innerText = t.pedirTitulo;
  document.getElementById("txtPedirSub").innerText = t.pedirSub;

  document.getElementById("reqTitulo").placeholder = t.reqTituloPh;
  document.getElementById("reqAutor").placeholder = t.reqAutorPh;
  document.getElementById("reqContacto").placeholder = t.reqContatoPh;
  document.getElementById("txtBtnPedir").innerText = t.btnPedir;
  document.getElementById("feedbackTitle").innerText = t.feedbackTitle;
  document.getElementById("feedbackDescription").innerText =
    t.feedbackDescription;
  document.getElementById("feedbackName").placeholder = t.feedbackNamePh;
  document
    .getElementById("feedbackName")
    .setAttribute("aria-label", t.feedbackNamePh);
  document.getElementById("feedbackEmail").placeholder = t.feedbackEmailPh;
  document
    .getElementById("feedbackEmail")
    .setAttribute("aria-label", t.feedbackEmailPh);
  document.getElementById("feedbackMessage").placeholder =
    t.feedbackMessagePh;
  document
    .getElementById("feedbackMessage")
    .setAttribute("aria-label", t.feedbackMessagePh);
  document.getElementById("feedbackSubmit").innerText = t.feedbackSubmit;

  document.getElementById("txtUltimosLivros").innerHTML =
    `🔥 <b>${t.ultimosLivros.replace("🔥 ", "").replace(":", "")}:</b>`;
  document.getElementById("badge1").innerText = t.badge1;
  document.getElementById("badge2").innerText = t.badge2;
  document.getElementById("badge3").innerText = t.badge3;

  document.getElementById("txtPasso1Tit").innerText = t.passo1Tit;
  document.getElementById("txtPasso1Desc").innerText = t.passo1Desc;
  document.getElementById("txtPasso2Tit").innerText = t.passo2Tit;
  document.getElementById("txtPasso2Desc").innerText = t.passo2Desc;
  document.getElementById("txtPasso3Tit").innerText = t.passo3Tit;
  document.getElementById("txtPasso3Desc").innerText = t.passo3Desc;
  document.getElementById("txtCatalogoTit").innerText = t.catalogoTit;

  document.getElementById("lblNome").innerText = t.lblNome;
  document.getElementById("lblEmail").innerText = t.lblEmail;
  document.getElementById("clienteEmail").placeholder = t.emailCheckoutPh;
  document.getElementById("lblMetodo").innerText = t.lblMetodo;
  document.getElementById("lblRegiao").innerText = t.lblRegiao;
  document.getElementById("optionMozambique").innerText = t.regiaoMozambique;
  document.getElementById("optionOther").innerText = t.regiaoOutros;
  document.getElementById("optionSaBank").innerText = t.saBankOption;
  document.getElementById("clienteNome").placeholder = t.nomeCheckoutPh;
  document.getElementById("lblRef").innerText = t.lblRef;
  document.getElementById("referenciaPagamento").placeholder = t.referenciaPh;
  document.getElementById("checkoutTitulo").innerText = t.checkoutTitulo;
  document.getElementById("btnConfirmar").innerText = t.btnConfirmar;
  document.getElementById("txtSinopse").innerText = t.txtSinopse;
  document.getElementById("txtAvisoPDF").innerText = t.txtAvisoPDF;
  document.getElementById("btnFecharModal").innerText = t.btnFechar;
  document.getElementById("btnComprarModal").innerText = t.btnComprarModal;

  document.getElementById("tabLoginBtn").innerText = t.tabLogin;
  document.getElementById("tabRegisterBtn").innerText = t.tabRegister;
  document.getElementById("loginTitle").innerText = t.loginTitle;
  document.getElementById("lblLoginEmail").innerText = t.lblLoginEmail;
  document.querySelector("#formLogin input[type='email']").placeholder =
    t.loginEmailPh;
  document.getElementById("lblLoginPass").innerText = t.lblLoginPass;
  document.getElementById("btnEsqueceuPassword").innerText =
    t.resetPasswordLink;
  document.getElementById("btnLoginSubmit").innerText = t.btnLoginSubmit;
  document.getElementById("regTitle").innerText = t.regTitle;
  document.getElementById("lblRegName").innerText = t.lblRegName;
  document.querySelector("#formRegistro input[type='text']").placeholder =
    t.nomeRegPh;
  document.getElementById("lblRegEmail").innerText = t.lblRegEmail;
  document.querySelector("#formRegistro input[type='email']").placeholder =
    t.regEmailPh;
  document.getElementById("lblRegPass").innerText = t.lblRegPass;
  document.querySelectorAll(".password-toggle").forEach((button) => {
    const input = document.getElementById(button.dataset.passwordTarget);
    button.setAttribute(
      "aria-label",
      input.type === "password" ? t.showPassword : t.hidePassword,
    );
  });
  document.getElementById("btnRegSubmit").innerText = t.btnRegSubmit;
  document.getElementById("novaPasswordTitle").innerText = t.resetPasswordTitle;
  document.getElementById("lblNovaPassword").innerText = t.newPasswordLabel;
  document.getElementById("lblConfirmarPassword").innerText =
    t.confirmPasswordLabel;
  document.getElementById("btnGuardarPassword").innerText =
    t.savePasswordButton;
  if (catalogOrderWarning) {
    document.getElementById("catalogStatus").innerText = t.productOrderWarning;
  }
  document.getElementById("footerCopy").innerHTML = t.footerCopy;
  document.getElementById("footerSocialTitle").innerText = t.footerSocialTitle;
  document.getElementById("topBarSocialTitle").innerText = t.topBarSocialTitle;
  document.getElementById("libraryTitle").innerText = t.libraryTitle;
  document.getElementById("adminTitle").innerText = t.adminTitle;
  document.getElementById("libraryBackButton").innerText = t.backCatalog;
  document.getElementById("adminBackButton").innerText = t.backCatalog;

  renderizarCategorias();
  renderizarRodapé();
  document.getElementById("catalogStatus").innerText = catalogOrderWarning
    ? t.productOrderWarning
    : "";
  if (document.getElementById("searchInput").value.trim()) {
    buscarLivro();
  } else {
    carregarProdutos(produtos);
  }
  if (document.getElementById("checkoutModal").style.display === "flex") {
    atualizarOpcoesPagamento();
  }
}

// Renderizar Categorias Dinamicamente com Tradução
function renderizarCategorias() {
  const container = document.getElementById("categoriesContainer");
  container.innerHTML = "";

  categoriasLista.forEach((cat) => {
    const nomeCat = idiomaAtual === "pt" ? cat.pt : cat.en;
    const btn = document.createElement("button");
    btn.className = `cat-btn ${categoriaAtivaAtual === cat.id ? "active" : ""}`;
    btn.onclick = (e) => filtrarCategoria(cat.id, e);
    btn.innerText = nomeCat;
    container.appendChild(btn);
  });
}

// Renderizar Informações Bancárias no Rodapé
function renderizarRodapé() {
  const footerContacts = document.getElementById("footerContacts");
  const sb = CONTAS_PAGAMENTO.sabank;

  if (idiomaAtual === "pt") {
    footerContacts.innerHTML = `
      <p><strong>Contas M-Pesa:</strong> ${CONTAS_PAGAMENTO.mpesa[0]} | ${CONTAS_PAGAMENTO.mpesa[1]}</p>
      <p><strong>Conta e-Mola:</strong> ${CONTAS_PAGAMENTO.emola[0]}</p>
      <p><strong>🏦 Dados bancários da África do Sul (ZAR):</strong> ${sb.banco} | Titular: ${sb.titular} | Conta: <b>${sb.conta}</b> | Código da agência: <b>${sb.branchCode}</b></p>
      <p><strong>WhatsApp Apoio:</strong> +258 86 756 8918 | +258 82 010 9316 | +27 63 643 7259</p>
    `;
  } else {
    footerContacts.innerHTML = `
      <p><strong>M-Pesa Accounts:</strong> ${CONTAS_PAGAMENTO.mpesa[0]} | ${CONTAS_PAGAMENTO.mpesa[1]}</p>
      <p><strong>e-Mola Account:</strong> ${CONTAS_PAGAMENTO.emola[0]}</p>
      <p><strong>🏦 SA Banking Details (ZAR):</strong> ${sb.banco} | Holder: ${sb.titular} | Acc: <b>${sb.conta}</b> | Branch: <b>${sb.branchCode}</b></p>
      <p><strong>Support WhatsApp:</strong> +258 86 756 8918 | +258 82 010 9316 | +27 63 643 7259</p>
    `;
  }
}

// Renderizar Produtos com Tradução Completa
function carregarProdutos(lista) {
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";

  if (lista.length === 0) {
    catalog.innerHTML =
      idiomaAtual === "pt"
        ? "<p style='grid-column: 1/-1; text-align: center; color: #64748b;'>Nenhum livro encontrado nesta categoria.</p>"
        : "<p style='grid-column: 1/-1; text-align: center; color: #64748b;'>No books found in this category.</p>";
    return;
  }

  const t = traducoes[idiomaAtual];

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const tituloExibido = idiomaAtual === "en-ZA" ? item.tituloEn : item.titulo;
    const tipoExibido = idiomaAtual === "en-ZA" ? item.tipoEn : item.tipo;
    const precoExibido =
      idiomaAtual === "en-ZA" ? converterPreco(item.preco) : item.preco;

    card.innerHTML = `
      <div>
        <img src="${item.imagem}" alt="${tituloExibido}">
        <span class="type-tag">${tipoExibido}</span>
        <h3>${tituloExibido}</h3>
        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 8px;">${item.autor}</p>
      </div>
      <div class="card-purchase">
        <div class="price">${precoExibido}</div>
      <div class="card-actions">
        <button onclick="abrirModalPreview(${item.id})" class="btn-synopsis">
            ${t.btnIntro}
          </button>
        <button onclick="iniciarCompra(${item.id})" class="btn-buy">
            ${t.btnComprar}
          </button>
        </div>
      </div>
    `;
    catalog.appendChild(card);
  });
}

function abrirModalPreview(id) {
  const produto = produtos.find((p) => p.id === id);
  if (!produto) return;

  produtoSelecionado = produto;
  const tituloExibido =
    idiomaAtual === "en-ZA" ? produto.tituloEn : produto.titulo;
  const introExibida =
    idiomaAtual === "en-ZA" ? produto.introducaoEn : produto.introducao;

  document.getElementById("previewTitulo").innerText = tituloExibido;
  document.getElementById("previewAutor").innerText =
    `${idiomaAtual === "pt" ? "Por" : "By"}: ${produto.autor}`;
  document.getElementById("previewTexto").innerText = introExibida;
  document.getElementById("previewModal").style.display = "flex";
}

function fecharModalPreview() {
  document.getElementById("previewModal").style.display = "none";
}

function irParaCheckoutDoPreview() {
  fecharModalPreview();
  if (produtoSelecionado) {
    iniciarCompra(produtoSelecionado.id);
  }
}

function iniciarCompra(id) {
  produtoSelecionado = produtos.find((p) => p.id === id);
  if (!produtoSelecionado) return;

  if (!supabaseClient) {
    abrirModalLogin();
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authNotConfigured, true);
    return;
  }

  if (!utilizadorAtual) {
    produtoCompraPendente = id;
    abrirModalLogin();
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authRequired, true);
    return;
  }

  abrirCheckout();
}

function abrirCheckout() {
  if (!produtoSelecionado || !utilizadorAtual) return;

  document.getElementById("clienteNome").value =
    perfilAtual?.full_name || utilizadorAtual.user_metadata?.full_name || "";
  document.getElementById("clienteEmail").value = utilizadorAtual.email || "";
  const precoAtual =
    idiomaAtual === "en-ZA"
      ? converterPreco(produtoSelecionado.preco)
      : produtoSelecionado.preco;

  document.getElementById("checkoutPreco").innerText =
    `${idiomaAtual === "pt" ? "Valor a pagar" : "Amount to pay"}: ${precoAtual}`;
  document.getElementById("statusPagamento").style.display = "none";
  document.getElementById("statusPagamento").innerText = "";
  document.getElementById("formCheckout").reset();
  document.getElementById("clienteNome").value =
    perfilAtual?.full_name || utilizadorAtual.user_metadata?.full_name || "";
  document.getElementById("clienteEmail").value = utilizadorAtual.email || "";
  atualizarOpcoesPagamento();

  document.getElementById("checkoutModal").style.display = "flex";
}

function atualizarOpcoesPagamento() {
  const regiao = document.getElementById("regiaoPagamento").value;
  const opcaoMpesa = document.querySelector(
    '#metodoPagamento option[value="mpesa"]',
  );
  const opcaoEmola = document.querySelector(
    '#metodoPagamento option[value="emola"]',
  );
  const opcaoBanco = document.getElementById("optionSaBank");

  opcaoMpesa.hidden = regiao !== "mozambique";
  opcaoEmola.hidden = regiao !== "mozambique";
  opcaoBanco.hidden = regiao === "mozambique";

  const metodoPagamento = document.getElementById("metodoPagamento");
  if (regiao === "mozambique" && metodoPagamento.value === "sabank") {
    metodoPagamento.value = "mpesa";
  } else if (regiao === "other" && metodoPagamento.value !== "sabank") {
    metodoPagamento.value = "sabank";
  }
  if (produtoSelecionado) {
    const valor =
      regiao === "mozambique"
        ? produtoSelecionado.preco
        : converterPreco(produtoSelecionado.preco);
    document.getElementById("checkoutPreco").innerText =
      `${idiomaAtual === "pt" ? "Valor a pagar" : "Amount to pay"}: ${valor}`;
  }
  atualizarInstrucoesPagamento();
}

function atualizarInstrucoesPagamento() {
  const metodo = document.getElementById("metodoPagamento").value;
  const caixaInstrucoes = document.getElementById("instrucoesPagamento");
  const precoMT = produtoSelecionado ? produtoSelecionado.preco : "";
  const precoZAR = produtoSelecionado
    ? converterPreco(produtoSelecionado.preco)
    : "";

  if (metodo === "mpesa") {
    caixaInstrucoes.innerHTML =
      idiomaAtual === "pt"
        ? `<strong>Envie ${precoMT} via M-Pesa:</strong><br>📲 <b>${CONTAS_PAGAMENTO.mpesa[0]}</b> ou 📲 <b>${CONTAS_PAGAMENTO.mpesa[1]}</b>`
        : `<strong>Send ${precoMT} via M-Pesa:</strong><br>📲 <b>${CONTAS_PAGAMENTO.mpesa[0]}</b> or 📲 <b>${CONTAS_PAGAMENTO.mpesa[1]}</b>`;
  } else if (metodo === "emola") {
    caixaInstrucoes.innerHTML =
      idiomaAtual === "pt"
        ? `<strong>Envie ${precoMT} via e-Mola:</strong><br>📲 <b>${CONTAS_PAGAMENTO.emola[0]}</b>`
        : `<strong>Send ${precoMT} via e-Mola:</strong><br>📲 <b>${CONTAS_PAGAMENTO.emola[0]}</b>`;
  } else if (metodo === "sabank") {
    const sb = CONTAS_PAGAMENTO.sabank;
    caixaInstrucoes.innerHTML =
      idiomaAtual === "pt"
        ? `<strong>Depósito / transferência bancária (${precoZAR}):</strong><br>🏦 <b>${sb.banco}</b><br>👤 Titular: ${sb.titular}<br>💳 Conta: <b>${sb.conta}</b> | Código da agência: <b>${sb.branchCode}</b>`
        : `<strong>SA Bank Deposit / Transfer (${precoZAR}):</strong><br>🏦 <b>${sb.banco}</b><br>👤 Holder: ${sb.titular}<br>💳 Acc: <b>${sb.conta}</b> | Branch: <b>${sb.branchCode}</b>`;
  }
}

async function submeterConfirmacaoPagamento(event) {
  event.preventDefault();

  const status = document.getElementById("statusPagamento");
  const botao = document.getElementById("btnConfirmar");
  const t = traducoes[idiomaAtual];

  if (!supabaseClient || !utilizadorAtual || !produtoSelecionado) {
    status.innerText = !supabaseClient ? t.authNotConfigured : t.authRequired;
    status.style.display = "block";
    return;
  }

  const referencia = document
    .getElementById("referenciaPagamento")
    .value.trim();
  if (!referencia) {
    status.innerText =
      idiomaAtual === "pt"
        ? "Introduza a referência ou o ID da transacção."
        : "Enter the transaction reference or ID.";
    status.style.display = "block";
    return;
  }

  botao.disabled = true;
  status.innerText =
    idiomaAtual === "pt"
      ? "A registar a confirmação..."
      : "Submitting confirmation...";
  status.style.display = "block";

  const regiao = document.getElementById("regiaoPagamento");
  const metodoPagamento = document.getElementById("metodoPagamento");
  const { data: encomenda, error } = await supabaseClient
    .from("orders")
    .insert({
      user_id: utilizadorAtual.id,
      product_id: produtoSelecionado.id,
      region: regiao.value,
      payment_method: metodoPagamento.value,
      transaction_reference: referencia,
    })
    .select("product_title,amount,currency")
    .single();

  if (error) {
    botao.disabled = false;
    console.error("Erro ao registar a confirmação de pagamento:", error);
    status.innerText =
      idiomaAtual === "pt"
        ? `Não foi possível registar o pagamento: ${traduzirErroSupabase(error)}`
        : `Could not submit payment confirmation: ${traduzirErroSupabase(error)}`;
    return;
  }

  let mensagemEstado = t.orderPending;
  if (
    CONFIG_NOTIFICACOES.emailJsPublicKey === "SUA_PUBLIC_KEY_AQUI" ||
    typeof emailjs === "undefined"
  ) {
    console.error("EmailJS não está configurado para notificar novas encomendas.");
    mensagemEstado = t.orderNotificationFailed;
  } else {
    const nomeCliente =
      perfilAtual?.full_name ||
      utilizadorAtual.user_metadata?.full_name ||
      utilizadorAtual.email ||
      "";
    const detalhesEncomenda = [
      idiomaAtual === "pt"
        ? "NOVA COMPRA - APROVAÇÃO PENDENTE"
        : "NEW PURCHASE - APPROVAL PENDING",
      "",
      `${idiomaAtual === "pt" ? "Cliente" : "Customer"}: ${nomeCliente}`,
      `Email: ${utilizadorAtual.email || ""}`,
      `${idiomaAtual === "pt" ? "Livro" : "Book"}: ${encomenda.product_title}`,
      `${idiomaAtual === "pt" ? "Valor" : "Amount"}: ${encomenda.amount} ${encomenda.currency}`,
      `${idiomaAtual === "pt" ? "Região" : "Region"}: ${regiao.selectedOptions[0].text}`,
      `${idiomaAtual === "pt" ? "Forma de pagamento" : "Payment method"}: ${metodoPagamento.selectedOptions[0].text}`,
      `${idiomaAtual === "pt" ? "Referência" : "Reference"}: ${referencia}`,
      `${idiomaAtual === "pt" ? "Estado" : "Status"}: ${t.statusPendente}`,
    ].join("\n");

    try {
      await emailjs.send(
        CONFIG_NOTIFICACOES.emailJsServiceId,
        CONFIG_NOTIFICACOES.emailJsTemplateId,
        {
          cliente_nome: nomeCliente,
          cliente_email: utilizadorAtual.email || "",
          to_email: CONFIG_NOTIFICACOES.emailDestino,
          reply_to: utilizadorAtual.email || CONFIG_NOTIFICACOES.emailDestino,
          livro_titulo: encomenda.product_title,
          referencia,
          metodo: metodoPagamento.selectedOptions[0].text,
          tipo_notificacao:
            idiomaAtual === "pt"
              ? "Nova compra pendente de aprovação"
              : "New purchase pending approval",
          solicitante_contacto: utilizadorAtual.email || nomeCliente,
          detalhes_pedido: detalhesEncomenda,
          mensagem: detalhesEncomenda,
        },
      );
    } catch (erroNotificacao) {
      console.error(
        "Não foi possível enviar o email da nova encomenda:",
        erroNotificacao,
      );
      mensagemEstado = t.orderNotificationFailed;
    }
  }

  botao.disabled = false;
  status.innerText = mensagemEstado;
  document.getElementById("formCheckout").reset();
  document.getElementById("clienteNome").value =
    perfilAtual?.full_name || utilizadorAtual.user_metadata?.full_name || "";
  document.getElementById("clienteEmail").value = utilizadorAtual.email || "";
  document.getElementById("referenciaPagamento").value = "";
  atualizarOpcoesPagamento();
  fecharModalCheckout();
  alternarVistaConta("biblioteca");
  await carregarBiblioteca();
  document.getElementById("libraryStatus").innerText = mensagemEstado;
  document.getElementById("libraryStatus").className =
    `account-status${mensagemEstado === t.orderPending ? " success" : " error"}`;
}

function fecharModalCheckout() {
  document.getElementById("checkoutModal").style.display = "none";
}

function filtrarCategoria(categoria, event) {
  categoriaAtivaAtual = categoria;
  document
    .querySelectorAll(".cat-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (event && event.target) event.target.classList.add("active");

  if (categoria === "todos") {
    carregarProdutos(produtos);
  } else {
    const filtrados = produtos.filter((p) => p.categoria === categoria);
    carregarProdutos(filtrados);
  }
}

function buscarLivro() {
  const termo = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  if (termo === "") {
    carregarProdutos(produtos);
    return;
  }
  const filtrados = produtos.filter((p) => {
    const tit = (idiomaAtual === "en-ZA" ? p.tituloEn : p.titulo).toLowerCase();
    const aut = p.autor.toLowerCase();
    const tip = (idiomaAtual === "en-ZA" ? p.tipoEn : p.tipo).toLowerCase();
    return tit.includes(termo) || aut.includes(termo) || tip.includes(termo);
  });
  carregarProdutos(filtrados);
}

// --- FUNÇÃO DE HINT / SUGESTÕES EM TEMPO REAL ---
function atualizarSugestoes() {
  const input = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("searchSuggestions");
  const termo = input.value.toLowerCase().trim();

  if (termo === "") {
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = "none";
    return;
  }

  const resultados = produtos.filter((p) => {
    const titulo = (
      idiomaAtual === "en-ZA" ? p.tituloEn : p.titulo
    ).toLowerCase();
    const autor = p.autor.toLowerCase();
    return titulo.includes(termo) || autor.includes(termo);
  });

  if (resultados.length === 0) {
    suggestionsBox.innerHTML = `<div style="padding: 12px 16px; color: #64748b; font-size: 0.9rem;">${idiomaAtual === "pt" ? "Nenhum livro encontrado" : "No books found"}</div>`;
    suggestionsBox.style.display = "block";
    return;
  }

  let html = "";
  resultados.slice(0, 5).forEach((livro) => {
    const tituloExibido =
      idiomaAtual === "en-ZA" ? livro.tituloEn : livro.titulo;
    html += `
      <div class="suggestion-item" onclick="selecionarSugestao('${tituloExibido.replace(/'/g, "\\'")}')">
        <strong style="color: #1e293b; display: block; font-size: 0.95rem;">${tituloExibido}</strong>
        <span style="color: #64748b; font-size: 0.8rem;">${idiomaAtual === "pt" ? "Por" : "By"} ${livro.autor}</span>
      </div>
    `;
  });

  suggestionsBox.innerHTML = html;
  suggestionsBox.style.display = "block";
}

function selecionarSugestao(tituloLivro) {
  const input = document.getElementById("searchInput");
  input.value = tituloLivro;
  document.getElementById("searchSuggestions").style.display = "none";
  buscarLivro();
}

// Fechar sugestões ao clicar fora
document.addEventListener("click", function (e) {
  const searchBar = document.querySelector(".search-bar");
  const suggestionsBox = document.getElementById("searchSuggestions");
  if (searchBar && !searchBar.contains(e.target)) {
    if (suggestionsBox) {
      suggestionsBox.style.display = "none";
    }
  }
});

function abrirWhatsAppComFallback(urlWa, statusElement, mensagemFallback) {
  const janelaWhatsApp = window.open(urlWa, "_blank");

  if (janelaWhatsApp === null) {
    statusElement.innerHTML = `${mensagemFallback} <a href="${urlWa}" target="_blank" rel="noopener">💬 Abrir no WhatsApp</a>`;
    return false;
  }

  return true;
}

function enviarPedidoLivro(event) {
  event.preventDefault();

  const titulo = document.getElementById("reqTitulo").value;
  const autor = document.getElementById("reqAutor").value || "Não especificado";
  const contacto = document.getElementById("reqContacto").value;
  const statusDiv = document.getElementById("statusPedido");

  const textoMensagem = `📚 *NOVO PEDIDO DE LIVRO (MozBookStore)*\n\n📖 *Livro/Exame:* ${titulo}\n✍ *Autor/Detalhes:* ${autor}\n👤 *Solicitante:* ${contacto}`;
  const urlWa = `https://wa.me/${CONFIG_NOTIFICACOES.numeroWhatsAppPrincipal}?text=${encodeURIComponent(textoMensagem)}`;

  statusDiv.innerHTML =
    idiomaAtual === "pt"
      ? "⏳ A enviar o pedido por email..."
      : "⏳ Sending the request by email...";

  if (
    CONFIG_NOTIFICACOES.emailJsPublicKey === "SUA_PUBLIC_KEY_AQUI" ||
    typeof emailjs === "undefined"
  ) {
    console.error(
      "EmailJS não está configurado para enviar pedidos de livros.",
    );
    const mensagemFallback =
      idiomaAtual === "pt"
        ? "⚠️ Não foi possível enviar o email."
        : "⚠️ The email could not be sent.";
    abrirWhatsAppComFallback(urlWa, statusDiv, mensagemFallback);
    return;
  }

  const janelaWhatsApp = window.open(urlWa, "_blank");
  if (janelaWhatsApp === null) {
    statusDiv.innerHTML =
      (idiomaAtual === "pt"
        ? "⚠️ O navegador bloqueou a janela do WhatsApp. "
        : "⚠️ Your browser blocked the WhatsApp tab. ") +
      `<a href="${urlWa}" target="_blank" rel="noopener">${idiomaAtual === "pt" ? "💬 Abrir no WhatsApp" : "💬 Open in WhatsApp"}</a>`;
  }

  emailjs
    .send(
      CONFIG_NOTIFICACOES.emailJsServiceId,
      CONFIG_NOTIFICACOES.emailJsTemplateId,
      {
        cliente_nome: "Pedido de livro pelo site",
        cliente_email: contacto,
        to_email: CONFIG_NOTIFICACOES.emailDestino,
        reply_to: contacto,
        livro_titulo: titulo,
        referencia: autor,
        metodo: "Pedido de livro",
        tipo_notificacao: "Pedido de livro",
        solicitante_contacto: contacto,
        detalhes_pedido: autor,
        mensagem: textoMensagem,
      },
    )
    .then(() => {
      const avisoWhatsApp =
        janelaWhatsApp === null
          ? idiomaAtual === "pt"
            ? ` <a href="${urlWa}" target="_blank" rel="noopener">Abrir WhatsApp</a> e confirmar o envio.`
            : ` <a href="${urlWa}" target="_blank" rel="noopener">Open WhatsApp</a> and confirm sending.`
          : idiomaAtual === "pt"
            ? " O WhatsApp foi aberto; confirme o envio da mensagem."
            : " WhatsApp was opened; confirm sending the message.";

      statusDiv.innerHTML =
        (idiomaAtual === "pt"
          ? '<span style="color: #10b981;">✅ Pedido enviado para o email da equipa.'
          : '<span style="color: #10b981;">✅ Request emailed to the team.') +
        avisoWhatsApp +
        "</span>";
      document.getElementById("formPedirLivro").reset();
    })
    .catch((err) => {
      console.error("Erro EmailJS ao enviar pedido de livro:", err);
      statusDiv.innerHTML =
        idiomaAtual === "pt"
          ? "⚠️ O WhatsApp foi aberto, mas o email não foi enviado. Verifique a ligação e tente novamente."
          : "⚠️ WhatsApp was opened, but the email was not sent. Check your connection and try again.";
    });
}

function enviarFeedback(event) {
  event.preventDefault();

  const t = traducoes[idiomaAtual];
  const form = document.getElementById("formFeedback");
  const status = document.getElementById("feedbackStatus");
  const submitButton = document.getElementById("feedbackSubmit");
  const nome = document.getElementById("feedbackName").value.trim();
  const email = document.getElementById("feedbackEmail").value.trim();
  const mensagem = document.getElementById("feedbackMessage").value.trim();

  const textoMensagemWhatsApp = `💡 *NOVO FEEDBACK (MozBookStore)*\n\n👤 *Nome:* ${nome || "Anónimo"}\n📧 *Email:* ${email || "Não fornecido"}\n\n💬 *Sugestão:*\n${mensagem}`;
  const urlWhatsApp = `https://wa.me/${CONFIG_NOTIFICACOES.numeroWhatsAppPrincipal}?text=${encodeURIComponent(textoMensagemWhatsApp)}`;
  const janelaWhatsApp = window.open(urlWhatsApp, "_blank");

  if (
    CONFIG_NOTIFICACOES.emailJsPublicKey === "SUA_PUBLIC_KEY_AQUI" ||
    typeof emailjs === "undefined"
  ) {
    console.error("EmailJS não está configurado para receber feedback.");
    status.innerHTML =
      janelaWhatsApp !== null
        ? `${t.feedbackUnavailable} ${idiomaAtual === "pt" ? "O WhatsApp também foi aberto para confirmação." : "WhatsApp was also opened for confirmation."}`
        : `${t.feedbackUnavailable} <a href="${urlWhatsApp}" target="_blank" rel="noopener">${idiomaAtual === "pt" ? "💬 Abrir no WhatsApp" : "💬 Open in WhatsApp"}</a>`;
    return;
  }

  const mensagemEmail = `NOVO FEEDBACK (MozBookStore)\n\nNome: ${nome || "Anónimo"}\nEmail: ${email || "Não fornecido"}\n\nSugestão:\n${mensagem}`;
  status.innerText = t.feedbackSending;
  submitButton.disabled = true;

  emailjs
    .send(
      CONFIG_NOTIFICACOES.emailJsServiceId,
      CONFIG_NOTIFICACOES.emailJsTemplateId,
      {
        cliente_nome: nome || "Utilizador anónimo",
        cliente_email: email || "Não fornecido",
        to_email: CONFIG_NOTIFICACOES.emailDestino,
        reply_to: email || "noreply@mozbookstore.com",
        livro_titulo: "Feedback do utilizador",
        referencia: "Sugestão para melhorias",
        metodo: "Feedback do site",
        tipo_notificacao: "Feedback / Sugestão",
        solicitante_contacto: email || nome || "Anónimo",
        detalhes_pedido: mensagem,
        mensagem: mensagemEmail,
      },
    )
    .then(() => {
      const avisoWhatsApp =
        janelaWhatsApp === null
          ? idiomaAtual === "pt"
            ? ` <a href="${urlWhatsApp}" target="_blank" rel="noopener">💬 Abrir no WhatsApp</a> e confirmar o envio.`
            : ` <a href="${urlWhatsApp}" target="_blank" rel="noopener">💬 Open in WhatsApp</a> and confirm sending.`
          : idiomaAtual === "pt"
            ? " O WhatsApp foi aberto; confirme o envio da mensagem."
            : " WhatsApp was opened; confirm sending the message.";

      status.innerHTML =
        (idiomaAtual === "pt"
          ? '<span style="color: #10b981;">✅ Feedback enviado para o email e também enviado para o WhatsApp.</span>'
          : '<span style="color: #10b981;">✅ Feedback sent by email and also sent to WhatsApp.</span>') + avisoWhatsApp;
      form.reset();
    })
    .catch((error) => {
      console.error("Erro EmailJS ao enviar feedback:", error);
      status.innerHTML =
        janelaWhatsApp !== null
          ? `${t.feedbackError} ${idiomaAtual === "pt" ? "O WhatsApp foi aberto para confirmação." : "WhatsApp was opened for confirmation."}`
          : `${t.feedbackError} <a href="${urlWhatsApp}" target="_blank" rel="noopener">${idiomaAtual === "pt" ? "💬 Abrir no WhatsApp" : "💬 Open in WhatsApp"}</a>`;
    })
    .finally(() => {
      submitButton.disabled = false;
    });
}

function escaparHTML(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (caractere) => {
    const entidades = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entidades[caractere];
  });
}

function mostrarEstadoAutenticacao(mensagem, erro = false) {
  const elemento = document.getElementById("authStatus");
  elemento.innerText = mensagem;
  elemento.className = `account-status${erro ? " error" : ""}`;
}

function traduzirErroSupabase(error) {
  const mensagem = error?.message || "Unknown error";
  if (idiomaAtual !== "pt") return mensagem;
  if (/invalid login credentials/i.test(mensagem))
    return "email ou palavra-passe incorrectos.";
  if (/email not confirmed/i.test(mensagem))
    return "confirme o seu email antes de iniciar sessão.";
  if (/user already registered/i.test(mensagem))
    return "já existe uma conta com este email.";
  if (/password should be at least/i.test(mensagem))
    return "a palavra-passe deve ter pelo menos 8 caracteres.";
  if (/duplicate key|orders_one_approved_product_per_user/i.test(mensagem))
    return "já tem acesso aprovado a este livro.";
  return mensagem;
}

function inicializarSupabase() {
  document
    .getElementById("formLogin")
    .addEventListener("submit", iniciarSessao);
  document
    .getElementById("formRegistro")
    .addEventListener("submit", registarConta);

  const urlConfigurado =
    CONFIG_SUPABASE.url.startsWith("https://") &&
    !CONFIG_SUPABASE.url.includes("SEU-PROJECT-REF");
  const chaveConfigurada =
    CONFIG_SUPABASE.anonKey.length > 20 &&
    !CONFIG_SUPABASE.anonKey.includes("SUA_CHAVE");

  if (!window.supabase?.createClient || !urlConfigurado || !chaveConfigurada) {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authNotConfigured, true);
    return;
  }

  supabaseClient = window.supabase.createClient(
    CONFIG_SUPABASE.url,
    CONFIG_SUPABASE.anonKey,
  );
  void ordenarProdutosPeloSupabase();
  document
    .getElementById("formNovaPassword")
    .addEventListener("submit", guardarNovaPassword);
  supabaseClient.auth.onAuthStateChange((evento, sessao) => {
    if (evento === "PASSWORD_RECOVERY") {
      window.setTimeout(mostrarFormularioNovaPassword, 0);
      return;
    }
    window.setTimeout(() => {
      void atualizarSessao(sessao);
    }, 0);
  });
  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error("Não foi possível recuperar a sessão:", error);
      mostrarEstadoAutenticacao(traduzirErroSupabase(error), true);
      return;
    }
    void atualizarSessao(data.session);
  });
}

async function ordenarProdutosPeloSupabase() {
  let data;
  let error;
  try {
    ({ data, error } = await supabaseClient
      .from("products")
      .select("id,price_mzn")
      .order("id", { ascending: true }));
  } catch (erroConsulta) {
    error = erroConsulta;
  }

  const produtosInvalidos = data?.some(
    (produto) =>
      !Number.isFinite(Number(produto.price_mzn)) ||
      Number(produto.price_mzn) <= 0,
  );
  if (error || !data?.length || produtosInvalidos) {
    catalogOrderWarning = true;
    produtos.sort((a, b) => a.id - b.id);
    console.error(
      "Não foi possível obter IDs e preços válidos dos produtos no Supabase:",
      error ||
        (produtosInvalidos
          ? "Há produtos sem um price_mzn positivo."
          : "A tabela products não devolveu produtos."),
    );
    document.getElementById("catalogStatus").innerText =
      traducoes[idiomaAtual].productOrderWarning;
    document.getElementById("catalogStatus").className = "account-status error";
    renderizarCatalogoOrdenado();
    return;
  }

  const precosPorId = new Map(
    data.map((produto) => [Number(produto.id), Number(produto.price_mzn)]),
  );
  produtos.forEach((produto) => {
    const precoMzn = precosPorId.get(produto.id);
    if (precoMzn !== undefined) {
      produto.preco = `${precoMzn} MT`;
    }
  });
  produtos.sort((a, b) => a.id - b.id);
  catalogOrderWarning = false;
  document.getElementById("catalogStatus").innerText = "";
  document.getElementById("catalogStatus").className = "account-status";
  renderizarCatalogoOrdenado();
}

function renderizarCatalogoOrdenado() {
  if (document.getElementById("searchInput").value.trim()) {
    buscarLivro();
  } else {
    carregarProdutos(produtos);
  }
}

async function atualizarSessao(sessao) {
  utilizadorAtual = sessao?.user || null;
  perfilAtual = null;

  if (utilizadorAtual) {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id,email,full_name,role")
      .eq("id", utilizadorAtual.id)
      .maybeSingle();
    if (error) {
      console.error("Não foi possível carregar o perfil:", error);
      mostrarEstadoAutenticacao(traduzirErroSupabase(error), true);
    } else {
      perfilAtual = data;
    }
  }

  const autenticado = Boolean(utilizadorAtual);
  document.getElementById("txtBtnLogin").hidden = autenticado;
  document.getElementById("btnBiblioteca").hidden = !autenticado;
  document.getElementById("btnLogout").hidden = !autenticado;
  document.getElementById("btnAdmin").hidden =
    !autenticado || perfilAtual?.role !== "admin";

  if (autenticado) {
    document.getElementById("authStatus").innerText = "";
    fecharModalLogin();
    if (produtoCompraPendente !== null) {
      produtoSelecionado =
        produtos.find((produto) => produto.id === produtoCompraPendente) ||
        null;
      produtoCompraPendente = null;
      abrirCheckout();
    }
  } else {
    document.getElementById("authStatus").innerText = "";
  }
}

async function iniciarSessao(event) {
  event.preventDefault();
  if (!supabaseClient) {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authNotConfigured, true);
    return;
  }

  const botao = document.getElementById("btnLoginSubmit");
  botao.disabled = true;
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: document.getElementById("loginEmail").value.trim(),
    password: document.getElementById("loginPassword").value,
  });
  botao.disabled = false;

  if (error) {
    console.error("Erro ao iniciar sessão:", error);
    mostrarEstadoAutenticacao(traduzirErroSupabase(error), true);
  }
}

async function solicitarRecuperacaoPassword() {
  if (!supabaseClient) {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authNotConfigured, true);
    return;
  }

  const campoEmail = document.getElementById("loginEmail");
  if (!campoEmail.value.trim() || !campoEmail.checkValidity()) {
    campoEmail.reportValidity();
    campoEmail.focus();
    return;
  }

  const botao = document.getElementById("btnEsqueceuPassword");
  botao.disabled = true;
  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(
      campoEmail.value.trim(),
      { redirectTo: "https://mozbookstore.netlify.app/" },
    );
    if (error) {
      console.error("Erro ao solicitar recuperação da palavra-passe:", error);
      mostrarEstadoAutenticacao(
        `${traducoes[idiomaAtual].passwordResetError} ${traduzirErroSupabase(error)}`,
        true,
      );
      return;
    }
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].resetPasswordSent);
  } catch (error) {
    console.error("Falha de rede na recuperação da palavra-passe:", error);
    mostrarEstadoAutenticacao(
      `${traducoes[idiomaAtual].passwordResetError} ${traduzirErroSupabase(error)}`,
      true,
    );
  } finally {
    botao.disabled = false;
  }
}

function mostrarFormularioNovaPassword() {
  document.querySelector(".modal-tabs").hidden = true;
  document.getElementById("formLogin").classList.remove("active");
  document.getElementById("formRegistro").classList.remove("active");
  document.getElementById("formNovaPassword").classList.add("active");
  document.getElementById("loginModal").style.display = "flex";
  document.getElementById("authStatus").innerText = "";
  document.getElementById("novaPassword").focus();
}

async function guardarNovaPassword(event) {
  event.preventDefault();
  if (!supabaseClient) {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authNotConfigured, true);
    return;
  }

  const novaPassword = document.getElementById("novaPassword").value;
  const confirmarPassword = document.getElementById("confirmarPassword").value;
  if (novaPassword !== confirmarPassword) {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].passwordMismatch, true);
    return;
  }

  const botao = document.getElementById("btnGuardarPassword");
  botao.disabled = true;
  let error;
  try {
    ({ error } = await supabaseClient.auth.updateUser({
      password: novaPassword,
    }));
  } catch (erroActualizacao) {
    error = erroActualizacao;
  } finally {
    botao.disabled = false;
  }

  if (error) {
    console.error("Erro ao actualizar a palavra-passe:", error);
    mostrarEstadoAutenticacao(traduzirErroSupabase(error), true);
    return;
  }

  let signOutError;
  try {
    ({ error: signOutError } = await supabaseClient.auth.signOut());
  } catch (erroSaida) {
    signOutError = erroSaida;
  }
  document.getElementById("formNovaPassword").reset();
  document.getElementById("formNovaPassword").classList.remove("active");
  document.getElementById("formLogin").classList.add("active");
  document.querySelector(".modal-tabs").hidden = false;
  document.querySelectorAll(".tab-btn").forEach((botaoAba, indice) => {
    botaoAba.classList.toggle("active", indice === 0);
  });
  if (signOutError) {
    console.error(
      "A palavra-passe foi actualizada, mas não foi possível terminar a sessão:",
      signOutError,
    );
    mostrarEstadoAutenticacao(
      `${traducoes[idiomaAtual].passwordUpdated} ${traduzirErroSupabase(signOutError)}`,
      true,
    );
    return;
  }
  await new Promise((resolve) => window.setTimeout(resolve, 0));
  mostrarEstadoAutenticacao(traducoes[idiomaAtual].passwordUpdated);
}

async function registarConta(event) {
  event.preventDefault();
  if (!supabaseClient) {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authNotConfigured, true);
    return;
  }

  const botao = document.getElementById("btnRegSubmit");
  botao.disabled = true;
  const { data, error } = await supabaseClient.auth.signUp({
    email: document.getElementById("regEmail").value.trim(),
    password: document.getElementById("regPassword").value,
    options: {
      data: { full_name: document.getElementById("regName").value.trim() },
    },
  });
  botao.disabled = false;

  if (error) {
    console.error("Erro ao criar conta:", error);
    mostrarEstadoAutenticacao(traduzirErroSupabase(error), true);
    return;
  }
  if (!data.session) {
    mostrarEstadoAutenticacao(
      idiomaAtual === "pt"
        ? "Conta criada. Confirme o email enviado para activar a conta e depois inicie sessão."
        : "Account created. Confirm the email sent to activate your account, then sign in.",
    );
    return;
  }
  mostrarEstadoAutenticacao(
    idiomaAtual === "pt"
      ? "Conta criada com sucesso."
      : "Account created successfully.",
  );
}

async function terminarSessao() {
  if (!supabaseClient) return;
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error("Erro ao terminar sessão:", error);
    mostrarEstadoAutenticacao(traduzirErroSupabase(error), true);
  } else {
    voltarAoCatalogo();
  }
}

function alternarVistaConta(vista) {
  const mostrarConta = Boolean(vista);
  document.getElementById("catalogMain").hidden = mostrarConta;
  document.getElementById("categoriesNav").hidden = mostrarConta;
  document.getElementById("librarySection").hidden = vista !== "biblioteca";
  document.getElementById("adminSection").hidden = vista !== "admin";
}

async function mostrarBiblioteca() {
  if (!utilizadorAtual) {
    abrirModalLogin();
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authRequired, true);
    return;
  }
  alternarVistaConta("biblioteca");
  await carregarBiblioteca();
}

async function carregarBiblioteca() {
  const lista = document.getElementById("libraryBooks");
  const status = document.getElementById("libraryStatus");
  lista.innerHTML = "";
  status.innerText = idiomaAtual === "pt" ? "A carregar..." : "Loading...";

  const { data: encomendas, error } = await supabaseClient
    .from("orders")
    .select("id,product_id,product_title,amount,currency,status,created_at")
    .eq("user_id", utilizadorAtual.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Não foi possível carregar a biblioteca:", error);
    status.innerText = traduzirErroSupabase(error);
    status.className = "account-status error";
    return;
  }

  status.innerText = "";
  if (!encomendas.length) {
    status.innerText = traducoes[idiomaAtual].noPurchases;
    return;
  }

  const rotulosEstado = {
    pending: traducoes[idiomaAtual].statusPendente,
    approved: traducoes[idiomaAtual].statusAprovado,
    rejected: traducoes[idiomaAtual].statusRejeitado,
  };
  encomendas.forEach((encomenda) => {
    const cartao = document.createElement("article");
    cartao.className = "account-card";
    const titulo = document.createElement("h3");
    titulo.innerText = encomenda.product_title;
    const detalhes = document.createElement("p");
    detalhes.innerText = `${encomenda.amount} ${encomenda.currency} · ${rotulosEstado[encomenda.status]}`;
    cartao.append(titulo, detalhes);
    if (encomenda.status === "approved") {
      const botao = document.createElement("button");
      botao.className = "btn-primary";
      botao.innerText = traducoes[idiomaAtual].btnDownload;
      botao.addEventListener("click", () => {
        void descarregarEbook(encomenda);
      });
      cartao.appendChild(botao);
    }
    if (encomenda.status !== "pending") {
      const botaoApagar = document.createElement("button");
      botaoApagar.className = "btn-danger";
      botaoApagar.innerText = traducoes[idiomaAtual].btnDeleteOrder;
      botaoApagar.addEventListener("click", () => {
        void apagarEncomenda(encomenda);
      });
      cartao.appendChild(botaoApagar);
    }
    lista.appendChild(cartao);
  });
}

async function descarregarEbook(encomenda) {
  const status = document.getElementById("libraryStatus");
  status.innerText =
    idiomaAtual === "pt" ? "A preparar o PDF..." : "Preparing PDF...";
  status.className = "account-status";

  const { data: pedido, error: erroPedido } = await supabaseClient
    .from("orders")
    .select("id,product_id,product_title,status")
    .eq("id", encomenda.id)
    .eq("user_id", utilizadorAtual.id)
    .eq("status", "approved")
    .single();
  if (erroPedido) {
    console.error("Não foi possível validar o acesso ao livro:", erroPedido);
    status.innerText = traduzirErroSupabase(erroPedido);
    status.className = "account-status error";
    return;
  }

  const caminhoPdf = CAMINHOS_PDF[pedido.product_id];
  if (!caminhoPdf) {
    console.error(`Não existe caminho de PDF configurado para o produto ${pedido.product_id}.`);
    status.innerText =
      idiomaAtual === "pt"
        ? "O caminho do PDF deste livro ainda não está configurado."
        : "The PDF path for this book has not been configured yet.";
    status.className = "account-status error";
    return;
  }

  const nomeDownload = `${pedido.product_id}-${pedido.product_title}.pdf`;
  const { data, error } = await supabaseClient.storage
    .from("ebooks-private")
    .createSignedUrl(caminhoPdf, 60, { download: nomeDownload });
  if (error) {
    console.error("Não foi possível gerar o link do PDF:", error);
    status.innerText =
      idiomaAtual === "pt"
        ? `O PDF ainda não está disponível: ${traduzirErroSupabase(error)}`
        : `The PDF is not available yet: ${traduzirErroSupabase(error)}`;
    status.className = "account-status error";
    return;
  }

  const link = document.createElement("a");
  link.href = data.signedUrl;
  link.rel = "noopener";
  link.download = nomeDownload;
  document.body.appendChild(link);
  link.click();
  link.remove();
  status.innerText = "";
}

async function mostrarPainelAdmin() {
  if (perfilAtual?.role !== "admin") {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].adminOnly, true);
    return;
  }
  alternarVistaConta("admin");
  await carregarEncomendasAdmin();
}

async function carregarEncomendasAdmin() {
  const lista = document.getElementById("adminOrders");
  const status = document.getElementById("adminStatus");
  lista.innerHTML = "";
  status.innerText = idiomaAtual === "pt" ? "A carregar..." : "Loading...";

  const { data: encomendas, error } = await supabaseClient
    .from("orders")
    .select(
      "id,product_title,amount,currency,region,payment_method,transaction_reference,status,created_at,profile:profiles!orders_user_id_fkey(full_name,email)",
    )
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Não foi possível carregar as encomendas:", error);
    status.innerText = traduzirErroSupabase(error);
    status.className = "account-status error";
    return;
  }

  status.innerText = "";
  if (!encomendas.length) {
    status.innerText = traducoes[idiomaAtual].noOrders;
    return;
  }

  const t = traducoes[idiomaAtual];
  encomendas.forEach((encomenda) => {
    const cartao = document.createElement("article");
    cartao.className = "account-card";
    const cliente =
      encomenda.profile?.full_name || encomenda.profile?.email || "";
    const statusEncomenda =
      encomenda.status === "pending"
        ? t.statusPendente
        : encomenda.status === "approved"
          ? t.statusAprovado
          : t.statusRejeitado;
    cartao.innerHTML = `
      <h3>${escaparHTML(encomenda.product_title)}</h3>
      <p><strong>${t.lblSolicitante}:</strong> ${escaparHTML(cliente)} (${escaparHTML(encomenda.profile?.email || "")})</p>
      <p><strong>${t.lblReferenciaAdmin}:</strong> ${escaparHTML(encomenda.transaction_reference)}</p>
      <p>${escaparHTML(encomenda.payment_method.toUpperCase())} · ${escaparHTML(encomenda.region)} · ${escaparHTML(encomenda.amount)} ${escaparHTML(encomenda.currency)}</p>
      <p><strong>${t.lblStatusPedido}:</strong> ${escaparHTML(statusEncomenda)}</p>
    `;
    const accoes =
      encomenda.status === "pending"
        ? [
            ["approved", t.btnApprove, "btn-primary"],
            ["rejected", t.btnReject, "btn-secondary"],
          ]
        : encomenda.status === "approved"
          ? [["rejected", t.btnReject, "btn-secondary"]]
          : [["pending", t.btnRestore, "btn-secondary"]];
    for (const [novoEstado, rotulo, classe] of accoes) {
      const botao = document.createElement("button");
      botao.className = classe;
      botao.innerText = rotulo;
      botao.addEventListener("click", () => {
        void reverEncomenda(encomenda.id, novoEstado);
      });
      cartao.appendChild(botao);
    }
    if (encomenda.status !== "pending") {
      const botaoApagar = document.createElement("button");
      botaoApagar.className = "btn-danger";
      botaoApagar.innerText = t.btnDeleteOrder;
      botaoApagar.addEventListener("click", () => {
        void apagarEncomenda(encomenda, true);
      });
      cartao.appendChild(botaoApagar);
    }
    lista.appendChild(cartao);
  });
}

async function apagarEncomenda(encomenda, isAdmin = false) {
  if (encomenda.status === "pending") return;
  if (isAdmin && perfilAtual?.role !== "admin") {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].adminOnly, true);
    return;
  }

  const t = traducoes[idiomaAtual];
  const confirmacao = t.confirmDeleteOrder.replace(
    "{book}",
    encomenda.product_title,
  );
  if (!window.confirm(confirmacao)) return;

  const status = document.getElementById(
    isAdmin ? "adminStatus" : "libraryStatus",
  );
  status.innerText = t.orderDeleting;
  status.className = "account-status";

  let consulta = supabaseClient
    .from("orders")
    .delete()
    .eq("id", encomenda.id)
    .eq("status", encomenda.status);
  if (!isAdmin) {
    consulta = consulta.eq("user_id", utilizadorAtual.id);
  }
  const { data, error } = await consulta.select("id").single();

  if (error || !data) {
    console.error(
      "Não foi possível apagar a encomenda:",
      error || "A encomenda não foi encontrada ou já não pode ser apagada.",
    );
    status.innerText = error
      ? `${t.orderDeleteError} ${traduzirErroSupabase(error)}`
      : t.orderDeleteError;
    status.className = "account-status error";
    return;
  }

  if (isAdmin) {
    await carregarEncomendasAdmin();
  } else {
    await carregarBiblioteca();
  }
  status.innerText = t.orderDeleted;
  status.className = "account-status success";
}

async function reverEncomenda(id, estado) {
  const status = document.getElementById("adminStatus");
  status.innerText = idiomaAtual === "pt" ? "A actualizar..." : "Updating...";
  const { error } = await supabaseClient
    .from("orders")
    .update({ status: estado })
    .eq("id", id);
  if (error) {
    console.error("Não foi possível actualizar o estado da encomenda:", error);
    status.innerText = traduzirErroSupabase(error);
    status.className = "account-status error";
    return;
  }
  status.innerText = traducoes[idiomaAtual].orderSaved;
  status.className = "account-status success";
  await carregarEncomendasAdmin();
}

const quizPerguntas = [
  {
    pergunta: "Qual das opções descreve melhor a tua forma de aprender?",
    opcoes: [
      { texto: "Gosto de aprender com passos claros e objetivos simples.", valor: "pratico" },
      { texto: "Prefiro descobrir ideias novas e explorar temas interessantes.", valor: "curioso" },
      { texto: "Adoro ensinar-me a mim mesmo e aplicar o que aprendo rapidamente.", valor: "estrategico" },
    ],
  },
  {
    pergunta: "Quando escolhes um livro ou guia, o que mais te atrai?",
    opcoes: [
      { texto: "Conteúdos práticos, receitas, exercícios e exemplos do dia a dia.", valor: "pratico" },
      { texto: "Histórias, curiosidades e temas que abram a minha mente.", valor: "curioso" },
      { texto: "Estruturas bem organizadas e metas que me ajudem a evoluir.", valor: "estrategico" },
    ],
  },
  {
    pergunta: "Como reagiste ao fim de uma leitura?",
    opcoes: [
      { texto: "Vou já aplicar algo no meu dia a dia.", valor: "pratico" },
      { texto: "Procuro mais conteúdos semelhantes para continuar a explorar.", valor: "curioso" },
      { texto: "Faço um plano para evoluir passo a passo.", valor: "estrategico" },
    ],
  },
];

const quizResultadoPorPerfil = {
  pratico: {
    titulo: "Perfil: Leitor Prático",
    descricao:
      "Gostas de conteúdos úteis, diretos e fáceis de pôr em prática. O melhor para ti é começar por guias que te ajudam a evoluir com ação imediata.",
    recomendacao: "Culinária para Iniciantes ou Natação para Iniciantes",
  },
  curioso: {
    titulo: "Perfil: Leitor Curioso",
    descricao:
      "A tua mente gosta de aprender, explorar e descobrir novos temas. Vais apreciar materiais que expandem o teu conhecimento e te inspiram a seguir.",
    recomendacao: "Calistenia para Iniciantes ou Ciclismo para Iniciantes",
  },
  estrategico: {
    titulo: "Perfil: Leitor Estratégico",
    descricao:
      "Buscas organização, progresso e um caminho claro para evoluir. A melhor escolha para ti é um guia bem estruturado e com foco em resultados.",
    recomendacao: "Futebol para Iniciantes ou Musculação para Iniciantes",
  },
};

const quizEstado = {
  index: 0,
  respostas: {},
};

function abrirQuizModal() {
  const quizModal = document.getElementById("quizModal");
  if (!quizModal) return;
  quizModal.style.display = "flex";
  quizModal.setAttribute("aria-hidden", "false");
}

function fecharQuizModal() {
  const quizModal = document.getElementById("quizModal");
  if (!quizModal) return;
  quizModal.style.display = "none";
  quizModal.setAttribute("aria-hidden", "true");
  try {
    localStorage.setItem("mozbookstoreQuizDismissed", "true");
  } catch (error) {
    console.warn("Não foi possível guardar a preferência do quiz:", error);
  }
}

function renderizarQuiz() {
  const perguntaAtual = quizPerguntas[quizEstado.index];
  const perguntaEl = document.getElementById("quizQuestion");
  const opcoesEl = document.getElementById("quizOptions");
  const anteriorBtn = document.getElementById("quizPrev");
  const proximaBtn = document.getElementById("quizNext");
  const resultadoEl = document.getElementById("quizResult");

  if (!perguntaAtual) return;

  perguntaEl.textContent = perguntaAtual.pergunta;
  opcoesEl.innerHTML = "";

  perguntaAtual.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "quiz-option";
    botao.textContent = opcao.texto;

    if (quizEstado.respostas[quizEstado.index] === opcao.valor) {
      botao.classList.add("selected");
    }

    botao.addEventListener("click", () => {
      quizEstado.respostas[quizEstado.index] = opcao.valor;
      renderizarQuiz();
    });

    opcoesEl.appendChild(botao);
  });

  const ultimaPergunta = quizEstado.index === quizPerguntas.length - 1;
  anteriorBtn.hidden = quizEstado.index === 0;
  proximaBtn.textContent = ultimaPergunta ? "Ver resultado" : "Próxima";
  resultadoEl.hidden = true;
}

function concluirQuiz() {
  const respostas = Object.values(quizEstado.respostas);
  if (respostas.length < quizPerguntas.length) {
    document.getElementById("quizResult").hidden = false;
    document.getElementById("quizResult").innerHTML =
      "<strong>Falta só uma resposta!</strong> Escolhe uma opção em cada pergunta para ver o teu perfil.";
    return;
  }

  const contagem = { pratico: 0, curioso: 0, estrategico: 0 };
  respostas.forEach((valor) => {
    if (valor in contagem) {
      contagem[valor] += 1;
    }
  });

  const perfil = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0][0];
  const resultado = quizResultadoPorPerfil[perfil];
  const resultadoEl = document.getElementById("quizResult");
  resultadoEl.hidden = false;
  resultadoEl.innerHTML = `
    <strong>${resultado.titulo}</strong><br>
    ${resultado.descricao}<br>
    <strong>Sugestão:</strong> ${resultado.recomendacao}
  `;

  document.getElementById("quizNext").textContent = "Reiniciar quiz";
}

function reiniciarQuiz() {
  quizEstado.index = 0;
  quizEstado.respostas = {};
  document.getElementById("quizNext").textContent = "Próxima";
  document.getElementById("quizResult").hidden = true;
  renderizarQuiz();
}

function inicializarQuiz() {
  const proximaBtn = document.getElementById("quizNext");
  const anteriorBtn = document.getElementById("quizPrev");
  const quizModal = document.getElementById("quizModal");
  const fecharQuizBtn = document.querySelector("[data-close-quiz]");
  const quizTrigger = document.getElementById("quizTrigger");

  if (!proximaBtn || !anteriorBtn || !quizModal) return;

  quizTrigger?.addEventListener("click", () => {
    reiniciarQuiz();
    abrirQuizModal();
  });

  proximaBtn.addEventListener("click", () => {
    if (quizEstado.index < quizPerguntas.length - 1) {
      if (!(quizEstado.index in quizEstado.respostas)) {
        document.getElementById("quizResult").hidden = false;
        document.getElementById("quizResult").innerHTML =
          "<strong>Falta uma resposta!</strong> Escolhe uma opção antes de continuar.";
        return;
      }
      quizEstado.index += 1;
      document.getElementById("quizResult").hidden = true;
      renderizarQuiz();
      return;
    }

    if (document.getElementById("quizNext").textContent === "Reiniciar quiz") {
      reiniciarQuiz();
      return;
    }

    concluirQuiz();
  });

  anteriorBtn.addEventListener("click", () => {
    if (quizEstado.index > 0) {
      quizEstado.index -= 1;
      document.getElementById("quizResult").hidden = true;
      renderizarQuiz();
    }
  });

  fecharQuizBtn?.addEventListener("click", fecharQuizModal);
  quizModal.addEventListener("click", (evento) => {
    if (evento.target === quizModal) {
      fecharQuizModal();
    }
  });

  renderizarQuiz();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarQuiz);
} else {
  inicializarQuiz();
}

function voltarAoCatalogo() {
  alternarVistaConta(null);
}

function abrirModalLogin() {
  if (supabaseClient) {
    document.getElementById("authStatus").innerText = "";
  } else {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authNotConfigured, true);
  }
  document.getElementById("loginModal").style.display = "flex";
}

function fecharModalLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function alternarVisibilidadePassword(botao) {
  const input = document.getElementById(botao.dataset.passwordTarget);
  const mostrarPassword = input.type === "password";
  input.type = mostrarPassword ? "text" : "password";
  botao.setAttribute("aria-pressed", String(mostrarPassword));
  botao.setAttribute(
    "aria-label",
    mostrarPassword
      ? traducoes[idiomaAtual].hidePassword
      : traducoes[idiomaAtual].showPassword,
  );
  botao.querySelector(".password-toggle-slash").hidden = mostrarPassword;
}

function alternarAba(aba) {
  const btns = document.querySelectorAll(".tab-btn");
  const formLogin = document.getElementById("formLogin");
  const formRegistro = document.getElementById("formRegistro");

  document.getElementById("formNovaPassword").classList.remove("active");
  document.querySelector(".modal-tabs").hidden = false;
  btns.forEach((b) => b.classList.remove("active"));

  if (aba === "login") {
    btns[0].classList.add("active");
    formLogin.classList.add("active");
    formRegistro.classList.remove("active");
  } else {
    btns[1].classList.add("active");
    formRegistro.classList.add("active");
    formLogin.classList.remove("active");
  }
}

window.onclick = function (event) {
  if (event.target === document.getElementById("loginModal"))
    fecharModalLogin();
  if (event.target === document.getElementById("checkoutModal"))
    fecharModalCheckout();
  if (event.target === document.getElementById("previewModal"))
    fecharModalPreview();
};

window.onload = () => {
  aplicarIdioma();
  inicializarSupabase();
};
