// --- CONFIGURAÇÃO DE CONTACTOS & DADOS BANCÁRIOS SA ---
const CONFIG_NOTIFICACOES = {
  numeroWhatsAppPrincipal: "258867568918",
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
const PREFIXOS_TELEFONICOS = [
  { codigo: "+258", pais: "Moçambique", paisEn: "Mozambique" },
  { codigo: "+27", pais: "África do Sul", paisEn: "South Africa" },
  { codigo: "+244", pais: "Angola", paisEn: "Angola" },
  { codigo: "+267", pais: "Botswana", paisEn: "Botswana" },
  { codigo: "+269", pais: "Comores", paisEn: "Comoros" },
  { codigo: "+243", pais: "RD Congo", paisEn: "DR Congo" },
  { codigo: "+268", pais: "Eswatini", paisEn: "Eswatini" },
  { codigo: "+251", pais: "Etiópia", paisEn: "Ethiopia" },
  { codigo: "+254", pais: "Quénia", paisEn: "Kenya" },
  { codigo: "+266", pais: "Lesoto", paisEn: "Lesotho" },
  { codigo: "+261", pais: "Madagáscar", paisEn: "Madagascar" },
  { codigo: "+265", pais: "Maláui", paisEn: "Malawi" },
  { codigo: "+230", pais: "Maurícia", paisEn: "Mauritius" },
  { codigo: "+264", pais: "Namíbia", paisEn: "Namibia" },
  { codigo: "+248", pais: "Seicheles", paisEn: "Seychelles" },
  { codigo: "+255", pais: "Tanzânia", paisEn: "Tanzania" },
  { codigo: "+256", pais: "Uganda", paisEn: "Uganda" },
  { codigo: "+260", pais: "Zâmbia", paisEn: "Zambia" },
  { codigo: "+263", pais: "Zimbábue", paisEn: "Zimbabwe" },
  { codigo: "+1", pais: "Estados Unidos / Canadá", paisEn: "United States / Canada" },
  { codigo: "+54", pais: "Argentina", paisEn: "Argentina" },
  { codigo: "+61", pais: "Austrália", paisEn: "Australia" },
  { codigo: "+55", pais: "Brasil", paisEn: "Brazil" },
  { codigo: "+86", pais: "China", paisEn: "China" },
  { codigo: "+20", pais: "Egito", paisEn: "Egypt" },
  { codigo: "+33", pais: "França", paisEn: "France" },
  { codigo: "+49", pais: "Alemanha", paisEn: "Germany" },
  { codigo: "+91", pais: "Índia", paisEn: "India" },
  { codigo: "+353", pais: "Irlanda", paisEn: "Ireland" },
  { codigo: "+39", pais: "Itália", paisEn: "Italy" },
  { codigo: "+81", pais: "Japão", paisEn: "Japan" },
  { codigo: "+212", pais: "Marrocos", paisEn: "Morocco" },
  { codigo: "+31", pais: "Países Baixos", paisEn: "Netherlands" },
  { codigo: "+64", pais: "Nova Zelândia", paisEn: "New Zealand" },
  { codigo: "+351", pais: "Portugal", paisEn: "Portugal" },
  { codigo: "+7", pais: "Rússia", paisEn: "Russia" },
  { codigo: "+966", pais: "Arábia Saudita", paisEn: "Saudi Arabia" },
  { codigo: "+65", pais: "Singapura", paisEn: "Singapore" },
  { codigo: "+82", pais: "Coreia do Sul", paisEn: "South Korea" },
  { codigo: "+34", pais: "Espanha", paisEn: "Spain" },
  { codigo: "+971", pais: "Emirados Árabes Unidos", paisEn: "United Arab Emirates" },
  { codigo: "+44", pais: "Reino Unido", paisEn: "United Kingdom" },
];

function converterPreco(precoMT) {
  const valorNumerico = parseFloat(precoMT.replace(" MT", ""));
  const valorZAR = (valorNumerico / TAXA_CAMBIO_ZAR).toFixed(2);
  return `R ${valorZAR}`;
}

function formatarTimestamp(timestamp) {
  const data = new Date(timestamp);
  if (!Number.isFinite(data.getTime())) {
    console.error("Timestamp inválido no registo de atividade:", timestamp);
    return String(timestamp);
  }
  return new Intl.DateTimeFormat(idiomaAtual === "pt" ? "pt-MZ" : "en-ZA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short",
  }).format(data);
}

function criarElementoTimestamp(timestamp) {
  const elemento = document.createElement("time");
  const data = new Date(timestamp);
  elemento.dateTime = Number.isFinite(data.getTime())
    ? data.toISOString()
    : String(timestamp);
  elemento.textContent = formatarTimestamp(timestamp);
  return elemento;
}

function carregarHistoricoAtividades() {
  try {
    const dados = localStorage.getItem(ACTIVITY_LOG_KEY);
    if (!dados) return;

    const eventos = JSON.parse(dados);
    if (!Array.isArray(eventos)) {
      throw new TypeError("O registo de atividade guardado não é uma lista.");
    }
    historicoAtividades = eventos.filter(
      (evento) =>
        evento &&
        typeof evento.timestamp === "string" &&
        Number.isFinite(Date.parse(evento.timestamp)) &&
        typeof evento.messageKey === "string" &&
        Object.prototype.hasOwnProperty.call(
          traducoes.pt,
          evento.messageKey,
        ) &&
        evento.details &&
        typeof evento.details === "object" &&
        !Array.isArray(evento.details),
    );
    if (historicoAtividades.length !== eventos.length) {
      erroHistoricoAtividades = true;
      console.error(
        "Algumas entradas inválidas do registo de atividade foram ignoradas.",
      );
    }
  } catch (error) {
    erroHistoricoAtividades = true;
    console.error("Não foi possível carregar o registo de atividade:", error);
  }
}

function descricaoAtividade(evento) {
  const modelo = traducoes[idiomaAtual][evento.messageKey];
  if (!modelo) {
    console.error(
      "Não existe tradução para a atividade registada:",
      evento.messageKey,
    );
    return evento.messageKey;
  }
  return modelo.replace(/\{(\w+)\}/g, (_, chave) =>
    String(evento.details[chave] ?? ""),
  );
}

function renderizarHistoricoAtividades() {
  const lista = document.getElementById("activityLog");
  const estado = document.getElementById("activityStatus");
  if (!lista || !estado) return;

  const t = traducoes[idiomaAtual];
  lista.replaceChildren();
  estado.textContent = erroHistoricoAtividades ? t.activityStorageError : "";
  estado.className = `account-status${erroHistoricoAtividades ? " error" : ""}`;

  if (historicoAtividades.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "activity-empty";
    vazio.textContent = t.activityEmpty;
    lista.appendChild(vazio);
    return;
  }

  historicoAtividades.forEach((evento) => {
    const item = document.createElement("li");
    item.className = "activity-entry";
    const descricao = document.createElement("p");
    descricao.className = "activity-description";
    descricao.textContent = descricaoAtividade(evento);
    const timestamp = criarElementoTimestamp(evento.timestamp);
    timestamp.className = "activity-timestamp";
    timestamp.setAttribute("aria-label", `${t.activityTimestamp}: ${timestamp.textContent}`);
    item.append(descricao, timestamp);
    lista.appendChild(item);
  });
}

function registarAtividade(messageKey, details = {}) {
  if (!Object.prototype.hasOwnProperty.call(traducoes.pt, messageKey)) {
    console.error("Tentativa de registar uma atividade desconhecida:", messageKey);
    return;
  }

  const evento = {
    timestamp: new Date().toISOString(),
    messageKey,
    details,
  };
  historicoAtividades.unshift(evento);
  try {
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(historicoAtividades));
    erroHistoricoAtividades = false;
  } catch (error) {
    erroHistoricoAtividades = true;
    console.error("Não foi possível guardar o registo de atividade:", error);
  }
  renderizarHistoricoAtividades();
}

function inicializarSeletoresTelefone() {
  const campos = [
    ["requestPhoneCode", "requestPhoneCustomCode", "requestPhoneNumber"],
    ["regPhoneCode", "regPhoneCustomCode", "regPhoneNumber"],
    ["checkoutPhoneCode", "checkoutPhoneCustomCode", "checkoutPhoneNumber"],
  ];
  const t = traducoes[idiomaAtual];

  campos.forEach(([selectId, customCodeId, numberId]) => {
    const select = document.getElementById(selectId);
    const customCode = document.getElementById(customCodeId);
    const number = document.getElementById(numberId);
    if (!select || !customCode || !number) return;

    const opcoesPrincipais = PREFIXOS_TELEFONICOS.slice(0, 2);
    const opcoesRestantes = PREFIXOS_TELEFONICOS.slice(2);
    [...opcoesPrincipais, ...opcoesRestantes].forEach((item, index) => {
      const option = document.createElement("option");
      option.value = item.codigo;
      option.textContent = `${index === 0 ? "🇲🇿 " : index === 1 ? "🇿🇦 " : ""}${item.codigo} — ${idiomaAtual === "pt" ? item.pais : item.paisEn}`;
      select.appendChild(option);
    });

    const customOption = document.createElement("option");
    customOption.value = "custom";
    customOption.id = `${selectId}CustomOption`;
    customOption.textContent = t.phoneCustomOption;
    select.appendChild(customOption);

    const atualizarCodigoPersonalizado = () => {
      const usarPersonalizado = select.value === "custom";
      customCode.hidden = !usarPersonalizado;
      customCode.required = usarPersonalizado && Boolean(number.value.trim());
      customCode.setCustomValidity("");
    };
    select.addEventListener("change", atualizarCodigoPersonalizado);
    number.addEventListener("input", atualizarCodigoPersonalizado);
    customCode.addEventListener("input", () => customCode.setCustomValidity(""));
    select.closest("form")?.addEventListener("reset", () => {
      window.setTimeout(atualizarCodigoPersonalizado, 0);
    });
    atualizarCodigoPersonalizado();
  });
}

