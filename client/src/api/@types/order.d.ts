export interface OrderProps {
  number_order: string;
  created_at: string;
  total: string;
  status: string;
  payment_method?:string
  user?:string;
  cupom?:string
  item: itemsProps[];
  pix_code?:string;
  pix_qr_code_base64?:string;
}
export interface itemsProps {
  nameProduct: string;
  quantityProduct: string;
  imageProduct: string;
  colorProduct: string;
  sizeProduct: string;
}