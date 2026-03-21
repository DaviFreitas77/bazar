import { NavigationInformation } from "@/components/site/InfoNav/NavigationInformations";

export function PoliticPrivacity() {


    return (
        <main className="min-h-screen py-30 px-4">

         <NavigationInformation/>
            <div className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Política de Privacidade
                </h1>

                <p className="text-gray-600 mb-8">
                    A sua privacidade é importante para nós. Esta Política de Privacidade
                    descreve como coletamos, usamos e protegemos suas informações ao utilizar
                    nosso e-commerce.
                </p>

                <section className="space-y-6">

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            1. Coleta de Informações
                        </h2>
                        <p className="text-gray-600">
                            Coletamos informações pessoais como nome, e-mail, endereço e dados de
                            pagamento quando você realiza uma compra ou se cadastra em nosso site.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            2. Uso das Informações
                        </h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-1">
                            <li>Processar pedidos e pagamentos</li>
                            <li>Enviar atualizações sobre sua compra</li>
                            <li>Melhorar sua experiência no site</li>
                            <li>Enviar promoções (caso autorizado)</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            3. Compartilhamento de Dados
                        </h2>
                        <p className="text-gray-600">
                            Não vendemos suas informações pessoais. Podemos compartilhar dados com
                            parceiros apenas para processamento de pagamentos e entrega de produtos.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            4. Segurança
                        </h2>
                        <p className="text-gray-600">
                            Adotamos medidas de segurança para proteger suas informações contra
                            acesso não autorizado, alteração ou divulgação.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            5. Cookies
                        </h2>
                        <p className="text-gray-600">
                            Utilizamos cookies para melhorar sua navegação, personalizar conteúdo e
                            analisar o tráfego do site.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            6. Seus Direitos
                        </h2>
                        <p className="text-gray-600">
                            Você pode solicitar acesso, correção ou exclusão dos seus dados pessoais
                            a qualquer momento.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            7. Alterações
                        </h2>
                        <p className="text-gray-600">
                            Podemos atualizar esta Política de Privacidade periodicamente.
                            Recomendamos que você revise esta página regularmente.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            8. Contato
                        </h2>
                        <p className="text-gray-600">
                            Em caso de dúvidas, entre em contato pelo e-mail:
                            <span className="text-blue-600 ml-1">
                                contato@seudominio.com
                            </span>
                        </p>
                    </div>

                </section>

                <div className="mt-10 border-t pt-4 text-sm text-gray-400">
                    Última atualização: {new Date().toLocaleDateString()}
                </div>

            </div>
        </main>
    );
}