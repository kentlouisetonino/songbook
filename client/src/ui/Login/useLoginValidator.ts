import { useEffect } from 'react';
import ValidationService from 'src/services/ValidationService';

interface Props {
  email: string;
  password: string;
  setIsInputsValid: (value: boolean) => void;
}

export default function useLoginValidator({
  email,
  password,
  setIsInputsValid
}: Props) {
  useEffect(() => {
    ValidationService.loginValidator()
      .isValid({ email: email, password: password })
      .then((valid) => {
        if (valid) setIsInputsValid(true);
        else setIsInputsValid(false);
      });
  }, [email, password]);
}
