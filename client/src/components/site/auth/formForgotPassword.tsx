import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/schemas/schemaAuth";
import { useState } from "react";
import { Loading } from "../loading/loading";
import type { FormForgotPasswordProps } from "@/@types/auth/register";
import { ProgressStep } from "../checkout/progress";
import { apiResetPassword, apiVerifyCode, apiVerifyEmail } from "@/api/site/forgot-password.api";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { InputFormOTP } from "@/components/ui/input-otp";
import { toast } from "sonner";

interface ForgotPassword {
    email: string;
    code: string;
    newPassword: string;
}

export function FormForgotPassword({ onChangeForm, onClose }: FormForgotPasswordProps) {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [stepForgot, setStepForgot] = useState<number>(1);
    const [emailStored, setEmailStored] = useState<string>('');

    const forgotSteps = [
        { id: 1, label: "Dados" },
        { id: 2, label: "Verificação" },
        { id: 3, label: "Nova senha" },

    ];

    const {
        register,
        handleSubmit,
        trigger,
        control,
        formState: { errors },
        getValues,
        reset,
    } = useForm<ForgotPassword>({
        resolver: yupResolver(forgotPasswordSchema),
        mode: "onBlur",
    });

    const handleVerifyMail = async () => {
        setErrorMessage("");
        setLoading(true);
        try {
            const isValid = await trigger("email");
            if (!isValid) {
                setLoading(false);
                return;
            }
            const emailValue = getValues("email");
            await apiVerifyEmail(emailValue);
            setEmailStored(emailValue);
            setStepForgot((prev) => prev + 1);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Erro ao verificar email");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        setErrorMessage("");
        setLoading(true)
        try {
            const isValid = await trigger("code");

            if (!isValid) {
                setLoading(false);
                return;
            }

            const codeValue = getValues("code")
            await apiVerifyCode(codeValue)

            setStepForgot((prev) => prev + 1)

        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Erro ao verificar Código");
        } finally {
            setLoading(false);
        }

    };

    const handleResetPassword = async (data: ForgotPassword) => {
        setErrorMessage("");
        setLoading(true);
        try {
            await apiResetPassword(emailStored, data.code, data.newPassword);
            toast.success("Senha alterada com sucesso!");
            setStepForgot(1);
            reset();
            onChangeForm('login')

        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Erro ao alterar senha");
        } finally {
            setLoading(false);
        }
    };



    return (
        <main className="w-full flex flex-col h-full">
            <section className="flex flex-col ">
                <div className="flex items-center justify-center">
                    <img src="/images/logo.png" alt="" className="w-20" />

                </div>
                <h2 className="mt-4 text-xl font-bold">{stepForgot == 1 ? "Recupere sua senha" : stepForgot == 2 ? 'Confirme seu email' : 'Alterar senha'}</h2>

                <p className="text-sm text-gray-600 mt-2 mb-10">
                    {stepForgot == 1 && 'Prencha seus dados para recuperar seu acesso'}

                    {stepForgot === 2 && (
                        <p>
                            Enviamos um código para <strong className="text-primary-50">{emailStored}</strong>
                        </p>
                    )}

                    {stepForgot === 3 && (
                        <p>Crie uma nova senha para recuperar o acesso à sua conta.</p>
                    )}
                </p>

                <div className="flex justify-center w-full ">
                    <ProgressStep step={stepForgot} steps={forgotSteps} />
                </div>
            </section>


            <form onSubmit={handleSubmit(handleResetPassword)} className="w-full text-sm mt-10" method="POST">
                <div className="flex flex-col gap-4 mb-2 w-full">
                    {stepForgot === 1 && (
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <div>{errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}</div>
                            </div>
                            <input
                                {...register("email")}
                                type="email"
                                className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2"
                                placeholder="seuemail@gmail.com"
                            />
                        </div>
                    )}

                    {stepForgot === 2 && (
                        <div>
                            <div className="flex flex-col justify-between mb-10">
                                <label className="text-sm font-medium text-gray-700 mb-2">Código de verificação</label>
                                <Controller
                                    name="code"
                                    control={control}
                                    render={({ field }) => (
                                        <InputFormOTP
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                                <div>{errors.code && <span className="text-red-500 text-xs ">{errors.code.message}</span>}</div>
                            </div>
                            <p className="text-gray-700 text-xs text-center">Não recebeu o código? <span className="text-primary-50 font-semibold">Reenviar</span></p>
                        </div>


                    )}

                    {stepForgot === 3 && (
                        <div className="w-full relative">
                            <label className="text-sm font-medium text-gray-700">Nova senha</label>
                            <input
                                {...register("newPassword")}
                                type={visiblePassword ? "text" : "password"}
                                className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2"
                                placeholder="Digite sua nova senha"
                            />
                            <span className="absolute top-10 right-3">
                                <button
                                    type="button"
                                    onClick={() => setVisiblePassword(!visiblePassword)}
                                    className="cursor-pointer hover:opacity-85"
                                >
                                    {visiblePassword ? <FaRegEyeSlash size={17} /> : <IoEyeOutline size={17} />}
                                </button>
                            </span>
                            <div className="h-2 mt-2">
                                {errors.newPassword && <span className="text-red-500 text-xs">{errors.newPassword.message}</span>}
                                {errorMessage && stepForgot === 3 && <span className="text-red-500 text-xs">{errorMessage}</span>}
                            </div>
                        </div>
                    )}
                </div>

                {errorMessage && stepForgot < 3 && <span className="text-red-500 text-xs">{errorMessage}</span>}

                <div className={`flex w-full ${stepForgot !== 1 && "hidden"}`}>
                    <button
                        type="button"
                        onClick={handleVerifyMail}
                        className="bg-primary-50 transition-colors text-white px-6 p-3 rounded-sm font-semibold w-full hover:bg-primary-100 cursor-pointer mt-4"
                    >
                        {loading ? <Loading /> : "Enviar email"}
                    </button>
                </div>

                <div className={`flex w-full ${stepForgot !== 2 && "hidden"}`}>
                    <button
                        type="button"
                        onClick={handleVerifyCode}
                        className="bg-primary-50 transition-colors text-white px-6 p-3 rounded-sm font-semibold w-full hover:bg-primary-100 cursor-pointer mt-4"
                    >
                        {loading ? <Loading /> : "Enviar código"}
                    </button>
                </div>

                <div className={`flex w-full ${stepForgot !== 3 && "hidden"}`}>
                    <button
                        type="submit"
                        className="bg-primary-50 transition-colors text-white px-6 p-3 rounded-sm font-semibold w-full hover:bg-primary-100 cursor-pointer mt-4"
                    >
                        {loading ? <Loading /> : "Alterar senha"}
                    </button>
                </div>
            </form>
        </main>
    );
}
