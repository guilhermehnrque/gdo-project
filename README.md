# Projeto GDO

Este é um exemplo de um projeto Node.js com objetivo no desenvolvimento de uma API para gerenciamento ...

## Tecnologias Usadas

- **Node.js**: Plataforma para execução de código JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para SQL, facilitando a interação com bancos de dados.
- **dotenv**: Carregamento de variáveis de ambiente.
- **@godaddy/terminus**: Health checks para a aplicação.

## Requisitos

Certifique-se de ter [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) instalados.

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/guilhermehnrque/gdo-project.git
    ```

2. Navegue para o diretório do projeto:

    ```bash
    cd gdo-project
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Configure as variáveis de ambiente:

    Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias. Exemplo:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=root
    DB_NAME=volei-gdo
    ```

## Execução

1. Para iniciar o servidor, execute:

    ```bash
    npm start
    ```

2. Para iniciar o servidor em modo de desenvolvimento (com recarga automática):

    ```bash
    npm run dev
    ```

## Estrutura do Projeto

- **src/**: Código-fonte da aplicação.
  - **routes/**: Definição das rotas.
  - **models/**: Modelos Sequelize.
  - **controllers/**: Lógica dos controladores.
  - **config/**: Configurações do banco de dados e variáveis de ambiente.
  - **middleware/**: Middlewares personalizados.
  - **utils/**: Utilitários e funções auxiliares.

- **app.js**: Configuração principal da aplicação e inicialização do Express.

- **server.js**: Arquivo de entrada para iniciar o servidor.

## Testes

Para rodar os testes, use:

```bash
npm test
