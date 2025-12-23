declare namespace Auth {
  interface register {
    name: string;
    email: string;
    lastName:string;
    tel:string;
    password: string;
  }

  interface login {
    email: string;
    password: string;
  }
}

