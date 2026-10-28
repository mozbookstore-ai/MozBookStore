# 📚 MozBookStore — Biblioteca & Central Académica Digital

> Plataforma digital acessível e intuitiva dedicada a estudantes em Moçambique e na África do Sul, facilitando o acesso a livros, manuais escolares, recursos académicos e literatura.

---

## ✨ Principais Funcionalidades

### 📖 Navegação & Leitura de Livros
* **Filtros por Categoria:** Navegação rápida entre categorias como *Enfermaria, Ciências Académicas, Literatura Portuguesa, Desenvolvimento Pessoal, Economia*, entre outros.
* **Pesquisa Inteligente:** Barra de busca em tempo real para localizar títulos, autores ou tópicos específicos.
* **Catálogo Organizado:** Pré-visualização de capas, autores, sinopses detalhadas e leituras recomendadas.

### 🛒 Carrinho de Compras & Encomendas Dinâmicas
* **Carrinho Interativo:** Adição/remoção de itens com cálculo automático do total.
* **Aviso de Frete Grátis:** Indicador visual para atingir a meta de entrega gratuita.
* **Checkout Direto via WhatsApp:** Processamento simples e rápido que envia o resumo da encomenda diretamente para o suporte no WhatsApp.

### 📑 Pedido Personalizado de Livros
* Formulário integrado para solicitar títulos ou manuais académicos que ainda não estejam presentes no catálogo.
* Notificação automática por e-mail e encaminhamento via WhatsApp para confirmação do pedido.

### 🎯 Quiz Académico Interativo
* Teste de conhecimento integrado com perguntas de escolha múltipla para estudantes.
* Feedback imediato com pontuação e explicações detalhadas para cada resposta.

### 🎬 Área Multimédia & Conteúdos
* Secção de conteúdos interativos e multimédia com dicas de estudo e recursos complementares.

### 💬 Atendimento Multicanal & Suporte
* Suporte multilinha no WhatsApp com atendimento direto para utilizadores em **Moçambique (`+258`)** e na **África do Sul (`+27`)**.
* Navegação acessível e suporte a múltiplos idiomas.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **PWA (Progressive Web App):** Service Workers (`sw.js`) e Web App Manifest (`manifest.json`) para suporte offline e instalação no ecrã principal.
* **Autenticação & Backend:** Supabase Integration
* **Notificações:** EmailJS
* **Acessibilidade & SEO:** Open Graph Protocol, Schema.org (JSON-LD), ARIA Labels

---

## 🚀 Como Executar o Projeto Localmente

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/mozbookstore-ai/MozBookStore.git
   cd MozBookStore
   ```

2. **Executar localmente:**

   Use um servidor HTTP local para que o Service Worker e os módulos externos funcionem corretamente:

   ```bash
   python3 -m http.server 8000
   ```

   Depois abra `http://localhost:8000` no navegador.
