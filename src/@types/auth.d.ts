declare namespace Auth {
  interface register {
    name: string;
    email: string;
    password: string;
  }

  interface login {
    email: string;
    password: string;
  }
}

