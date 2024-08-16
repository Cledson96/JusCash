# jus-cash - Gerenciamento de Leads

## Descrição

Este projeto é uma aplicação de gerenciamento de Leads desenvolvida utilizando React. A aplicação permite que os usuários registrem novos Leads, atualizem seus status e visualizem detalhes específicos de cada Lead. O projeto segue uma arquitetura modular, dividida em Views, Controllers, Services e uma camada de API simulada com localStorage.

## Estrutura do Projeto

- **src/**: Contém todo o código-fonte do projeto.
  - **api/**: Simulação de uma API usando localStorage.
  - **components/**: Componentes reutilizáveis da interface do usuário.
  - **controllers/**: Lógica de controle que gerencia as interações entre as views e os serviços.
  - **services/**: Lógica de negócios e persistência de dados.
  - **views/**: Páginas principais da aplicação (e.g., Autenticação, Home).
  - **img/**: Imagens utilizadas na aplicação.
  - **styles/**: Estilos globais do projeto.
  - **App.tsx**: Componente principal que gerencia as rotas.
  - **index.tsx**: Ponto de entrada do React.

## Requisitos

- **Node.js** versão 14 ou superior
- **npm** ou **yarn** como gerenciador de pacotes

## Instalação

1. Clone o repositório para sua máquina local:

   git clone https://github.com/Cledson96/JusCash.git
   cd nome-do-repositorio

2.Instale as dependências necessárias:
npm install

## Executando o projeto

1. Inicie o servidor de desenvolvimento:

   npm start

2. Abra o navegador e acesse:

   http://localhost:3000

   A aplicação estará rodando localmente.

## Estrutura da aplicação

1. Autenticação:

Permite que usuários se registrem e façam login. As credenciais são gerenciadas localmente usando bcrypt e localStorage.

2. Gerenciamento de Leads:

Após o login, os usuários podem criar novos Leads, mover os Leads entre diferentes status (Cliente Potencial, Dados Confirmados, Análise do Lead) e visualizar detalhes específicos de cada Lead.

## Persistência de dados

A persistência de dados é feita utilizando o localStorage. A "API" do projeto simula operações de CRUD, armazenando e recuperando dados diretamente do localStorage.

## Considerações finais

Este projeto foi desenvolvido como parte de um desafio técnico. Ele demonstra o uso de React em conjunto com boas práticas de arquitetura, manipulação de estado e persistência de dados. O projeto é facilmente escalável e pode ser estendido para incluir novas funcionalidades ou integração com APIs reais.

Autor: Cledson Santos Souza

Linkedin:https://www.linkedin.com/in/cledson-santos/

Email: cledson1996@gmail.com
