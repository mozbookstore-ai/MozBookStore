// --- CONFIGURAÇÃO DE CONTACTOS & DADOS BANCÁRIOS SA ---
const CONFIG_NOTIFICACOES = {
  numeroWhatsAppPrincipal: "258867568918",
  emailJsPublicKey: "-ft_UtWIa-tk49VHy",
  emailJsServiceId: "service_ldwmjo9",
  emailJsTemplateId: "template_qgdxq0d",
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

const TAXA_CAMBIO_ZAR = 3.5;

function converterPreco(precoMT) {
  const valorNumerico = parseFloat(precoMT.replace(" MT", ""));
  const valorZAR = (valorNumerico / TAXA_CAMBIO_ZAR).toFixed(2);
  return `R ${valorZAR}`;
}

// --- VARIÁVEIS GLOBAIS ---
let idiomaAtual = "pt"; // <-- Alterado de "en-ZA" para "pt" para iniciar em português
let produtoSelecionado = null;
let categoriaAtivaAtual = "todos";

// --- DICIONÁRIO DE TRADUÇÕES (PT / en-ZA) ---
const traducoes = {
  pt: {
    btnLogin: "🔑 Entrar / Cadastrar",
    searchPlaceholder: "Buscar por livros, exames, drama, filosofia...",
    heroTitulo: "Sua Central Académica & Literária Digital",
    heroSub:
      "Não tem o livro que procura? Peça na caixa abaixo e nós adicionamos! Pagamento via M-Pesa, e-Mola ou Banco/Cartão SA.",
    pedirTitulo: "📑 Não encontrou o seu livro? Peça que nós adicionamos!",
    pedirSub:
      "Envie os detalhes do material desejado. A nossa equipa recebe a notificação instantaneamente.",
    reqTituloPh: "Nome do Livro ou Exame *",
    reqAutorPh: "Autor / Categoria (Opcional)",
    reqContatoPh: "Seu Nome e Contacto (WhatsApp/Email) *",
    btnPedir: "🚀 Pedir & Notificar Equipa",
    ultimosLivros: "🔥 Últimos Livros Adicionados por Pedido:",
    badge1: "✅ Natação para Iniciantes",
    badge2: "✅ Treinamento de Força para Iniciantes",
    badge3: "✅ Futebol para Iniciantes",
    passo1Tit: "Peça ou Escolha",
    passo1Desc: "Solicite um livro no formulário ou selecione no catálogo.",
    passo2Tit: "Pague & Anexe Comprovativo",
    passo2Desc:
      "Transfira via M-Pesa, e-Mola ou South African Bank/Card e carregue a referência.",
    passo3Tit: "Baixe o PDF",
    passo3Desc:
      "Após rápida verificação, o seu documento estará disponível para download.",
    catalogoTit: "Catálogo de Livros Disponíveis",
    btnIntro: "📖 Introdução",
    btnComprar: "💳 Comprar",
    lblNome: "Seu Nome Completo *",
    lblEmail: "Seu E-mail (Para receber o PDF) *",
    lblMetodo: "Forma de Pagamento",
    lblRef: "Código / Ref. da Transação *",
    btnConfirmar: "📱 Confirmar & Enviar no WhatsApp",
    txtSinopse: "📌 Introdução / Sinopse",
    txtAvisoPDF:
      "🔒 Para ler a obra completa em PDF, efetue a compra via M-Pesa, e-Mola ou Cartão SA.",
    btnFechar: "Fechar",
    btnComprarModal: "💳 Comprar Agora",
    tabLogin: "Entrar",
    tabRegister: "Cadastrar",
    loginTitle: "Bem-vindo de volta!",
    lblLoginEmail: "E-mail ou Utilizador",
    lblLoginPass: "Palavra-passe",
    btnLoginSubmit: "Iniciar Sessão",
    regTitle: "Crie a sua conta",
    lblRegName: "Nome Completo",
    lblRegEmail: "E-mail",
    lblRegPass: "Palavra-passe",
    btnRegSubmit: "Criar Conta",
    footerCopy: "&copy; 2026 MozBookStore - Todos os direitos reservados.",
  },
  "en-ZA": {
    btnLogin: "🔑 Sign In / Register",
    searchPlaceholder: "Search for books, exams, drama, philosophy...",
    heroTitulo: "Your Digital Academic & Literary Hub",
    heroSub:
      "Can't find the book you're looking for? Request it below and we'll add it! Payment via M-Pesa, e-Mola or SA Bank Deposit/Card.",
    pedirTitulo: "📑 Didn't find your book? Request it and we'll add it!",
    pedirSub:
      "Send the details of the material you want. Our team receives the notification instantly.",
    reqTituloPh: "Book Name or Exam *",
    reqAutorPh: "Author / Category (Optional)",
    reqContatoPh: "Your Name and Contact (WhatsApp/Email) *",
    btnPedir: "🚀 Request & Notify Team",
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
    btnIntro: "📖 Introduction",
    btnComprar: "💳 Buy",
    lblNome: "Full Name *",
    lblEmail: "Your E-mail (To receive the PDF) *",
    lblMetodo: "Payment Method",
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
    lblLoginPass: "Password",
    btnLoginSubmit: "Sign In",
    regTitle: "Create your account",
    lblRegName: "Full Name",
    lblRegEmail: "Email",
    lblRegPass: "Password",
    btnRegSubmit: "Create Account",
    footerCopy: "&copy; 2026 MozBookStore - All rights reserved.",
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
];

// Função para exibir os livros no catálogo com acessibilidade garantida
function renderizarCatalogo(listaDeLivros) {
  const catalogGrid = document.getElementById("catalog");
  if (!catalogGrid) return;

  catalogGrid.innerHTML = "";

  listaDeLivros.forEach((livro) => {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}" loading="lazy" />
      <div class="book-info">
        <span class="book-category">${livro.tipo}</span>
        <h3>${livro.titulo}</h3>
        <p class="book-author">Por: ${livro.autor}</p>
        <p class="book-price">${livro.preco}</p>
        <button class="btn-primary" onclick="abrirPreview(${livro.id})">Ver Sinopse / Comprar</button>
      </div>
    `;

    catalogGrid.appendChild(card);
  });
}

// Executar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogo(livros);
});

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
  const t = traducoes[idiomaAtual];

  document.getElementById("btnTraduzir").innerHTML =
    idiomaAtual === "pt" ? "🇿🇦 English (SA)" : "🇲🇿 Português";
  document.getElementById("txtBtnLogin").innerText = t.btnLogin;
  document.getElementById("searchInput").placeholder = t.searchPlaceholder;
  document.getElementById("txtHeroTitulo").innerText = t.heroTitulo;
  document.getElementById("txtHeroSub").innerText = t.heroSub;
  document.getElementById("txtPedirTitulo").innerText = t.pedirTitulo;
  document.getElementById("txtPedirSub").innerText = t.pedirSub;

  document.getElementById("reqTitulo").placeholder = t.reqTituloPh;
  document.getElementById("reqAutor").placeholder = t.reqAutorPh;
  document.getElementById("reqContacto").placeholder = t.reqContatoPh;
  document.getElementById("txtBtnPedir").innerText = t.btnPedir;

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
  document.getElementById("lblMetodo").innerText = t.lblMetodo;
  document.getElementById("lblRef").innerText = t.lblRef;
  document.getElementById("btnConfirmar").innerText = t.btnConfirmar;
  document.getElementById("txtSinopse").innerText = t.txtSinopse;
  document.getElementById("txtAvisoPDF").innerText = t.txtAvisoPDF;
  document.getElementById("btnFecharModal").innerText = t.btnFechar;
  document.getElementById("btnComprarModal").innerText = t.btnComprarModal;

  document.getElementById("tabLoginBtn").innerText = t.tabLogin;
  document.getElementById("tabRegisterBtn").innerText = t.tabRegister;
  document.getElementById("loginTitle").innerText = t.loginTitle;
  document.getElementById("lblLoginEmail").innerText = t.lblLoginEmail;
  document.getElementById("lblLoginPass").innerText = t.lblLoginPass;
  document.getElementById("btnLoginSubmit").innerText = t.btnLoginSubmit;
  document.getElementById("regTitle").innerText = t.regTitle;
  document.getElementById("lblRegName").innerText = t.lblRegName;
  document.getElementById("lblRegEmail").innerText = t.lblRegEmail;
  document.getElementById("lblRegPass").innerText = t.lblRegPass;
  document.getElementById("btnRegSubmit").innerText = t.btnRegSubmit;
  document.getElementById("footerCopy").innerHTML = t.footerCopy;

  renderizarCategorias();
  renderizarRodapé();
  carregarProdutos(produtos);
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
      <p><strong>🏦 Dados Bancários SA (ZAR):</strong> ${sb.banco} | Holder: ${sb.titular} | Acc: <b>${sb.conta}</b> | Branch: <b>${sb.branchCode}</b></p>
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
      <div>
        <div class="price">${precoExibido}</div>
        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button onclick="abrirModalPreview(${item.id})" style="flex: 1; background: #e2e8f0; color: #334155; border: none; padding: 8px; border-radius: 6px; font-weight: 600; cursor: pointer;">
            ${t.btnIntro}
          </button>
          <button onclick="iniciarCompra(${item.id})" class="btn-buy" style="flex: 1.5;">
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

  const precoAtual =
    idiomaAtual === "en-ZA"
      ? converterPreco(produtoSelecionado.preco)
      : produtoSelecionado.preco;

  document.getElementById("checkoutTitulo").innerText =
    idiomaAtual === "pt" ? "Pagar & Receber PDF" : "Pay & Receive PDF";
  document.getElementById("checkoutPreco").innerText =
    `${idiomaAtual === "pt" ? "Valor a pagar" : "Amount to pay"}: ${precoAtual}`;
  document.getElementById("statusPagamento").style.display = "none";
  document.getElementById("formCheckout").reset();

  atualizarInstrucoesPagamento();
  document.getElementById("checkoutModal").style.display = "flex";
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
        ? `<strong>Depósito / Transferência SA (${precoZAR}):</strong><br>🏦 <b>${sb.banco}</b><br>👤 Holder: ${sb.titular}<br>💳 Acc: <b>${sb.conta}</b> | Branch: <b>${sb.branchCode}</b>`
        : `<strong>SA Bank Deposit / Transfer (${precoZAR}):</strong><br>🏦 <b>${sb.banco}</b><br>👤 Holder: ${sb.titular}<br>💳 Acc: <b>${sb.conta}</b> | Branch: <b>${sb.branchCode}</b>`;
  }
}

function processarPagamentoViaWhatsApp(event) {
  event.preventDefault();

  const nome = document.getElementById("clienteNome").value;
  const email = document.getElementById("clienteEmail").value;
  const metodo = document.getElementById("metodoPagamento").value.toUpperCase();
  const ref = document.getElementById("referenciaPagamento").value;

  if (!produtoSelecionado) return;

  const tituloLivro =
    idiomaAtual === "en-ZA"
      ? produtoSelecionado.tituloEn
      : produtoSelecionado.titulo;
  const precoFinal =
    idiomaAtual === "en-ZA"
      ? converterPreco(produtoSelecionado.preco)
      : produtoSelecionado.preco;

  const mensagemWA =
    idiomaAtual === "pt"
      ? `🛍️ *NOVA COMPRA DE LIVRO (MozBookStore)*\n\n📖 *Livro:* ${tituloLivro}\n💰 *Valor:* ${precoFinal}\n👤 *Cliente:* ${nome}\n✉️ *E-mail:* ${email}\n💳 *Método:* ${metodo}\n🧾 *Comprovativo/Ref:* ${ref}\n\nOlá! Fiz o pagamento e aguardo a confirmação para receber o meu livro em PDF.\n\nObrigado pela compra! Volte sempre à MozBookStore! 📚✨`
      : `🛍️ *NEW BOOK PURCHASE (MozBookStore)*\n\n📖 *Book:* ${tituloLivro}\n💰 *Price:* ${precoFinal}\n👤 *Customer:* ${nome}\n✉️ *E-mail:* ${email}\n💳 *Method:* ${metodo}\n🧾 *Receipt/Ref:* ${ref}\n\nHello! I've made the payment and look forward to receiving my PDF book.\n\nThank you for your purchase! Come back soon to MozBookStore! 📚✨`;

  if (
    CONFIG_NOTIFICACOES.emailJsPublicKey !== "SUA_PUBLIC_KEY_AQUI" &&
    typeof emailjs !== "undefined"
  ) {
    emailjs
      .send(
        CONFIG_NOTIFICACOES.emailJsServiceId,
        CONFIG_NOTIFICACOES.emailJsTemplateId,
        {
          cliente_nome: nome,
          cliente_email: email,
          livro_titulo: tituloLivro,
          referencia: ref,
          metodo: metodo,
        },
      )
      .catch((err) => console.error("Erro EmailJS no checkout:", err));
  }

  alert(
    idiomaAtual === "pt"
      ? `Obrigado pela tua compra, ${nome}! A tua referência foi enviada com sucesso.\nVolte sempre à MozBookStore! 📚`
      : `Thank you for your purchase, ${nome}! Your reference was successfully sent.\nCome back soon to MozBookStore! 📚`,
  );

  const urlWA = `https://wa.me/${CONFIG_NOTIFICACOES.numeroWhatsAppPrincipal}?text=${encodeURIComponent(mensagemWA)}`;
  window.open(urlWA, "_blank");

  fecharModalCheckout();
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
        <span style="color: #64748b; font-size: 0.8rem;">Por ${livro.autor}</span>
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

function enviarPedidoLivro(event) {
  event.preventDefault();

  const titulo = document.getElementById("reqTitulo").value;
  const autor = document.getElementById("reqAutor").value || "Não especificado";
  const contacto = document.getElementById("reqContacto").value;
  const statusDiv = document.getElementById("statusPedido");

  statusDiv.innerHTML =
    idiomaAtual === "pt"
      ? "⏳ A registar pedido e a redirecionar para o WhatsApp..."
      : "⏳ Registering request and redirecting to WhatsApp...";

  const textoMensagem = `📚 *NOVO PEDIDO DE LIVRO (MozBookStore)*\n\n📖 *Livro/Exame:* ${titulo}\n✍ *Autor/Detalhes:* ${autor}\n👤 *Solicitante:* ${contacto}`;

  setTimeout(() => {
    const urlWa = `https://wa.me/${CONFIG_NOTIFICACOES.numeroWhatsAppPrincipal}?text=${encodeURIComponent(textoMensagem)}`;
    window.open(urlWa, "_blank");

    statusDiv.innerHTML =
      idiomaAtual === "pt"
        ? `<span style="color: #10b981;">✅ Pedido enviado! Abrimos o WhatsApp para confirmar com a nossa equipa.</span>`
        : `<span style="color: #10b981;">✅ Request sent! WhatsApp opened to confirm with our team.</span>`;
    document.getElementById("formPedirLivro").reset();
  }, 1000);
}

function abrirModalLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function fecharModalLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function alternarAba(aba) {
  const btns = document.querySelectorAll(".tab-btn");
  const formLogin = document.getElementById("formLogin");
  const formRegistro = document.getElementById("formRegistro");

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
  renderizarCategorias();
  renderizarRodapé();
  carregarProdutos(produtos);
};
