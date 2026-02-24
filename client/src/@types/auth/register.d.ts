export interface Register {
    name: string;
    email: string;
    lastName:string;
    tel:string;
    password: string;
    terms: boolean;
    
  }

export interface FormRegisterProps {
  onChangeForm: (form: 'login' | 'forgotPassword') => void;
  onClose: () => void;
}

export interface FormForgotPasswordProps {
  onChangeForm: (form: 'login' | 'register') => void;
  onClose: () => void;
}