import * as yup from "yup";

export const PeopleInformationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(4, "Minimo de 4 caractéres"),
  lastName: yup
    .string()
    .required("Sobrenome é obrigatório")
    .min(4, "Minimo de 4 caractéres"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
});

export const AdressSchema = yup.object().shape({
  cep: yup.string().required("CEP é obrigatório"),
  street: yup.string().required("Rua é obrigatório"),
  number: yup.string().required("Número é obrigatório"),
  district: yup.string().required("Bairro é obrigatório"),
  city: yup.string().required("Cidade é obrigatório"),
  state: yup.string().required("Estado é obrigatório"),
});

export const PaymentCardSchema = yup.object().shape({
  numberCard: yup.string().required("Número do cartão é obrigatório"),
  nameCard: yup.string().required("Nome do cartão é obrigatório"),
  dateCard: yup.string().required("Data do cartão é obrigatório"),
  CVVCard: yup.string().required("CVV do cartão é obrigatório"),
});