function obterTelefoneInternacional(selectId, numberId, customCodeId) {
  const select = document.getElementById(selectId);
  const campoNumero = document.getElementById(numberId);
  const campoCodigoPersonalizado = document.getElementById(customCodeId);
  let prefixo = select.value;
  const digitosNumero = campoNumero.value.replace(/\D/g, "");

  if (!digitosNumero) {
    return { e164: "", prefixo: "", numero: "", error: "" };
  }

  if (prefixo === "custom") {
    const codigoPersonalizado =
      campoCodigoPersonalizado.value.trim().startsWith("+")
        ? campoCodigoPersonalizado.value.trim()
        : `+${campoCodigoPersonalizado.value.trim()}`;
    if (!/^\+[1-9]\d{0,3}$/.test(codigoPersonalizado)) {
      return {
        e164: "",
        prefixo: "",
        numero: "",
        error: traducoes[idiomaAtual].phoneCustomCodeRequired,
      };
    }
    prefixo = codigoPersonalizado;
  }

  const digitosPrefixo = prefixo.replace(/\D/g, "");
  let numero = digitosNumero;
  const numeroInternacional = campoNumero.value.trim().startsWith("+") ||
    numero.startsWith("00");
  if (numero.startsWith("00")) numero = numero.slice(2);
  if (numeroInternacional && !numero.startsWith(digitosPrefixo)) {
    return {
      e164: "",
      prefixo: "",
      numero: "",
      error: traducoes[idiomaAtual].phonePrefixMismatch,
    };
  }
  if (numero.startsWith(digitosPrefixo)) {
    numero = numero.slice(digitosPrefixo.length);
  }
  if (numero.startsWith("0")) numero = numero.slice(1);
  const e164 = `+${digitosPrefixo}${numero}`;

  if (numero.length < 4 || e164.length > 16) {
    return {
      e164: "",
      prefixo: "",
      numero: "",
      error: traducoes[idiomaAtual].phoneInvalid,
    };
  }

  return { e164, prefixo, numero, error: "" };
}

function preencherTelefoneInternacional(selectId, numberId, customCodeId, metadata) {
  const select = document.getElementById(selectId);
  const number = document.getElementById(numberId);
  const customCode = document.getElementById(customCodeId);
  const prefixo = metadata?.phone_country_code || "";
  const numero = metadata?.phone_number || "";
  if (!numero) return;

  const optionExists = Array.from(select.options).some(
    (option) => option.value === prefixo,
  );
  if (optionExists) {
    select.value = prefixo;
  } else if (prefixo) {
    select.value = "custom";
    customCode.value = prefixo;
  }
  number.value = numero;
  select.dispatchEvent(new Event("change", { bubbles: true }));
}

