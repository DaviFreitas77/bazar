
export function Stamps(){
  return(
         <section className="flex justify-center items-center">
            <div className="flex justify-between max-w-[1300px] py-15 w-full">
              <div className="flex items-center gap-2">
                <img src="images/iconPix.png" alt="" />
                <div className="leading-5">
                  <p className="text-gray-800 font-semibold">PIX</p>
                  <p className="text-gray-400 mt-1">Compre rápido</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src="images/iconCard.png" alt="" className="w-15"/>
                <div className="leading-5">
                  <p className="text-gray-800 font-semibold">PARCELAMENTO</p>
                  <p className="text-gray-400 mt-1">em até 12x</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <img src="images/iconSuporte.png" alt="" />
                <div className="leading-5">
                  <p className="text-gray-800 font-semibold">SUPORTE</p>
                  <p className="text-gray-400 mt-1">24 horas</p>
                </div>
              </div>
    
              <div className="flex items-center gap-2">
                <img src="images/iconPix.png" alt="" />
                <div className="leading-5">
                  <p className="text-gray-800 font-semibold">SITE SEGURO</p>
                  <p className="text-gray-400 mt-1">compre tranquilo</p>
                </div>
              </div>
            </div>
    
          </section>
    
  )
}