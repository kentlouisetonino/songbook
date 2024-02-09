import { useEffect } from 'react';
import ValidationService from 'src/services/ValidationService';

interface Props {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  setIsInputsValid: (value: boolean) => void;
}

export default function useRegisterValidator({
  email,
  password,
  lastName,
  firstName,
  setIsInputsValid
}: Props) {
  useEffect(() => {
    ValidationService.registerValidator()
      .isValid({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
      .then((valid) => {
        if (valid) {
          setIsInputsValid(true);
        } else {
          setIsInputsValid(false);
        }
      });
  }, [email, password, lastName, firstName]);
}
