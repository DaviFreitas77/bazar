declare namespace CheckoutProps {
  interface InformationsProps {
    name: string;
    lastName: string;
    email: string;
    phone: string;
  }



  interface InformationsAdressProps {
    cep: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
  }


  interface InformationPaymentCardProps{
    numberCard:string;
    nameCard:string;
    dateCard:string;
    CVVCard:string;
  }

}
