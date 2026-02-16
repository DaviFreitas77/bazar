// import { ClockAlert } from "lucide-react";
// import { GiClothes, GiLargeDress } from "react-icons/gi";

// const categories = [
//   {
//     id: 1,
//     title: "Camisetas",
//     products: 983,
//     icon: GiClothes,
//   },
//   {
//     id: 2,
//     title: "Calças",
//     products: 430,
//     icon: GiLargeDress,
//   },
//   {
//     id: 3,
//     title: "Vestidos",
//     products: 120,
//     icon: ClockAlert,
//   },
//   {
//     id: 4,
//     title: "Blusas",
//     products: 120,
//     icon: ClockAlert,
//   },
// ];
// export function Categories() {
//   return (
//     <section className="py-10">
//       <div className="flex gap-6 flex-wrap">
//         {categories.map((category) => {
//           const Icon = category.icon;

//           return (
//             <div key={category.id} className="flex items-center bg-[#F4F4F5] rounded-xl gap-4 py-9 px-11  cursor-pointer">
//               {/* Ícone */}
//               <Icon size={40} />

//               {/* Linha */}
//               <div className="h-12 w-px bg-gray-400"></div>

//               {/* Texto */}
//               <div className="space-y-1">
//                 <h1 className="text-xl font-semibold text-gray-900">{category.title}</h1>
//                 <p className="text-sm text-gray-600 font-light">{category.products} Produtos para venda</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