// --- VARIÁVEIS GLOBAIS ---
let idiomaAtual = "pt";
let produtoSelecionado = null;
let categoriaAtivaAtual = "todos";
let supabaseClient = null;
let utilizadorAtual = null;
let perfilAtual = null;
let produtoCompraPendente = null;
let checkoutCarrinhoPendente = false;
let carrinho = [];
let catalogOrderWarning = false;
let deferredInstallPrompt = null;
let pwaInstallMode = null;
let pwaInstallDismissed = false;
const PWA_INSTALL_SEEN_KEY = "mozbookstoreInstallPromptHandled";
const ACTIVITY_LOG_KEY = "mozbookstoreActivityLog";
let historicoAtividades = [];
let erroHistoricoAtividades = false;

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
      "Pedido registado. Confirme o envio no WhatsApp; o acesso ao livro será libertado após a aprovação do pagamento.",
    noOrders: "Ainda não existem encomendas.",
    noPurchases: "Ainda não tem compras.",
    adminOnly: "Esta área está disponível apenas para a administração.",
    orderSaved: "Estado da encomenda actualizado.",
    orderChangedElsewhere:
      "A encomenda já foi actualizada. Actualize a lista e tente novamente.",
    btnDeleteOrder: "Apagar compra",
    orderDeleting: "A apagar a compra...",
    orderDeleteError: "Não foi possível apagar a compra.",
    orderDeleteNoRows:
      "A compra não foi apagada. Pode já ter sido removida ou a política de exclusão ainda não foi aplicada. Execute novamente supabase/setup.sql no SQL Editor do Supabase.",
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
      "Indique o título e os seus dados; vamos preparar uma mensagem para enviar à equipa pelo WhatsApp.",
    reqTituloPh: "Nome do livro ou exame *",
    reqAutorPh: "Autor / Categoria (Opcional)",
    reqContatoPh: "O seu nome *",
    requestPhoneLabel: "Número de WhatsApp *",
    requestPhoneHelp: "Escolha o país e introduza o número sem repetir o prefixo.",
    phoneNumberPh: "Número de telefone",
    phoneCustomCodePh: "+ código",
    phoneCustomCodeLabel: "Código internacional personalizado",
    phoneCodeLabel: "Prefixo internacional",
    requestPhoneNumberLabel: "Número de WhatsApp *",
    phoneCustomOption: "Outro código…",
    phoneCustomCodeRequired: "Indique o código internacional personalizado.",
    phoneInvalid: "Introduza um número de telefone válido.",
    phonePrefixMismatch:
      "O número já contém outro prefixo. Escolha o prefixo correspondente no selector.",
    phoneOptionalLabel: "Telefone / WhatsApp (opcional)",
    phoneRegistrationHelp:
      "O número será guardado no perfil para facilitar o contacto nos pedidos.",
    phoneCheckoutHelp:
      "Este número será incluído no resumo enviado pelo WhatsApp.",
    btnPedir: "🚀 Pedir e Notificar a Equipa",
    feedbackTitle: "💡 Ajude-nos a melhorar",
    feedbackDescription:
      "Partilhe sugestões; o WhatsApp abrirá com a mensagem pronta para confirmar o envio.",
    feedbackNamePh: "O seu nome (opcional)",
    feedbackEmailPh: "O seu email (opcional)",
    feedbackMessagePh: "Que melhoria gostaria de ver? *",
    feedbackSubmit: "Enviar feedback",
    feedbackUnavailable:
      "Não foi possível abrir o WhatsApp. Use a ligação abaixo para continuar.",
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
    catalogHelp:
      "Pesquise ou escolha uma categoria; veja a sinopse, adicione ao carrinho e ajuste as quantidades antes de finalizar.",
    cartHelp:
      "Confira os títulos, quantidades e total; pode alterar ou remover itens antes do checkout.",
    libraryHelp:
      "Acompanhe as compras: os PDFs ficam disponíveis para descarregar depois da aprovação do pagamento.",
    adminHelp:
      "Reveja as referências e valores pagos; aprove para libertar o acesso ou rejeite a encomenda.",
    loginHelp:
      "Entre na sua conta ou crie uma para guardar compras e aceder aos PDFs aprovados.",
    checkoutHelp:
      "Confirme a região, siga os dados de pagamento, introduza a referência e envie o resumo pelo WhatsApp.",
    searchHelp: "Pesquise por título, autor ou tipo de material.",
    categoryHelp: "Filtre os livros por categoria.",
    previewHelp: "Leia uma breve apresentação deste livro.",
    addToCartHelp: "Adicione este livro ao carrinho sem sair do catálogo.",
    buyNowHelp: "Adicione este livro e avance para o checkout.",
    languageHelp: "Altere o idioma do site entre Português e English (South Africa).",
    quizTitle: "Descobre o teu perfil de leitor",
    quizKicker: "🧠 Interactividade",
    quizButton: "🧠 Fazer quiz",
    quizHelp:
      "Responde a cinco perguntas rápidas sobre os teus gostos e recebe sugestões de leitura.",
    quizPrevious: "Anterior",
    quizNext: "Próxima",
    quizMissingAnswer:
      "Escolhe uma opção para avançar para a próxima pergunta.",
    quizMissingAnswers:
      "Responde a todas as perguntas para descobrir o teu perfil de leitor.",
    quizRestart: "Fazer novamente",
    btnIntro: "📖 Sinopse",
    btnComprar: "💳 Comprar",
    btnAdicionarCarrinho: "Adicionar",
    carrinhoTitulo: "🛒 O seu carrinho",
    carrinhoVazio: "Ainda não adicionou livros ao carrinho.",
    carrinhoTotal: "Total",
    carrinhoFinalizar: "Finalizar pedido",
    quantidade: "Quantidade",
    remover: "Remover",
    adicionarSucesso: "Livro adicionado ao carrinho.",
    quantidadeInvalida: "Introduza uma quantidade inteira válida.",
    checkoutTitulo: "Pagar e receber o PDF",
    lblNome: "Nome completo *",
    lblEmail: "Email da conta *",
    lblMetodo: "Forma de pagamento",
    saBankOption: "Banco/cartão sul-africano (ZAR)",
    nomeCheckoutPh: "Ex.: José da Silva",
    emailCheckoutPh: "Email associado à sua conta",
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
    footerSocialTitle:
      "Siga-nos nas redes sociais para ficar a par das atualizações",
    topBarSocialTitle: "Siga-nos para atualizações:",
    activityTitle: "Registo de atividade",
    activityDescription:
      "As ações ficam guardadas apenas neste dispositivo. Cada entrada mostra a data e hora local, incluindo os segundos.",
    activityEmpty: "Ainda não há atividades registadas.",
    activityStorageError:
      "Não foi possível guardar o registo neste dispositivo. As novas ações só ficarão visíveis enquanto esta página estiver aberta.",
    activityTimestamp: "Realizado em",
    activityReviewedAt: "Última revisão",
    activityCartAdded:
      "Livro adicionado ao carrinho: {book} (quantidade: {quantity}).",
    activityQuantityChanged:
      "Quantidade do livro {book} alterada para {quantity}.",
    activityCartRemoved: "Livro removido do carrinho: {book}.",
    activityCheckoutStarted: "Checkout iniciado ({items} artigo(s)).",
    activityOrderSubmitted: "Pedido submetido: {books}.",
    activityBookRequest: "Formulário de pedido de livro preparado no WhatsApp.",
    activityFeedback: "Formulário de feedback preparado no WhatsApp.",
    activityLogin: "Sessão iniciada.",
    activityRegister: "Conta criada.",
    activityLogout: "Sessão terminada.",
    activityPasswordRecovery: "Pedido de recuperação de palavra-passe enviado.",
    activityPasswordChanged: "Palavra-passe actualizada.",
    activityLibraryOpened: "Histórico de compras consultado.",
    activityAdminOpened: "Painel de administração consultado.",
    activityDownload: "PDF descarregado: {book}.",
    activityOrderDeleted: "Compra apagada: {book}.",
    activityOrderReviewed: "Encomenda {book}: {status}.",
    activityPreview: "Sinopse consultada: {book}.",
    activityCategory: "Categoria seleccionada: {category}.",
    activitySearch: "Livro seleccionado nas sugestões de pesquisa: {book}.",
    activityCatalogOpened: "Catálogo consultado.",
    activityLanguageChanged: "Idioma alterado para {language}.",
    activityQuizStarted: "Quiz iniciado.",
    activityQuizAnswer: "Resposta seleccionada na pergunta {question}.",
    activityQuizCompleted: "Quiz concluído.",
    activityQuizRestarted: "Quiz reiniciado.",
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
      "Order recorded. Confirm sending in WhatsApp; book access will be released after payment approval.",
    noOrders: "There are no orders yet.",
    noPurchases: "You have no purchases yet.",
    adminOnly: "This area is available to administrators only.",
    orderSaved: "Order status updated.",
    orderChangedElsewhere:
      "This order has already been updated. Refresh the list and try again.",
    btnDeleteOrder: "Delete purchase",
    orderDeleting: "Deleting purchase...",
    orderDeleteError: "The purchase could not be deleted.",
    orderDeleteNoRows:
      "The purchase was not deleted. It may already be removed, or the delete policy may not have been applied. Run supabase/setup.sql again in the Supabase SQL Editor.",
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
      "Enter the title and your contact details; we will prepare a message to send to the team on WhatsApp.",
    reqTituloPh: "Book Name or Exam *",
    reqAutorPh: "Author / Category (Optional)",
    reqContatoPh: "Your name *",
    requestPhoneLabel: "WhatsApp number *",
    requestPhoneHelp: "Choose your country and enter the number without repeating the calling code.",
    phoneNumberPh: "Phone number",
    phoneCustomCodePh: "+ code",
    phoneCustomCodeLabel: "Custom international calling code",
    phoneCodeLabel: "International calling code",
    requestPhoneNumberLabel: "WhatsApp number *",
    phoneCustomOption: "Other code…",
    phoneCustomCodeRequired: "Enter the custom international calling code.",
    phoneInvalid: "Enter a valid phone number.",
    phonePrefixMismatch:
      "The number already contains a different calling code. Select the matching code from the list.",
    phoneOptionalLabel: "Phone / WhatsApp (optional)",
    phoneRegistrationHelp:
      "Your number will be saved to your profile to simplify contact on requests.",
    phoneCheckoutHelp:
      "This number will be included in the summary sent on WhatsApp.",
    btnPedir: "🚀 Request & Notify Team",
    feedbackTitle: "💡 Help us improve",
    feedbackDescription:
      "Share a suggestion; WhatsApp will open with the message ready for you to send.",
    feedbackNamePh: "Your name (optional)",
    feedbackEmailPh: "Your email (optional)",
    feedbackMessagePh: "What improvement would you like to see? *",
    feedbackSubmit: "Send feedback",
    feedbackUnavailable:
      "Could not open WhatsApp. Use the link below to continue.",
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
    catalogHelp:
      "Search or choose a category; preview a book, add it to your cart, and adjust quantities before checkout.",
    cartHelp:
      "Review titles, quantities, and the total; edit or remove items before checkout.",
    libraryHelp:
      "Track your purchases: PDFs are available to download after payment approval.",
    adminHelp:
      "Review payment references and amounts; approve to unlock access or reject the order.",
    loginHelp:
      "Sign in or create an account to keep track of purchases and access approved PDFs.",
    checkoutHelp:
      "Confirm your region, follow the payment details, enter the reference, and send the summary on WhatsApp.",
    searchHelp: "Search by title, author, or material type.",
    categoryHelp: "Filter books by category.",
    previewHelp: "Read a short introduction to this book.",
    addToCartHelp: "Add this book to your cart and keep browsing.",
    buyNowHelp: "Add this book and continue to checkout.",
    languageHelp: "Switch the site language between Portuguese and English (South Africa).",
    quizTitle: "Discover your reader profile",
    quizKicker: "🧠 Interactive",
    quizButton: "🧠 Play Quiz",
    quizHelp:
      "Answer five quick questions about your reading tastes and get book suggestions.",
    quizPrevious: "Previous",
    quizNext: "Next",
    quizMissingAnswer: "Choose an option to continue to the next question.",
    quizMissingAnswers:
      "Answer every question to discover your reader profile.",
    quizRestart: "Take it again",
    btnIntro: "📖 Synopsis",
    btnComprar: "💳 Buy",
    btnAdicionarCarrinho: "Add",
    carrinhoTitulo: "🛒 Your cart",
    carrinhoVazio: "You have not added any books to the cart yet.",
    carrinhoTotal: "Total",
    carrinhoFinalizar: "Checkout",
    quantidade: "Quantity",
    remover: "Remove",
    adicionarSucesso: "Book added to cart.",
    quantidadeInvalida: "Enter a valid whole-number quantity.",
    checkoutTitulo: "Pay & Receive PDF",
    lblNome: "Full Name *",
    lblEmail: "Account email *",
    lblMetodo: "Payment Method",
    saBankOption: "South African Bank / Card (ZAR)",
    nomeCheckoutPh: "E.g. Jose da Silva",
    emailCheckoutPh: "Email linked to your account",
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
    activityTitle: "Activity log",
    activityDescription:
      "Actions are stored only on this device. Each entry shows the local date and time, including seconds.",
    activityEmpty: "There is no activity recorded yet.",
    activityStorageError:
      "The log could not be saved on this device. New actions will only remain visible while this page is open.",
    activityTimestamp: "Performed at",
    activityReviewedAt: "Last reviewed",
    activityCartAdded:
      "Book added to cart: {book} (quantity: {quantity}).",
    activityQuantityChanged:
      "Quantity for {book} changed to {quantity}.",
    activityCartRemoved: "Book removed from cart: {book}.",
    activityCheckoutStarted: "Checkout started ({items} item(s)).",
    activityOrderSubmitted: "Order submitted: {books}.",
    activityBookRequest: "Book request form prepared in WhatsApp.",
    activityFeedback: "Feedback form prepared in WhatsApp.",
    activityLogin: "Signed in.",
    activityRegister: "Account created.",
    activityLogout: "Signed out.",
    activityPasswordRecovery: "Password recovery request sent.",
    activityPasswordChanged: "Password updated.",
    activityLibraryOpened: "Purchase history viewed.",
    activityAdminOpened: "Administration panel viewed.",
    activityDownload: "PDF downloaded: {book}.",
    activityOrderDeleted: "Purchase deleted: {book}.",
    activityOrderReviewed: "Order {book}: {status}.",
    activityPreview: "Book synopsis viewed: {book}.",
    activityCategory: "Category selected: {category}.",
    activitySearch: "Book selected from search suggestions: {book}.",
    activityCatalogOpened: "Catalogue viewed.",
    activityLanguageChanged: "Language changed to {language}.",
    activityQuizStarted: "Quiz started.",
    activityQuizAnswer: "Answer selected for question {question}.",
    activityQuizCompleted: "Quiz completed.",
    activityQuizRestarted: "Quiz restarted.",
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
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800",
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

