import { api } from "@/lib/api"


export const apiFilterSubCategory = async(name:string | null)=>{
  const response = await api.get(`/filter/filterSubCategory/${name}`)
  return response.data;


}