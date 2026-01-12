export function NewsLetter() {
  return (
    <section className="bg-gray-900 text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              RECEBA NOVIDADES E <span className="text-primary-50">PROMOÇÕES</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Cadastre-se e receba promoções exclusivas e saiba tudo antes de todo mundo!
            </p>
          </div>

      
          <div className="w-full lg:w-auto">
            <form className="flex flex-col sm:flex-row gap-3 min-w-[320px] md:min-w-[450px]" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="flex-1 px-5  rounded-sm bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all w-90"
                required
              />
              <button 
                className="bg-primary-50 hover:bg-opacity-90 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary-50/20"
              >
                Inscrever
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center lg:text-left">
              Respeitamos sua privacidade. Cancele a qualquer momento.
            </p>
          </div>
        </div>

        {/* Linha Decorativa */}
        <div className="border-t mt-16 border-gray-800" />
      </div>
    </section>
  )
}