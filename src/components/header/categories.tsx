import { useListCategories } from "@/hooks/useListCategories";
import { Link } from "react-router-dom";
export function Categories(){
    const {data:allCategories} = useListCategories();
  return(
      <section className="bg-primary-50 w-full  justify-center items-center  shadow-sm hidden lg:flex">
        <div className="max-w-[1300px] flex justify-evenly w-full py-3">
          {allCategories && allCategories.map((category)=>(
            <Link 
              to={`/pesquisa?q=${category.name}`}
            key={category.id} className="text-white cursor-pointer hover:opacity-85 text-sm">
                {category.name}
            </Link>
          ))}
        </div>
      </section>
  )
}