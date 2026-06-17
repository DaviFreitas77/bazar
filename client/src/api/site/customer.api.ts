import { api } from "@/lib/api";

export const apiGetCustomer = async () => {
    const response = await api.get('mcp/getCustomer');
    return response.data;
}

export const apiSaveCard = async (cardToken: string) => {
    const response = await api.post('mcp/saveCard', {
        token: cardToken,
    });
    return response.data;
}


export interface CardSaved {
    id?: string;
    first_six_digits?: string;
    last_four_digits?: string;
    expiration_month?: number;
    expiration_year?: number;
    cardholder?: {
        name?: string;
    }
    issuer?: {
        name?: string
    },
    payment_method?: {
        id?: string,
        name?: string,
        payment_type_id?: string
        thumbnail?: string
    }
}
export const apiGetCardSaved = async () => {
    const response = await api.get('mcp/getCardsSaved');
    return response.data as CardSaved[];
}
