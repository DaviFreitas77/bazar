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

## Estrutura do Projeto

```
Client/
├── public/             # Arquivos estáticos públicos
├── src/
│   ├── @types/         # Definições de tipos globais
│   ├── components/     # Componentes reutilizáveis
│   │   ├── checkout/   # Componentes específicos do checkout
│   │   ├── home/       # Componentes da página inicial
│   │   └── ui/         # Componentes de UI genéricos
│   ├── context/        # Context API
│   ├── hooks/          # Hooks personalizados
│   ├── lib/            # Utilitários e configurações
│   ├── pages/          # Páginas da aplicação
│   ├── schemas/        # schemas form


```

```
Server/


```

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
