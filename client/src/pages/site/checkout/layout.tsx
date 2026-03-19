import { Helmet } from "react-helmet";

export function SeoCheckout() {
    return (
        <Helmet>
            <title>Checkout | Bazar Online - Finalize sua compra</title>

            <meta
                name="description"
                content="Finalize sua compra no Bazar Online de forma rápida e segura. Confira seus produtos e conclua seu pedido com facilidade."
            />

            <meta
                name="keywords"
                content="checkout, finalizar compra, bazar online, roupas online, moda feminina, pagamento seguro"
            />

            {/* Open Graph */}
            <meta property="og:title" content="Checkout - Bazar Online" />
            <meta
                property="og:description"
                content="Finalize seu pedido de roupas modernas e acessíveis no Bazar Online."
            />
            <meta property="og:image" content="/images/logo.png" />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Checkout - Bazar Online" />
            <meta
                name="twitter:description"
                content="Finalize seu pedido de roupas modernas com segurança e facilidade."
            />
            <meta name="twitter:image" content="/images/logo.png" />

            <meta name="robots" content="noindex, follow" />
        </Helmet>
    );
}