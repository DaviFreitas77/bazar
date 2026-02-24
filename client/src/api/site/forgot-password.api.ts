import { api } from "@/lib/api"


export const apiVerifyEmail = async (email: string) => {
    const response = await api.post('/forgot-password/verify-email', { mail: email })
    return response.data;
}

export const apiVerifyCode = async (code: string) => {
    const response = await api.post('/forgot-password/verify-code', { code: code })
    return response.data
}

export const apiResetPassword = async (email: string, code: string, newPassword: string) => {
    const response = await api.patch('/forgot-password/reset-password', { email, code, newPassword })

    return response.data;
}