function alternarIdioma() {
  idiomaAtual = idiomaAtual === "pt" ? "en-ZA" : "pt";
  aplicarIdioma();
  registarAtividade("activityLanguageChanged", {
    language: idiomaAtual === "pt" ? "Português (MZ)" : "English (SA)",
  });
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
  document.getElementById("searchInput").setAttribute("aria-label", t.searchHelp);
  document.getElementById("txtHeroTitulo").innerText = t.heroTitulo;
  document.getElementById("txtHeroSub").innerText = t.heroSub;
  document.getElementById("btnIrPedido").innerText = t.btnIrPedido;
  document.getElementById("btnIrFeedback").innerText = t.btnIrFeedback;
  document.getElementById("txtPedirTitulo").innerText = t.pedirTitulo;
  document.getElementById("txtPedirSub").innerText = t.pedirSub;

  document.getElementById("reqTitulo").placeholder = t.reqTituloPh;
  document.getElementById("reqAutor").placeholder = t.reqAutorPh;
  document.getElementById("reqContacto").placeholder = t.reqContatoPh;
  document.getElementById("requestPhoneNumber").placeholder =
    t.requestPhoneLabel;
  document.getElementById("requestPhoneNumber").setAttribute(
    "aria-label",
    t.requestPhoneNumberLabel,
  );
  document.getElementById("requestPhoneHelp").innerText = t.requestPhoneHelp;
  document.getElementById("requestPhoneCustomCode").placeholder =
    t.phoneCustomCodePh;
  document.getElementById("requestPhoneCustomCode").setAttribute(
    "aria-label",
    t.phoneCustomCodeLabel,
  );
  document.getElementById("requestPhoneCodeCustomOption").innerText =
    t.phoneCustomOption;
  ["requestPhoneCode", "regPhoneCode", "checkoutPhoneCode"].forEach((id) => {
    const select = document.getElementById(id);
    select.setAttribute("aria-label", t.phoneCodeLabel);
    Array.from(select.options).forEach((option) => {
      if (option.value === "custom") {
        option.textContent = t.phoneCustomOption;
        return;
      }
      const country = PREFIXOS_TELEFONICOS.find(
        (item) => item.codigo === option.value,
      );
      if (country) {
        const countryName =
          idiomaAtual === "pt" ? country.pais : country.paisEn;
        const emoji =
          option.value === "+258"
            ? "🇲🇿 "
            : option.value === "+27"
              ? "🇿🇦 "
              : "";
        option.textContent = `${emoji}${country.codigo} — ${countryName}`;
      }
    });
  });
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
  document.getElementById("feedbackMessage").placeholder = t.feedbackMessagePh;
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
  document.getElementById("lblCheckoutPhone").innerText = t.phoneOptionalLabel;
  document.getElementById("checkoutPhoneHelp").innerText = t.phoneCheckoutHelp;
  document.getElementById("checkoutPhoneNumber").placeholder =
    t.phoneNumberPh;
  document.getElementById("checkoutPhoneCustomCode").placeholder =
    t.phoneCustomCodePh;
  document.getElementById("checkoutPhoneCustomCode").setAttribute(
    "aria-label",
    t.phoneCustomCodeLabel,
  );
  document.getElementById("checkoutPhoneCodeCustomOption").innerText =
    t.phoneCustomOption;
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
  document.getElementById("cartTitle").innerText = t.carrinhoTitulo;
  document.getElementById("cartEmpty").innerText = t.carrinhoVazio;
  document.getElementById("cartCheckout").innerText = t.carrinhoFinalizar;
  document.getElementById("activityTitle").innerText = t.activityTitle;
  document.getElementById("activityDescription").innerText =
    t.activityDescription;
  document.getElementById("catalogHelp").innerText = t.catalogHelp;
  document.getElementById("libraryHelp").innerText = t.libraryHelp;
  document.getElementById("adminHelp").innerText = t.adminHelp;
  document.getElementById("loginHelp").innerText = t.loginHelp;
  document.getElementById("checkoutHelp").innerText = t.checkoutHelp;
  document.getElementById("quizHelp").innerText = t.quizHelp;
  document.getElementById("quizTitle").innerText = t.quizTitle;
  document.getElementById("quizKicker").innerText = t.quizKicker;
  document.getElementById("quizTrigger").innerText = t.quizButton;
  document.getElementById("quizPrev").innerText = t.quizPrevious;
  document.getElementById("quizNext").innerText = t.quizNext;
  document.getElementById("searchInput").title = t.searchHelp;
  document.getElementById("btnTraduzir").title = t.languageHelp;
  document.getElementById("txtBtnLogin").title = t.loginHelp;
  document.getElementById("btnBiblioteca").title = t.libraryHelp;
  document.getElementById("btnAdmin").title = t.adminHelp;
  document.getElementById("cartCheckout").title = t.cartHelp;
  document.getElementById("quizTrigger").title = t.quizHelp;
  document.getElementById("libraryBackButton").title = t.catalogHelp;
  document.getElementById("adminBackButton").title = t.catalogHelp;
  document.getElementById("btnEsqueceuPassword").title =
    idiomaAtual === "pt"
      ? "Receba por email uma ligação para criar uma nova palavra-passe."
      : "Receive an email link to create a new password.";

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
  document.getElementById("lblRegPhone").innerText = t.phoneOptionalLabel;
  document.getElementById("regPhoneHelp").innerText = t.phoneRegistrationHelp;
  document.getElementById("regPhoneNumber").placeholder = t.phoneNumberPh;
  document.getElementById("regPhoneCustomCode").placeholder =
    t.phoneCustomCodePh;
  document.getElementById("regPhoneCustomCode").setAttribute(
    "aria-label",
    t.phoneCustomCodeLabel,
  );
  document.getElementById("regPhoneCodeCustomOption").innerText =
    t.phoneCustomOption;
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
  atualizarTextoInstalacaoPwa();

  renderizarCategorias();
  renderizarRodapé();
  renderizarCarrinho();
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
  if (document.getElementById("quizModal").style.display === "flex") {
    renderizarQuiz();
    if (quizEstado.concluido) concluirQuiz();
  }
  renderizarHistoricoAtividades();
}

function atualizarTextoInstalacaoPwa() {
  const titulo = document.getElementById("pwaInstallTitle");
  if (!titulo) return;

  const portugues = idiomaAtual === "pt";
  titulo.innerText = portugues
    ? "Instale a MozBookStore"
    : "Install MozBookStore";
  let mensagemInstalacao;
  if (pwaInstallMode === "ios") {
    mensagemInstalacao = portugues
      ? "Adicione a MozBookStore ao ecrã inicial pelo menu Partilhar do navegador."
      : "Add MozBookStore to your home screen from your browser’s Share menu.";
  } else if (pwaInstallMode === "android") {
    mensagemInstalacao = portugues
      ? "Instale pelo menu do navegador ou toque abaixo para ver os passos."
      : "Install from your browser menu, or tap below to see the steps.";
  } else {
    mensagemInstalacao = portugues
      ? "Instale pelo navegador ou toque abaixo para ver os passos."
      : "Install from your browser, or tap below to see the steps.";
  }
  document.getElementById("pwaInstallMessage").innerText = mensagemInstalacao;
  document.getElementById("pwaInstallAction").innerText = portugues
    ? "Instalar"
    : "Install";
  document.getElementById("pwaInstallAction").title = portugues
    ? "Toque para instalar ou ver instruções; esta sugestão não voltará a aparecer."
    : "Tap to install or view instructions; this suggestion will not appear again.";
  document.getElementById("pwaInstallDialogTitle").innerText = portugues
    ? "Como instalar a MozBookStore"
    : "How to install MozBookStore";
  document.getElementById("pwaInstallDialogMessage").innerText =
    obterInstrucoesInstalacaoPwa(portugues);
  document.getElementById("pwaInstallDialogClose").innerText = portugues
    ? "Fechar"
    : "Close";
  document
    .getElementById("pwaInstallDismiss")
    .setAttribute(
      "aria-label",
      portugues ? "Fechar sugestão de instalação" : "Close install suggestion",
    );
  document.getElementById("pwaInstallDismiss").title = portugues
    ? "Fechar e não mostrar novamente"
    : "Dismiss and do not show again";
}

function obterInstrucoesInstalacaoPwa(portugues) {
  if (pwaInstallMode === "ios") {
    return portugues
      ? "No Safari, toque em Partilhar, escolha “Adicionar ao ecrã principal” e confirme em “Adicionar”. Se estiver noutro navegador, abra este site no Safari."
      : "In Safari, tap Share, choose “Add to Home Screen”, then tap “Add”. If you are using another browser, open this site in Safari.";
  }

  if (pwaInstallMode === "android") {
    return portugues
      ? "Toque no menu ⋮ do navegador e escolha “Instalar app” ou “Adicionar ao ecrã inicial”. Depois confirme. Se a opção não aparecer, abra o site no Chrome."
      : "Tap your browser’s ⋮ menu and choose “Install app” or “Add to Home screen”, then confirm. If that option is not available, open the site in Chrome.";
  }

  return portugues
    ? "No Chrome ou Edge, use o ícone de instalação junto à barra de endereço ou abra o menu do navegador e escolha “Instalar MozBookStore”. No Safari do Mac, escolha Ficheiro > Adicionar à Dock."
    : "In Chrome or Edge, use the install icon beside the address bar or open the browser menu and choose “Install MozBookStore”. In Safari on Mac, choose File > Add to Dock.";
}

