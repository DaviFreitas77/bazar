import { Helmet } from "react-helmet";

export function SeoOrders() {
  return (
    <Helmet>
      <title>Meus Pedidos | Bazar Online</title>

      <meta
        name="description"
        content="Veja todos os seus pedidos no Bazar Online. Acompanhe o status, revise detalhes e acesse informações de pagamento."
      />

      <meta
        name="keywords"
        content="meus pedidos, histórico de compras, bazar online, acompanhar pedido, status do pedido"
      />

      {/* Open Graph */}
      <meta property="og:title" content="Meus Pedidos - Bazar Online" />
      <meta
        property="og:description"
        content="Acompanhe todos os seus pedidos de roupas modernas e acessíveis no Bazar Online."
      />
      <meta property="og:image" content="/images/logo.png" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Meus Pedidos - Bazar Online" />
      <meta
        name="twitter:description"
        content="Acompanhe todos os seus pedidos de roupas modernas com facilidade."
      />
      <meta name="twitter:image" content="/images/logo.png" />

      <meta name="robots" content="noindex, follow" />
    </Helmet>
  );
}