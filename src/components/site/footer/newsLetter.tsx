export function NewsLetter() {
  return (
    <section className="bg-primary-100">
      <div className="max-w-[1450px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Texto */}
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl text-gray-700 font-extrabold tracking-tight mb-2">
              Newsletter
            </h2>
            <p className="text-gray-700 text-sm">
              Cadastre seu e-mail aqui e fique por dentro de todas as novidades!
            </p>
          </div>

          {/* Formulário */}
          <div className="w-full lg:w-auto">
            <form
              className="flex flex-col gap-4 text-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nome"
                  className="px-5 py-2 rounded-sm border bg-white border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-50 transition-all w-full lg:w-80"
                />

                <input
                  type="email"
                  placeholder="E-mail"
                  className="px-5 py-2 rounded-sm border bg-white border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-50 transition-all w-full lg:w-80"
                />
              </div>

              <button className="bg-primary-50 hover:bg-opacity-90 text-white px-8 py-2 rounded-sm font-bold transition">
                Cadastre-se
              </button>
            </form>
          </div>
        </div>

        {/* Linha Decorativa */}
        <div className="border-t border-gray-300 mt-16" />
      </div>
    </section>
  );
}