function inicializarSugestaoInstalacaoPwa() {
  const banner = document.getElementById("pwaInstallBanner");
  const botaoInstalar = document.getElementById("pwaInstallAction");
  const fechar = document.getElementById("pwaInstallDismiss");
  const dialogoInstalacao = document.getElementById("pwaInstallDialog");
  const fecharDialogo = document.getElementById("pwaInstallDialogClose");
  const appInstalada =
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    navigator.standalone === true;

  try {
    pwaInstallDismissed =
      localStorage.getItem(PWA_INSTALL_SEEN_KEY) === "true";
  } catch (error) {
    console.warn("Não foi possível ler a preferência de instalação:", error);
  }

  const guardarPreferenciaInstalacaoPwa = () => {
    pwaInstallDismissed = true;
    try {
      localStorage.setItem(PWA_INSTALL_SEEN_KEY, "true");
    } catch (error) {
      console.warn("Não foi possível guardar a preferência de instalação:", error);
    }
  };

  if (appInstalada) {
    guardarPreferenciaInstalacaoPwa();
    return;
  }
  if (!banner || pwaInstallDismissed) return;

  const ocultarSugestao = () => {
    guardarPreferenciaInstalacaoPwa();
    banner.hidden = true;
  };

  fechar.addEventListener("click", ocultarSugestao);
  fecharDialogo.addEventListener("click", () => {
    ocultarSugestao();
    dialogoInstalacao.close();
  });
  dialogoInstalacao.addEventListener("close", ocultarSugestao);

  botaoInstalar.addEventListener("click", async () => {
    ocultarSugestao();
    if (!deferredInstallPrompt) {
      if (typeof dialogoInstalacao.showModal === "function") {
        dialogoInstalacao.showModal();
      } else {
        window.alert(obterInstrucoesInstalacaoPwa(idiomaAtual === "pt"));
      }
      return;
    }

    const installPrompt = deferredInstallPrompt;
    deferredInstallPrompt = null;
    try {
      await installPrompt.prompt();
      const escolha = await installPrompt.userChoice;
      if (escolha.outcome === "accepted") guardarPreferenciaInstalacaoPwa();
    } catch (error) {
      console.error("Não foi possível iniciar a instalação da PWA:", error);
      if (typeof dialogoInstalacao.showModal === "function") {
        dialogoInstalacao.showModal();
      } else {
        window.alert(obterInstrucoesInstalacaoPwa(idiomaAtual === "pt"));
      }
    }
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    atualizarTextoInstalacaoPwa();
    if (!pwaInstallDismissed) banner.hidden = false;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    guardarPreferenciaInstalacaoPwa();
    banner.hidden = true;
  });

  const dispositivoApple =
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  pwaInstallMode = dispositivoApple
    ? "ios"
    : /android/i.test(navigator.userAgent)
      ? "android"
      : "desktop";
  atualizarTextoInstalacaoPwa();
  window.setTimeout(() => {
    if (!pwaInstallDismissed && !deferredInstallPrompt) {
      banner.hidden = false;
    }
  }, 1500);
}

inicializarSugestaoInstalacaoPwa();

// Renderizar Categorias Dinamicamente com Tradução
function renderizarCategorias() {
  const container = document.getElementById("categoriesContainer");
  container.innerHTML = "";

  categoriasLista.forEach((cat) => {
    const nomeCat = idiomaAtual === "pt" ? cat.pt : cat.en;
    const btn = document.createElement("button");
    btn.className = `cat-btn ${categoriaAtivaAtual === cat.id ? "active" : ""}`;
    btn.title = traducoes[idiomaAtual].categoryHelp;
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
        <button type="button" title="${t.previewHelp}" onclick="abrirModalPreview(${item.id})" class="btn-synopsis">
            ${t.btnIntro}
          </button>
        <button type="button" title="${t.addToCartHelp}" onclick="adicionarAoCarrinho(${item.id})" class="btn-cart-add">
            ${t.btnAdicionarCarrinho}
          </button>
        <button type="button" title="${t.buyNowHelp}" onclick="iniciarCompra(${item.id})" class="btn-buy">
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
  registarAtividade("activityPreview", { book: tituloExibido });
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

function obterProdutoCarrinho(id) {
  return produtos.find((produto) => produto.id === id);
}

function obterTotalCarrinhoMZN() {
  return carrinho.reduce(
    (total, item) =>
      total + parseFloat(item.product.preco.replace(" MT", "")) * item.quantity,
    0,
  );
}

function obterTotalCarrinho(regiao = "mozambique") {
  return carrinho.reduce((total, item) => {
    const precoUnitario = parseFloat(item.product.preco.replace(" MT", ""));
    const precoLinha =
      regiao === "other"
        ? Number(((precoUnitario * item.quantity) / TAXA_CAMBIO_ZAR).toFixed(2))
        : precoUnitario * item.quantity;
    return total + precoLinha;
  }, 0);
}

function formatarTotal(total, regiao = "mozambique") {
  if (regiao === "other") {
    return `R ${total.toFixed(2)}`;
  }
  return `${total.toFixed(2)} MT`;
}

function adicionarAoCarrinho(id, incrementar = true) {
  const product = obterProdutoCarrinho(id);
  if (!product) return;
  const itemExistente = carrinho.find((item) => item.product.id === id);
  let alterado = false;
  if (itemExistente) {
    if (incrementar && itemExistente.quantity < 2147483647) {
      itemExistente.quantity += 1;
      alterado = true;
    }
  } else {
    carrinho.push({ product, quantity: 1 });
    alterado = true;
  }
  renderizarCarrinho();
  const status = document.getElementById("cartStatus");
  status.innerText = traducoes[idiomaAtual].adicionarSucesso;
  status.className = "account-status success";
  if (alterado) {
    const itemCarrinho = carrinho.find((item) => item.product.id === id);
    registarAtividade("activityCartAdded", {
      book: idiomaAtual === "en-ZA" ? product.tituloEn : product.titulo,
      quantity: itemCarrinho.quantity,
    });
  }
}

function alterarQuantidadeCarrinho(id, quantidade) {
  const item = carrinho.find((linha) => linha.product.id === id);
  const quantidadeNumerica = Number(quantidade);
  if (!item) return;
  if (
    !Number.isInteger(quantidadeNumerica) ||
    quantidadeNumerica < 1 ||
    quantidadeNumerica > 2147483647
  ) {
    const status = document.getElementById("cartStatus");
    status.innerText = traducoes[idiomaAtual].quantidadeInvalida;
    status.className = "account-status error";
    renderizarCarrinho();
    return;
  }
  const quantidadeAnterior = item.quantity;
  item.quantity = quantidadeNumerica;
  renderizarCarrinho();
  if (quantidadeAnterior !== quantidadeNumerica) {
    registarAtividade("activityQuantityChanged", {
      book:
        idiomaAtual === "en-ZA"
          ? item.product.tituloEn
          : item.product.titulo,
      quantity: quantidadeNumerica,
    });
  }
}

function removerDoCarrinho(id) {
  const item = carrinho.find((linha) => linha.product.id === id);
  if (!item) return;
  carrinho = carrinho.filter((item) => item.product.id !== id);
  renderizarCarrinho();
  registarAtividade("activityCartRemoved", {
    book:
      idiomaAtual === "en-ZA"
        ? item.product.tituloEn
        : item.product.titulo,
  });
}

function renderizarCarrinho() {
  const lista = document.getElementById("cartItems");
  if (!lista) return;
  const t = traducoes[idiomaAtual];
  lista.innerHTML = "";
  document.getElementById("cartEmpty").hidden = carrinho.length > 0;
  document.getElementById("cartCheckout").disabled = carrinho.length === 0;

  carrinho.forEach(({ product, quantity }) => {
    const linha = document.createElement("div");
    linha.className = "cart-item";
    const titulo = document.createElement("strong");
    titulo.innerText =
      idiomaAtual === "en-ZA" ? product.tituloEn : product.titulo;
    const precoUnitario = parseFloat(product.preco.replace(" MT", ""));
    const preco = document.createElement("span");
    preco.className = "cart-item-price";
    preco.innerText = `${formatarTotal(precoUnitario * quantity)} (${quantity} × ${formatarTotal(precoUnitario)})`;

    const quantidadeLabel = document.createElement("label");
    quantidadeLabel.innerText = t.quantidade;
    const quantidadeInput = document.createElement("input");
    quantidadeInput.type = "number";
    quantidadeInput.min = "1";
    quantidadeInput.max = "2147483647";
    quantidadeInput.step = "1";
    quantidadeInput.value = String(quantity);
    quantidadeInput.setAttribute(
      "aria-label",
      `${t.quantidade}: ${titulo.innerText}`,
    );
    quantidadeInput.addEventListener("change", () => {
      alterarQuantidadeCarrinho(product.id, quantidadeInput.value);
    });

    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "cart-remove";
    remover.innerText = t.remover;
    remover.addEventListener("click", () => removerDoCarrinho(product.id));
    linha.append(titulo, preco, quantidadeLabel, quantidadeInput, remover);
    lista.appendChild(linha);
  });

  document.getElementById("cartTotal").innerText =
    `${t.carrinhoTotal}: ${formatarTotal(obterTotalCarrinhoMZN())}`;
  atualizarResumoCheckout();
}

function atualizarResumoCheckout() {
  const checkoutPreco = document.getElementById("checkoutPreco");
  if (!checkoutPreco) return;
  const regiao =
    document.getElementById("regiaoPagamento")?.value || "mozambique";
  const nomesItens = carrinho.map(
    ({ product, quantity }) =>
      `${idiomaAtual === "en-ZA" ? product.tituloEn : product.titulo} × ${quantity}`,
  );
  const total = formatarTotal(obterTotalCarrinho(regiao), regiao);
  checkoutPreco.innerText = `${idiomaAtual === "pt" ? "Valor a pagar" : "Amount to pay"}: ${total}${nomesItens.length ? ` · ${nomesItens.join(", ")}` : ""}`;
}

function criarResumoPedidoWhatsApp(referencia, regiao, encomendas, telefone) {
  const nomeCliente =
    perfilAtual?.full_name ||
    utilizadorAtual.user_metadata?.full_name ||
    utilizadorAtual.email ||
    "";
  const linhas = encomendas.map((encomenda) => {
    const product = obterProdutoCarrinho(encomenda.product_id);
    const titulo =
      idiomaAtual === "en-ZA"
        ? product?.tituloEn || encomenda.product_title
        : product?.titulo || encomenda.product_title;
    const totalLinha = Number(encomenda.amount);
    const precoUnitario = totalLinha / encomenda.quantity;
    const moeda = encomenda.currency === "ZAR" ? "other" : "mozambique";
    const unidades =
      encomenda.quantity === 1
        ? idiomaAtual === "pt"
          ? "exemplar"
          : "copy"
        : idiomaAtual === "pt"
          ? "exemplares"
          : "copies";
    return `• ${titulo} — ${encomenda.quantity} ${unidades} × ${formatarTotal(precoUnitario, moeda)} = ${formatarTotal(totalLinha, moeda)}`;
  });
  const total = formatarTotal(
    encomendas.reduce((soma, encomenda) => soma + Number(encomenda.amount), 0),
    regiao,
  );
  const metodo = document.getElementById("metodoPagamento").selectedOptions[0].text;
  return `📚 *NOVO PEDIDO (MozBookStore)*\n\n👤 *Cliente:* ${nomeCliente}\n📧 *Email da conta:* ${utilizadorAtual.email || "Não fornecido"}${telefone ? `\n📱 *WhatsApp:* ${telefone}` : ""}\n\n📖 *Livros:*\n${linhas.join("\n")}\n\n💰 *Total:* ${total}\n💳 *Pagamento:* ${metodo}\n🔖 *Referência:* ${referencia}`;
}

function iniciarCheckoutCarrinho() {
  if (!carrinho.length) return;
  registarAtividade("activityCheckoutStarted", {
    items: carrinho.reduce((total, item) => total + item.quantity, 0),
  });
  if (!supabaseClient) {
    abrirModalLogin();
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authNotConfigured, true);
    return;
  }
  if (!utilizadorAtual) {
    checkoutCarrinhoPendente = true;
    abrirModalLogin();
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].authRequired, true);
    return;
  }
  abrirCheckout();
}

