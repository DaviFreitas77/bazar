# Bazar

Uma plataforma de e-commerce moderna e responsiva desenvolvida com React e TypeScript. O projeto oferece uma experiência completa de compra, desde a navegação e filtragem de produtos até um checkout seguro do mercado pago.

##  Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna para garantir performance e manutenibilidade:

- **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)**: Para uma interface rápida e desenvolvimento ágil.
- **[TypeScript](https://www.typescriptlang.org/)**: Para tipagem estática e maior segurança no código.
- **[Tailwind CSS](https://tailwindcss.com/)**: Para estilização utilitária e responsiva.
- **[React Router](https://reactrouter.com/)**: Para gerenciamento de rotas e navegação.
- **[React Hook Form](https://react-hook-form.com/)** + **[Yup](https://github.com/jquense/yup)**: Para criação e validação de formulários complexos.
- **[Axios](https://axios-http.com/)**: Para comunicação com a API Backend.
- **[Mercado Pago SDK](https://www.mercadopago.com.br/developers/pt/docs/sdks-library/client-side/sdk-js-react-installation)**: Para integração de pagamentos transparente (Pix, Cartão).
- **[Swiper](https://swiperjs.com/react)**: Para carrosséis de imagens e produtos.
- **[Sonner](https://sonner.emilkowal.ski/)**: Para notificações (toasts) elegantes.
- **[Lucide React](https://lucide.dev/)**: Para ícones consistentes.

##  Funcionalidades

### Experiência de Compra

- **Catálogo de Produtos**: Listagem com filtros avançados por categoria, cor, tamanho e ordenação por preço.
- **Busca**: Barra de pesquisa para encontrar produtos rapidamente.
- **Detalhes do Produto**: Visualização detalhada com galeria de imagens, seleção de variações e produtos relacionados.
- **Carrinho de Compras**: Gerenciamento de itens, ajuste de quantidades e cálculo de subtotal.
- **Favoritos**: Lista de desejos para salvar produtos.

###  Checkout e Pagamento

- **Fluxo de Checkout**: Processo passo a passo (Dados Pessoais -> Entrega -> Pagamento).
- **Endereço**: Busca automática de endereço via CEP e gerenciamento de múltiplos endereços.
- **Entrega**: Opções de entrega em domicílio ou retirada no local.
- **Pagamento**: Integração completa com Mercado Pago para pagamentos via Pix e Cartão de Crédito.
- **Cupons**: Sistema para aplicação de cupons de desconto.

###  Área do Usuário

- **Autenticação**: Login e Cadastro de usuários.
- **Meus Pedidos**: Histórico completo de compras com status atualizado.
- **Meus Endereços**: Histórico completo de endereços salvos.


## Estrutura do Projeto

```
front-end/
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

##  Como Rodar o Projeto

1.  **Clone o repositório**

    ```bash
    git clone https://github.com/seu-usuario/bazar.git
    cd bazar/front-end
    ```

2.  **Instale as dependências**

    ```bash
    npm install
    ```

3.  **Execute o projeto**

    ```bash
    npm run dev
    ```

4.  Acesse a aplicação em `http://localhost:5173`
