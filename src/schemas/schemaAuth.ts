import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório").min(4, "Minimo de 4 caractéres"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("senha é obrigatório").min(8, "Minimo de 8 caractéres"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("senha é obrigatório"),
});
