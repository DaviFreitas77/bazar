import { Helmet } from "react-helmet";

export function SeoProduct({ name, price }: { name: string;  price: string }) {
    return (
        <Helmet>
            <title>{name} | Bazar Online - Roupas modernas</title>
            <meta
                name="description"
                content={`Compre ${name} por apenas ${price} no Bazar Online.`}
            />
            <meta property="og:title" content={`${name} - Bazar Online`} />
            <meta property="og:description" content={`Confira ${name} com preço acessível.`} />
            <meta property="og:image" content={`/images/logo.png`} />
        </Helmet>
    );
}