import { AiOutlinePlus } from "react-icons/ai";


export function ActionProduct() {
  return (
    <section className="w-full px-4 pt-4 mt-4">
      <div className="text-end w-full flex justify-end text-sm gap-4">
     
        <button className="bg-primary-50 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer">
          <AiOutlinePlus size={15} />
          Novo produto
        </button>
      </div>

     
    </section>
  );
}