function iniciarCompra(id) {
  produtoSelecionado = produtos.find((p) => p.id === id);
  if (!produtoSelecionado) return;

  adicionarAoCarrinho(id, false);
  registarAtividade("activityCheckoutStarted", {
    items: carrinho.reduce((total, item) => total + item.quantity, 0),
  });
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
  if (!carrinho.length || !utilizadorAtual) return;

  document.getElementById("clienteNome").value =
    perfilAtual?.full_name || utilizadorAtual.user_metadata?.full_name || "";
  document.getElementById("clienteEmail").value = utilizadorAtual.email || "";
  document.getElementById("statusPagamento").style.display = "none";
  document.getElementById("statusPagamento").innerText = "";
  document.getElementById("formCheckout").reset();
  document.getElementById("clienteNome").value =
    perfilAtual?.full_name || utilizadorAtual.user_metadata?.full_name || "";
  document.getElementById("clienteEmail").value = utilizadorAtual.email || "";
  preencherTelefoneInternacional(
    "checkoutPhoneCode",
    "checkoutPhoneNumber",
    "checkoutPhoneCustomCode",
    utilizadorAtual.user_metadata,
  );
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
  atualizarResumoCheckout();
  atualizarInstrucoesPagamento();
}

function atualizarInstrucoesPagamento() {
  const metodo = document.getElementById("metodoPagamento").value;
  const caixaInstrucoes = document.getElementById("instrucoesPagamento");
  const precoMT = `${obterTotalCarrinho().toFixed(2)} MT`;
  const precoZAR = `R ${obterTotalCarrinho("other").toFixed(2)}`;

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

  if (!supabaseClient || !utilizadorAtual || !carrinho.length) {
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

  const telefone = obterTelefoneInternacional(
    "checkoutPhoneCode",
    "checkoutPhoneNumber",
    "checkoutPhoneCustomCode",
  );
  if (telefone.error) {
    status.innerText = telefone.error;
    status.className = "payment-status account-status error";
    status.style.display = "block";
    document.getElementById("checkoutPhoneNumber").focus();
    return;
  }

  const janelaWhatsApp = window.open("about:blank", "_blank");
  botao.disabled = true;
  status.innerText =
    idiomaAtual === "pt"
      ? "A registar a confirmação..."
      : "Submitting confirmation...";
  status.style.display = "block";

  const regiao = document.getElementById("regiaoPagamento");
  const metodoPagamento = document.getElementById("metodoPagamento");
  const itensPedido = carrinho.map((item) => ({
    user_id: utilizadorAtual.id,
    product_id: item.product.id,
    quantity: item.quantity,
    region: regiao.value,
    payment_method: metodoPagamento.value,
    transaction_reference: referencia,
  }));
  const { data: encomendas, error } = await supabaseClient
    .from("orders")
    .insert(itensPedido)
    .select("product_id,product_title,quantity,amount,currency");

  if (error) {
    if (janelaWhatsApp) janelaWhatsApp.close();
    botao.disabled = false;
    console.error("Erro ao registar a confirmação de pagamento:", error);
    status.innerText =
      idiomaAtual === "pt"
        ? `Não foi possível registar o pagamento: ${traduzirErroSupabase(error)}`
        : `Could not submit payment confirmation: ${traduzirErroSupabase(error)}`;
    return;
  }

  registarAtividade("activityOrderSubmitted", {
    books: encomendas
      .map((encomenda) => encomenda.product_title)
      .join(", "),
  });
  const textoWhatsApp = criarResumoPedidoWhatsApp(
    referencia,
    regiao.value,
    encomendas,
    telefone.e164,
  );
  const urlWhatsApp = `https://wa.me/${CONFIG_NOTIFICACOES.numeroWhatsAppPrincipal}?text=${encodeURIComponent(textoWhatsApp)}`;
  if (janelaWhatsApp) {
    janelaWhatsApp.opener = null;
    janelaWhatsApp.location.href = urlWhatsApp;
  }

  botao.disabled = false;
  const mensagemEstado = t.orderPending;
  carrinho = [];
  renderizarCarrinho();
  document.getElementById("formCheckout").reset();
  document.getElementById("clienteNome").value =
    perfilAtual?.full_name || utilizadorAtual.user_metadata?.full_name || "";
  document.getElementById("clienteEmail").value = utilizadorAtual.email || "";
  document.getElementById("referenciaPagamento").value = "";
  atualizarOpcoesPagamento();
  fecharModalCheckout();
  alternarVistaConta("biblioteca");
  await carregarBiblioteca();
  const estadoBiblioteca = document.getElementById("libraryStatus");
  estadoBiblioteca.innerText = `${mensagemEstado} `;
  estadoBiblioteca.className = "account-status success";
  if (!janelaWhatsApp) {
    const linkWhatsApp = document.createElement("a");
    linkWhatsApp.href = urlWhatsApp;
    linkWhatsApp.target = "_blank";
    linkWhatsApp.rel = "noopener noreferrer";
    linkWhatsApp.innerText =
      idiomaAtual === "pt" ? "Abrir WhatsApp" : "Open WhatsApp";
    estadoBiblioteca.appendChild(linkWhatsApp);
  }
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
  const categoriaSelecionada = categoriasLista.find(
    (item) => item.id === categoria,
  );
  registarAtividade("activityCategory", {
    category: categoriaSelecionada
      ? idiomaAtual === "pt"
        ? categoriaSelecionada.pt
        : categoriaSelecionada.en
      : categoria,
  });
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
  registarAtividade("activitySearch", { book: tituloLivro });
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
    statusElement.innerText = `${mensagemFallback} `;
    const link = document.createElement("a");
    link.href = urlWa;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerText =
      idiomaAtual === "pt" ? "💬 Abrir no WhatsApp" : "💬 Open WhatsApp";
    statusElement.appendChild(link);
    return false;
  }

  janelaWhatsApp.opener = null;
  statusElement.innerText =
    idiomaAtual === "pt"
      ? "✅ Mensagem pronta no WhatsApp. Confirme o envio na aplicação."
      : "✅ Message ready in WhatsApp. Confirm sending in the app.";
  return true;
}

