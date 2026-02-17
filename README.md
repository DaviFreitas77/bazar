# Bazar

Uma plataforma de e-commerce moderna e responsiva desenvolvida com React e TypeScript e Laravel(API)

## Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna para garantir performance e manutenibilidade:

### Front-end

- **TypeScript**
- **React**
- **Tailwind CSS**
- **Shadcn UI**
- **Magic UI**

### Back-end

- **PHP**
- **Laravel**
- **mysql**

### Integrações

- **Mercado Pago**
- **ViaCEP**
- **Resend**

## Funcionalidades

### Experiência de Compra

- **Catálogo de Produtos**: Listagem com filtros avançados por categoria, cor, tamanho e ordenação por preço.
- **Busca**: Barra de pesquisa para encontrar produtos rapidamente.
- **Detalhes do Produto**: Visualização detalhada com galeria de imagens, seleção de variações e produtos relacionados.
- **Carrinho de Compras**: Gerenciamento de itens, ajuste de quantidades e cálculo de subtotal.
- **Confirmação de pagamento**: Integração com Resend para envios de emails rápidos e controlados.

### Checkout e Pagamento

- **Fluxo de Checkout**: Processo passo a passo (Dados Pessoais -> Entrega -> Pagamento).
- **Endereço**: Busca automática de endereço via CEP e gerenciamento de múltiplos endereços.
- **Entrega**: Opções de entrega em domicílio ou retirada no local.
- **Pagamento**: Integração completa com Mercado Pago para pagamentos via Pix e Cartão de Crédito.
- **Cupons**: Sistema para aplicação de cupons de desconto.
- **Confirmação de pagamento**: Integração com Resend para envios de emails rápidos e controlados.

### Área do Usuário

- **Autenticação**: Login e Cadastro de usuários.
- **Meus Pedidos**: Histórico completo de compras com status atualizado.
- **Meus Endereços**: Histórico completo de endereços salvos.
- **Meus favoritos** Histórico de favoritos.

## AREA DE ADMIN

- **Dashboard**: Visualização de métricas de vendas, faturamento e status dos pedidos.
- **Gestão de Produtos**: Cadastro, edição e remoção de produtos, incluindo upload de imagens e controle de estoque.
- **Comunicação**: Envio de e-mails promocionais e informativos para a base de usuários.

## Como Rodar o Projeto

## Passos (Client)

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/bazar.git
    cd bazar-ecommerce
    ```

2.  **Configuração do Front-end:**

    Acesse a pasta `client`, instale as dependências e inicie o servidor de desenvolvimento.

    ```bash
    cd client
    npm install
    npm run dev
    ```

    O front-end estará disponível em `http://localhost:5173`.

## Passos (Server)

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/bazar.git
    cd bazar-ecommerce
    ```

2.  **Configuração do Back-end:**

    Acesse a pasta `server`, instale as dependências e inicie o servidor de desenvolvimento.

    ```bash
    cd server
    composer install
    php artisan key:generate
    php artisan migrate
    php artisan db:seed
    php artisan serve

    ```

O Back-end estará disponível em `http://localhost:8000`.

## Rodar com Docker

### Pré-requisitos

- Docker instalado e em execução
- Docker Compose instalado

### Passos

1. **Subir os containers**

   Na raiz do projeto, execute:

   ```bash
   docker compose up -d
   ```

   Este comando irá criar e iniciar os containers de acordo com a configuração do `docker-compose.yml`.

2. **Acessar o container do servidor**

   ```bash
   docker exec -it bazar-ecommerce-server-1 bash
   ```

   Você agora está dentro do container.

3. **Instalar dependências e configurar o banco de dados**

   Dentro do container, execute:

   ```bash
   php artisan migrate
   php artisan db:seed
   ```

   - `php artisan migrate`: Executa as migrações do banco de dados
   - `php artisan db:seed`: Popula o banco de dados com dados de exemplo

4. **Acessar a aplicação**
   - **Front-end**: http://localhost:5173
   - **Back-end**: http://localhost:8000
   - **Documentação API**: http://localhost:8000/docs/api#

### Parar os containers

Para parar todos os containers, execute:

```bash
docker compose down
```
