import { Helmet } from "react-helmet-async";

export function SeoSearch() {
    return (
        <Helmet>
            <title>Buscar produtos | Bazar Online - Roupas modernas e acessíveis</title>

            <meta
                name="description"
                content="Encontre roupas modernas no Bazar Online. Pesquise por peças femininas e estilosas com qualidade e preços acessíveis."
            />

            <meta
                name="keywords"
                content="buscar roupas, loja de roupas online, moda feminina, roupas modernas, bazar online, roupas baratas"
            />

            <meta property="og:title" content="Bazar Online - Roupas modernas" />
            <meta property="og:description" content="Descubra roupas modernas com ótimo preço e qualidade." />
            <meta property="og:image" content="images/logo.png" />
            <meta property="og:type" content="website" />


            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Bazar Online" />
            <meta name="twitter:description" content="Moda moderna com preços acessíveis." />
            <meta name="twitter:image" content="/images/logo.png" />

            <meta name="robots" content="index, follow" />
        </Helmet>
    )

}