function enviarPedidoLivro(event) {
  event.preventDefault();

  const titulo = document.getElementById("reqTitulo").value;
  const autor = document.getElementById("reqAutor").value || "Não especificado";
  const solicitante = document.getElementById("reqContacto").value.trim();
  const telefone = obterTelefoneInternacional(
    "requestPhoneCode",
    "requestPhoneNumber",
    "requestPhoneCustomCode",
  );
  const statusDiv = document.getElementById("statusPedido");
  if (telefone.error || !telefone.e164) {
    statusDiv.innerText = telefone.error || traducoes[idiomaAtual].phoneInvalid;
    statusDiv.className = "status-pedido error";
    return;
  }

  const textoMensagem = `📚 *NOVO PEDIDO DE LIVRO (MozBookStore)*\n\n📖 *Livro/Exame:* ${titulo}\n✍ *Autor/Detalhes:* ${autor}\n👤 *Solicitante:* ${solicitante}\n📱 *WhatsApp:* ${telefone.e164}`;
  const urlWa = `https://wa.me/${CONFIG_NOTIFICACOES.numeroWhatsAppPrincipal}?text=${encodeURIComponent(textoMensagem)}`;
  const aberto = abrirWhatsAppComFallback(
    urlWa,
    statusDiv,
    idiomaAtual === "pt"
      ? "⚠️ O navegador bloqueou a abertura automática."
      : "⚠️ Your browser blocked the automatic opening.",
  );
  registarAtividade("activityBookRequest");
  if (aberto) document.getElementById("formPedirLivro").reset();
}

function enviarFeedback(event) {
  event.preventDefault();

  const t = traducoes[idiomaAtual];
  const form = document.getElementById("formFeedback");
  const status = document.getElementById("feedbackStatus");
  const nome = document.getElementById("feedbackName").value.trim();
  const email = document.getElementById("feedbackEmail").value.trim();
  const mensagem = document.getElementById("feedbackMessage").value.trim();

  const textoMensagemWhatsApp = `💡 *NOVO FEEDBACK (MozBookStore)*\n\n👤 *Nome:* ${nome || "Anónimo"}\n📧 *Email:* ${email || "Não fornecido"}\n\n💬 *Sugestão:*\n${mensagem}`;
  const urlWhatsApp = `https://wa.me/${CONFIG_NOTIFICACOES.numeroWhatsAppPrincipal}?text=${encodeURIComponent(textoMensagemWhatsApp)}`;
  const aberto = abrirWhatsAppComFallback(
    urlWhatsApp,
    status,
    t.feedbackUnavailable,
  );
  registarAtividade("activityFeedback");
  if (aberto) form.reset();
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
    if (checkoutCarrinhoPendente) {
      checkoutCarrinhoPendente = false;
      abrirCheckout();
    } else if (produtoCompraPendente !== null) {
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
    return;
  }
  registarAtividade("activityLogin");
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
      { redirectTo: "https://mozbookstore-ai.github.io/MozBookStore/" },
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
    registarAtividade("activityPasswordRecovery");
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
  registarAtividade("activityPasswordChanged");

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

  const telefone = obterTelefoneInternacional(
    "regPhoneCode",
    "regPhoneNumber",
    "regPhoneCustomCode",
  );
  if (telefone.error) {
    mostrarEstadoAutenticacao(telefone.error, true);
    document.getElementById("regPhoneNumber").focus();
    return;
  }

  const botao = document.getElementById("btnRegSubmit");
  botao.disabled = true;
  const { data, error } = await supabaseClient.auth.signUp({
    email: document.getElementById("regEmail").value.trim(),
    password: document.getElementById("regPassword").value,
    options: {
      data: {
        full_name: document.getElementById("regName").value.trim(),
        ...(telefone.e164
          ? {
              phone_e164: telefone.e164,
              phone_country_code: telefone.prefixo,
              phone_number: telefone.numero,
            }
          : {}),
      },
    },
  });
  botao.disabled = false;

  if (error) {
    console.error("Erro ao criar conta:", error);
    mostrarEstadoAutenticacao(traduzirErroSupabase(error), true);
    return;
  }
  registarAtividade("activityRegister");
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
    registarAtividade("activityLogout");
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
  registarAtividade("activityLibraryOpened");
  await carregarBiblioteca();
}

async function carregarBiblioteca() {
  const lista = document.getElementById("libraryBooks");
  const status = document.getElementById("libraryStatus");
  lista.innerHTML = "";
  status.innerText = idiomaAtual === "pt" ? "A carregar..." : "Loading...";

  const { data: encomendas, error } = await supabaseClient
    .from("orders")
    .select(
      "id,product_id,product_title,quantity,amount,currency,status,created_at,reviewed_at",
    )
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
    detalhes.innerText = `${encomenda.quantity} ${traducoes[idiomaAtual].quantidade} · ${encomenda.amount} ${encomenda.currency} · ${rotulosEstado[encomenda.status]}`;
    cartao.append(titulo, detalhes);
    const dataCriacao = document.createElement("p");
    const rotuloCriacao = document.createElement("strong");
    rotuloCriacao.textContent = `${traducoes[idiomaAtual].activityTimestamp}: `;
    dataCriacao.append(rotuloCriacao, criarElementoTimestamp(encomenda.created_at));
    cartao.appendChild(dataCriacao);
    if (encomenda.reviewed_at) {
      const dataRevisao = document.createElement("p");
      const rotuloRevisao = document.createElement("strong");
      rotuloRevisao.textContent = `${traducoes[idiomaAtual].activityReviewedAt}: `;
      dataRevisao.append(
        rotuloRevisao,
        criarElementoTimestamp(encomenda.reviewed_at),
      );
      cartao.appendChild(dataRevisao);
    }
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
    console.error(
      `Não existe caminho de PDF configurado para o produto ${pedido.product_id}.`,
    );
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
  registarAtividade("activityDownload", { book: pedido.product_title });
}

async function mostrarPainelAdmin() {
  if (perfilAtual?.role !== "admin") {
    mostrarEstadoAutenticacao(traducoes[idiomaAtual].adminOnly, true);
    return;
  }
  alternarVistaConta("admin");
  registarAtividade("activityAdminOpened");
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
      "id,product_title,quantity,amount,currency,region,payment_method,transaction_reference,status,created_at,reviewed_at,profile:profiles!orders_user_id_fkey(full_name,email)",
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
      <p>${escaparHTML(encomenda.quantity)} ${t.quantidade} · ${escaparHTML(encomenda.payment_method.toUpperCase())} · ${escaparHTML(encomenda.region)} · ${escaparHTML(encomenda.amount)} ${escaparHTML(encomenda.currency)}</p>
      <p><strong>${t.lblStatusPedido}:</strong> ${escaparHTML(statusEncomenda)}</p>
      <p><strong>${t.activityTimestamp}:</strong> ${escaparHTML(formatarTimestamp(encomenda.created_at))}</p>
      ${encomenda.reviewed_at ? `<p><strong>${t.activityReviewedAt}:</strong> ${escaparHTML(formatarTimestamp(encomenda.reviewed_at))}</p>` : ""}
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
        void reverEncomenda(encomenda, novoEstado);
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
  const { data, error } = await consulta.select("id");

  if (error || !data?.length) {
    console.error(
      "Não foi possível apagar a encomenda:",
      error ||
        "A encomenda não foi encontrada ou a política bloqueou a exclusão.",
    );
    status.innerText = error
      ? `${t.orderDeleteError} ${traduzirErroSupabase(error)}`
      : t.orderDeleteNoRows;
    status.className = "account-status error";
    return;
  }

  if (isAdmin) {
    await carregarEncomendasAdmin();
  } else {
    await carregarBiblioteca();
  }
  registarAtividade("activityOrderDeleted", {
    book: encomenda.product_title,
  });
  status.innerText = t.orderDeleted;
  status.className = "account-status success";
}

async function reverEncomenda(encomenda, estado) {
  const t = traducoes[idiomaAtual];
  const status = document.getElementById("adminStatus");
  status.innerText = idiomaAtual === "pt" ? "A actualizar..." : "Updating...";
  const { data, error } = await supabaseClient
    .from("orders")
    .update({ status: estado })
    .eq("id", encomenda.id)
    .eq("status", encomenda.status)
    .select("id")
    .maybeSingle();
  if (error) {
    console.error("Não foi possível actualizar o estado da encomenda:", error);
    status.innerText = traduzirErroSupabase(error);
    status.className = "account-status error";
    return;
  }

  if (!data) {
    status.innerText = traducoes[idiomaAtual].orderChangedElsewhere;
    status.className = "account-status error";
    await carregarEncomendasAdmin();
    return;
  }

  await carregarEncomendasAdmin();
  registarAtividade("activityOrderReviewed", {
    book: encomenda.product_title,
    status:
      estado === "approved"
        ? t.statusAprovado
        : estado === "rejected"
          ? t.statusRejeitado
          : t.statusPendente,
  });
  status.innerText = traducoes[idiomaAtual].orderSaved;
  status.className = "account-status success";
}

