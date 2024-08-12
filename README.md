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

    PROJECT_GDB_SALT_ROUNDS=10
    PROJECT_GDB_SECRET_KEY=maya
    ```

## Executando Testes

Para executar os testes unitários, utilize o comando:

```bash
npm test