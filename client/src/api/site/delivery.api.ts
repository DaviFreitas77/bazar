import { api } from "@/lib/api"

interface Products {
    id: string,
    width: number,
    height: number,
    length: number,
    weight: number,
    insurance_value: number,
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