const quizPerguntas = [
  {
    pergunta: {
      pt: "Se tivesses uma tarde livre, que aventura de leitura escolhias?",
      en: "If you had a free afternoon, what reading adventure would you choose?",
    },
    opcoes: [
      {
        pt: "Aprender uma habilidade que possa experimentar hoje.",
        en: "Learn a skill I can try out today.",
        valor: "pratico",
      },
      {
        pt: "Viajar para um mundo novo ou descobrir uma grande história.",
        en: "Travel to a new world or discover a great story.",
        valor: "curioso",
      },
      {
        pt: "Explorar um tema a fundo e ligar todas as ideias.",
        en: "Explore a topic deeply and connect all the ideas.",
        valor: "estrategico",
      },
    ],
  },
  {
    pergunta: {
      pt: "Escolhe o teu companheiro ideal para uma viagem longa.",
      en: "Choose your ideal companion for a long journey.",
    },
    opcoes: [
      {
        pt: "Um guia prático cheio de dicas úteis.",
        en: "A practical guide packed with useful tips.",
        valor: "pratico",
      },
      {
        pt: "Um romance ou coleção de histórias surpreendentes.",
        en: "A novel or collection of surprising stories.",
        valor: "curioso",
      },
      {
        pt: "Um livro de estratégia, ciência ou grandes ideias.",
        en: "A book about strategy, science, or big ideas.",
        valor: "estrategico",
      },
    ],
  },
  {
    pergunta: {
      pt: "Qual destes superpoderes escolherias para aprender?",
      en: "Which of these learning superpowers would you choose?",
    },
    opcoes: [
      {
        pt: "Transformar qualquer explicação num plano de acção simples.",
        en: "Turn any explanation into a simple action plan.",
        valor: "pratico",
      },
      {
        pt: "Fazer perguntas infinitas e descobrir ligações inesperadas.",
        en: "Ask endless questions and discover unexpected connections.",
        valor: "curioso",
      },
      {
        pt: "Lembrar tudo e organizar ideias como um mapa perfeito.",
        en: "Remember everything and organize ideas like a perfect map.",
        valor: "estrategico",
      },
    ],
  },
  {
    pergunta: {
      pt: "Depois de terminares um livro de que gostaste, o que acontece?",
      en: "After finishing a book you loved, what happens next?",
    },
    opcoes: [
      {
        pt: "Experimento uma das ideias logo no dia seguinte.",
        en: "I try one of its ideas the very next day.",
        valor: "pratico",
      },
      {
        pt: "Procuro outra história ou um assunto completamente diferente.",
        en: "I look for another story or a completely different subject.",
        valor: "curioso",
      },
      {
        pt: "Anoto o que aprendi e defino o próximo objectivo.",
        en: "I write down what I learned and set my next goal.",
        valor: "estrategico",
      },
    ],
  },
  {
    pergunta: {
      pt: "Que ambiente combina mais contigo numa sessão de leitura?",
      en: "Which setting suits you best for a reading session?",
    },
    opcoes: [
      {
        pt: "Uma pausa curta com algo que me ajude a resolver um desafio.",
        en: "A short break with something that helps solve a challenge.",
        valor: "pratico",
      },
      {
        pt: "Um cantinho acolhedor e uma história que me prenda.",
        en: "A cozy corner and a story that pulls me in.",
        valor: "curioso",
      },
      {
        pt: "Um espaço tranquilo para estudar e avançar por etapas.",
        en: "A quiet space to study and make progress step by step.",
        valor: "estrategico",
      },
    ],
  },
];

const quizResultadoPorPerfil = {
  pratico: {
    titulo: { pt: "Leitor Prático", en: "The Practical Reader" },
    descricao: {
      pt: "Gostas de ideias úteis que saem depressa da página e chegam ao dia-a-dia. Aprender fazendo é o teu estilo!",
      en: "You love useful ideas that quickly move from the page into everyday life. Learning by doing is your style!",
    },
    recomendacao: {
      pt: "Culinária para Iniciantes ou Natação para Iniciantes",
      en: "Cooking for Beginners or Swimming for Beginners",
    },
  },
  curioso: {
    titulo: { pt: "Leitor Explorador", en: "The Curious Explorer" },
    descricao: {
      pt: "A tua curiosidade não tem botão de pausa: adoras histórias, surpresas e descobrir assuntos novos.",
      en: "Your curiosity has no pause button: you love stories, surprises, and discovering new subjects.",
    },
    recomendacao: {
      pt: "Calistenia para Iniciantes ou Ciclismo para Iniciantes",
      en: "Calisthenics for Beginners or Cycling for Beginners",
    },
  },
  estrategico: {
    titulo: { pt: "Leitor Estratega", en: "The Strategic Reader" },
    descricao: {
      pt: "Gostas de ligar pontos, aprofundar temas e transformar conhecimento num plano para chegar mais longe.",
      en: "You enjoy connecting the dots, exploring topics deeply, and turning knowledge into a plan for what comes next.",
    },
    recomendacao: {
      pt: "Futebol para Iniciantes ou Musculação para Iniciantes",
      en: "Football for Beginners or Weight Training for Beginners",
    },
  },
};

const quizEstado = {
  index: 0,
  respostas: {},
  concluido: false,
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

  const portugues = idiomaAtual === "pt";
  const t = traducoes[idiomaAtual];
  perguntaEl.textContent = perguntaAtual.pergunta[portugues ? "pt" : "en"];
  document.getElementById("quizProgress").textContent = portugues
    ? `Pergunta ${quizEstado.index + 1} de ${quizPerguntas.length}`
    : `Question ${quizEstado.index + 1} of ${quizPerguntas.length}`;
  opcoesEl.innerHTML = "";

  perguntaAtual.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "quiz-option";
    botao.textContent = opcao[portugues ? "pt" : "en"];

    if (quizEstado.respostas[quizEstado.index] === opcao.valor) {
      botao.classList.add("selected");
    }

    botao.addEventListener("click", () => {
      quizEstado.respostas[quizEstado.index] = opcao.valor;
      quizEstado.concluido = false;
      registarAtividade("activityQuizAnswer", {
        question: quizEstado.index + 1,
      });
      renderizarQuiz();
    });

    opcoesEl.appendChild(botao);
  });

  const ultimaPergunta = quizEstado.index === quizPerguntas.length - 1;
  anteriorBtn.hidden = quizEstado.index === 0;
  proximaBtn.textContent = quizEstado.concluido
    ? t.quizRestart
    : ultimaPergunta
      ? portugues
        ? "Ver resultado"
        : "See my result"
      : t.quizNext;
  resultadoEl.hidden = true;
}

function concluirQuiz() {
  const respostas = Object.values(quizEstado.respostas);
  if (respostas.length < quizPerguntas.length) {
    document.getElementById("quizResult").hidden = false;
    document.getElementById("quizResult").textContent =
      traducoes[idiomaAtual].quizMissingAnswers;
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
  const portugues = idiomaAtual === "pt";
  const resultadoEl = document.getElementById("quizResult");
  const jaConcluido = quizEstado.concluido;
  resultadoEl.hidden = false;
  resultadoEl.innerHTML = `
    <strong>${portugues ? "Perfil:" : "Profile:"} ${resultado.titulo[portugues ? "pt" : "en"]}</strong><br>
    ${resultado.descricao[portugues ? "pt" : "en"]}<br>
    <strong>${portugues ? "Sugestão:" : "Try:"}</strong> ${resultado.recomendacao[portugues ? "pt" : "en"]}
  `;
  quizEstado.concluido = true;
  document.getElementById("quizNext").textContent =
    traducoes[idiomaAtual].quizRestart;
  if (!jaConcluido) registarAtividade("activityQuizCompleted");
}

function reiniciarQuiz() {
  quizEstado.index = 0;
  quizEstado.respostas = {};
  quizEstado.concluido = false;
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
    registarAtividade("activityQuizStarted");
  });

  proximaBtn.addEventListener("click", () => {
    if (quizEstado.index < quizPerguntas.length - 1) {
      if (!(quizEstado.index in quizEstado.respostas)) {
        document.getElementById("quizResult").hidden = false;
        document.getElementById("quizResult").textContent =
          traducoes[idiomaAtual].quizMissingAnswer;
        return;
      }
      quizEstado.index += 1;
      document.getElementById("quizResult").hidden = true;
      renderizarQuiz();
      return;
    }

    if (quizEstado.concluido) {
      registarAtividade("activityQuizRestarted");
      reiniciarQuiz();
      return;
    }

    concluirQuiz();
  });

  anteriorBtn.addEventListener("click", () => {
    if (quizEstado.index > 0) {
      quizEstado.concluido = false;
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
  registarAtividade("activityCatalogOpened");
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
  carregarHistoricoAtividades();
  inicializarSeletoresTelefone();
  aplicarIdioma();
  inicializarSupabase();
};
