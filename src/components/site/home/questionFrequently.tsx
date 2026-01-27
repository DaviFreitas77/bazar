import { AccordionFilter } from "../../ui/accordion";

export function Questions(){
  return(
      <section className=" flex justify-center items-center px-10">
        <div className=" max-w-[1450px] w-full flex flex-col gap-5">
          <h5 className="text-center text-2xl font-semibold text-gray-900">Perguntas frequentes</h5>
          <AccordionFilter value="item-2" padding="12px 10px 12px 10px" backgroundColor="#F9F9F9" name="Os produtos no site são novos?">
            <p className="pl-2">A maioria das nossas peças já teve uma história, mas está em ótimo estado. Também contamos com alguns produtinhos novos, que sempre estarão devidamente destacados no site para facilitar a identificação.</p>
          </AccordionFilter>
          <AccordionFilter value="item-2" padding="12px 10px 12px 10px" backgroundColor="#F9F9F9" name="Quais são as formas de pagamento?">
            <p className="pl-2">Aceitamos pagamentos via Pix, cartão de crédito e cartão de débito. As opções disponíveis serão exibidas no momento da finalização da compra.</p>
          </AccordionFilter>
          <AccordionFilter value="item-2" padding="12px 10px 12px 10px" backgroundColor="#F9F9F9" name="Vocês fazem entrega?">
            <p className="pl-2">No momento não fazemos entrega,você poderá retirar seu pedido em R. exemplo,bairro-SP</p>
          </AccordionFilter>
          <AccordionFilter value="item-2" padding="12px 10px 12px 10px" backgroundColor="#F9F9F9" name="O bazar tem um local para que eu possa visitar?">
            <p className="pl-2">Sim temos,para visitar o bazar entre em contato com o whastApp fixado na paginam para sim marcar um horário.</p>
          </AccordionFilter>
        </div>
      </section>
  )
}