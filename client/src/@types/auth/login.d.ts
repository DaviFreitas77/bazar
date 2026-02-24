export interface FormLoginProps {
  onChangeForm: (form: 'register' | 'forgotPassword') => void;
  onClose: () => void;
}

  export interface login {
    email: string;
    password: string;
  }