import { api } from "@/lib/api";
import type { UpdateUserResponse } from "../@types/user";


export const updateUser = async (data: UpdateUserResponse) => {
  try {
    const response = await api.patch("user/update", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const apiRegisterNewsLetter = async(data:any)=>{
  const response = await api.patch("user/registerNewsLetter",{
    email:data.email
  });
  return response.data;

}