import { api } from "@/lib/api";

export const apiCreateCustomer = async () => {
    const response = await api.post('mcp/createCustomer');
    return response.data;
}

export const apiSaveCard = async (cardToken: string) => {
    const response = await api.post('mcp/saveCard', {
        token: cardToken,
    });
    return response.data;
}

export const apiGetCardSaved = async () => {
    const response = await api.get('mcp/getCardsSaved');
    return response.data;
}