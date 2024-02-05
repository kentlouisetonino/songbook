import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { CookiesStorage, PageRoute } from 'src/helpers/enums';
import UserService from '../../Services/UserService';
import ValidationService from '../../Services/ValidationService';
import Footer from '../components/Footer/Footer';
import Header from '../components/Head/Head';
import InputField from '../components/InputField/InputField';
import Navbar from '../components/Navbar/Navbar';
import PasswordCheckbox from '../components/PasswordCheckbox/PasswordCheckbox';
import Spinner from '../components/Spinner/Spinner';

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

  useEffect(() => {
    ValidationService.registerValidator()
      .isValid({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      })
      .then((valid) => {
        if (valid) setIsInputsValid(true);
        else setIsInputsValid(false);
      });
  }, [email, password]);

  useEffect(() => {
    if (Cookies.get(CookiesStorage.AccessToken)) {
      router.push(PageRoute.Root);
    }
  }, []);

  return (
    <Fragment>
      <Header title='SongBook | Register' />
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Navbar currentPage='register' />
          <div className='d-flex justify-content-center mt-5'>
            <div className='w-50 mt-5'>
              <div className='mb-4'>
                <InputField
                  label='First Name'
                  type='text'
                  placeholder='Enter your first name'
                  value={firstName}
                  onChange={setFirstName}
                />
              </div>

              <div className='mb-4'>
                <InputField
                  label='Last Name'
                  type='text'
                  placeholder='Enter your last name'
                  value={lastName}
                  onChange={setLastName}
                />
              </div>

              <div className='mb-4'>
                <InputField
                  label='Email'
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={setEmail}
                />
              </div>
              <div className='mb-2'>
                <InputField
                  label='Password'
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={setPassword}
                  domId={'password'}
                />
              </div>
              <div className='mb-5 form-check'>
                <PasswordCheckbox />
              </div>
              <button
                disabled={email && password && isInputsValid ? false : true}
                className={`btn btn-secondary w-100 mt-3`}
                onClick={() => onSubmit()}
              >
                Submit
              </button>
            </div>
          </div>

          <div
            className='container fixed-bottom'
            style={{ maxWidth: '1080px' }}
          >
            <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
