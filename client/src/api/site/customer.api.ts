import { api } from "@/lib/api";

export const apiCreateCustomer = async () => {
    const response = await api.post('mcp/createCustomer');
    return response.data;
}