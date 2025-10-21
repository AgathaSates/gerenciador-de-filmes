# GerenciadorDeFilmes

# 📌 Demonstração

## 🏠 Página Inicial

![Demonstração do Projeto](https://imgur.com/znDGBj2)

## 🏷️ Listagem por tipo

![Demonstração do Projeto]()

# 💡 Índice

- [Demonstração](#-demonstração)
- [Introdução](#-introdução)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Usadas](#-tecnologias-usadas)
- [Commits e Convenções](#-commits-e-convenções)
- [Contribuidores](#-contribuidores)
- [Mentores](#-mentores)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Feedback](#-feedback)
- [Como Contribuir](#-como-contribuir)

# 🎬 Introdução

O **Gestão de Filmes** é uma aplicação Angular que consome a API do TMDb.
Ele permite explorar filmes por categorias (ex.: populares, melhores avaliados, em cartaz) e realizar buscas por título diretamente pela barra de pesquisa.

# ✨ Funcionalidades

- 🗂️ **Listagem por tipo** – Navegue por categorias como **Populares**, **Melhores avaliados** e **Em cartaz**.

- 🔎 **Busca de filmes** – Barra de pesquisa na navbar com navegação para a página de resultados (query string).

- 📄 **Detalhes do filme** – Página dedicada para visualizar informações detalhadas do título selecionado.

- 📑 **Paginação “Carregar mais”** – Carregamento incremental de resultados por página.

- ✅ **Tratamento de estados** – Exibe mensagem de vazio quando não há resultados e desabilita a ação quando não há mais páginas.

- 🌐 **Integração com TMDb** – Consumo dos endpoints oficiais com **API Key** configurável via ambiente.

- 📱 **Layout responsivo** – Grid responsivo utilizando utilitários do Bootstrap.

## 🧱 Estrutura do Projeto

```text
Gerenciador-de-Filmes
│
├── .angular/.vscode/dist/node_modules/public
│
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── navbar/                 # Barra superior + busca (navega para /list-page/search?q=)
│   │   │   ├── home-page/              # Página inicial (pode exibir destaques)
│   │   │   ├── highlights-home-page/   # Seção de destaques/curadorias da home
│   │   │   ├── list-page/              # Listagem paginada por categoria/busca
│   │   │   ├── movie-details/          # Detalhe de filme (rota: /movie-details/:id)
│   │   │   └── card-movie/             # Cartão de filme (poster, título, meta)
│   │   │
│   │   ├── models
│   │   │   └── media-api-response.ts   # Tipos fortes (Media, MediaApiResponse, MediaCategory, etc.)
│   │   │
│   │   ├── services
│   │   │   └── media-service.ts        # HttpClient para TMDb + mapeamentos + paginação
│   │   │
│   │   ├── environments
│   │   │   ├── environment.development.ts
│   │   │   ├── environment.ts
│   │   │   └── example.environment.ts  # Exemplo com placeholder da API Key
│   │   │
│   │   ├── app.config.ts               # Providers e rotas (standalone)
│   │   ├── app.html                    # Template do root component
│   │   └── app.ts                      # Root component (standalone)
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── angular.json
├── eslint.config.mts
├── package.json
└── README.md


- 🧩 **Components**: UI e fluxo. `list-page` reage a `:category` e `?q=`; `card-movie` renderiza cada item; `movie-details` mostra o detalhe por `:id`.

- 🧠 **Models**: Tipagens fortes para respostas do TMDb (evita “código alfabeto”).

- 🔌 **Services**: `media-service.ts` centraliza chamadas ao TMDb (busca, populares, top rated, em cartaz) e mapeamentos.

- 🔐 **Environments**: Armazenam a **API Key** do TMDb (use `example.environment.ts` como referência).

- 🧭 **app.config.ts**: Define rotas standalone.

- 🎨 **styles.scss**: Estilização global (Bootstrap, utilitários, overrides, etc.).


## 🔧 Tecnologias Usadas

- ⚡ **Angular** — componentes standalone + **Angular Router**
- 🟦 **TypeScript** — tipagem forte em models e serviços
- 🔁 **RxJS** — streams reativas para rota, paginação e busca
- 🌐 **HttpClient** — consumo da **API TMDb**
- 🅱️ **Bootstrap 5** + **Bootstrap Icons** — layout responsivo e ícones (ex.: `bi-search`)
- 🎨 **SCSS** — estilos globais e utilitários
- ✅ **ESLint** — padronização de código (`eslint.config.mts`)
- 🔑 **Environments** — configuração de **API Key** por ambiente


# 🧠 Commits e Convenções

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) para padronizar as mensagens de commit.

# 👥 Contribuidores

<p align="left">
  <a href="https://github.com/AgathaSates">
    <img src="https://github.com/AgathaSates.png" width="100" style="border-radius: 50%;" alt="Tiago Santini"/>
    &nbsp;&nbsp;&nbsp;

</p>

| Nome         | GitHub                                         |
| ------------ | ---------------------------------------------- |
| Agatha Sates | [@AgathaSates](https://github.com/AgathaSates) |

# 👨‍🏫 Mentores

<p align="left" style="margin-left: 27px;">
  <a href="https://github.com/tiagosantini">
    <img src="https://github.com/tiagosantini.png" width="100" style="border-radius: 50%;" alt="Tiago Santini"/>
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/alexandre-rech-lages">
    <img src="https://github.com/alexandre-rech-lages.png" width="100" style="border-radius: 50%;" alt="Alexandre Rech"/>
  </a>
</p>

| Nome           | GitHub                                                     |
| -------------- | ---------------------------------------------------------- |
| Tiago Santini  | [@Tiago Santini](https://github.com/tiagosantini)          |
| Alexandre Rech | [@Alexandre Rech](https://github.com/alexandre-rech-lages) |

# 🏫 Sobre o Projeto

Desenvolvido durante o curso Fullstack da [Academia do Programador](https://academiadoprogramador.net) 2025
```
