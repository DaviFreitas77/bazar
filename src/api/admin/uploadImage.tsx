import { api } from "@/lib/api";

export const uploadImage = async (data:any) => {
  const response = await api.post("/upload-image", data);
  return response.data;
};
