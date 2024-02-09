import { useRouter } from 'next/router';
import { useState } from 'react';
import UserService from '../../services/UserService';
import RegisterLoading from './RegisterLoading';
import RegisterForm from './RegisterForm';
import useRegisterValidator from './useRegisterValidator';
import useRegisterChecker from './useRegisterChecker';

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputsValid, setIsInputsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);

    UserService.createUserAPI({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      setIsLoading: setIsLoading,
      router: router
    });
  };

  // Validate the input of users.
  useRegisterValidator({
    email: email,
    password: password,
    lastName: lastName,
    firstName: firstName,
    setIsInputsValid: setIsInputsValid
  });

  // Check if the user is already login.
  useRegisterChecker({
    router: router
  });

  if (isLoading) {
    return <RegisterLoading />;
  }

  return (
    <RegisterForm
      email={email}
      password={password}
      lastName={lastName}
      firstName={firstName}
      isInputsValid={isInputsValid}
      setEmail={setEmail}
      setPassword={setPassword}
      setLastName={setLastName}
      setFirstName={setFirstName}
      onSubmit={onSubmit}
    />
  );
}
