import { api } from "@/lib/api"

interface Products {
    id: string,
    quantity: number
}

export interface CalculateFreteProps {
    to: {
        postal_code: string
    }
    products: Products[]


}

export const CalculateFrete = async (items: CalculateFreteProps) => {
    console.log(items)
    const response = await api.post('/delivery/calculate-frete', items)
    return response.data
}