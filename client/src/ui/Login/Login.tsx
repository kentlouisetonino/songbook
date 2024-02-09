import { useRouter } from 'next/router';
import { useState } from 'react';
import AuthService from '../../services/AuthService';
import LoginLoading from './LoginLoading';
import LoginForm from './LoginForm';
import useLoginValidator from './useLoginValidator';
import useLoginChecker from './useLoginChecker';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInputsValid, setIsInputsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit() {
    setIsLoading(true);

    AuthService.login({
      email: email,
      password: password,
      setIsLoading: setIsLoading,
      router: router
    });
  }

  // Handle the validation of form.
  useLoginValidator({
    email: email,
    password: password,
    setIsInputsValid: setIsInputsValid
  });

  // Check if user is already login.
  useLoginChecker({ router: router });

  if (isLoading) {
    return <LoginLoading />;
  }

  return (
    <LoginForm
      email={email}
      password={password}
      isInputsValid={isInputsValid}
      setEmail={setEmail}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
}
