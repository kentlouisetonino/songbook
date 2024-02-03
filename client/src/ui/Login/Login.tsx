import Cookies from 'js-cookie'
import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'

import Navbar from '../components/Navbar/Navbar';
import Spinner from '../components/Spinner/Spinner'
import Header from '../components/Head/Head'
import InputField from '../components/InputField/InputField'
import PasswordCheckbox from '../components/PasswordCheckbox/PasswordCheckbox'
import Footer from '../components/Footer/Footer'
import { loginAPI } from 'src/api/auth'
import { CookiesStorage, PageRoute } from 'src/helpers/enums'
import { loginValidator } from 'src/helpers/validators'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isInputsValid, setIsInputsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = () => {
    setIsLoading(true)

    loginAPI({
      email: email,
      password: password,
      setIsLoading: setIsLoading,
      router: router,
    })
  }

  useEffect(() => {
    loginValidator
      .isValid({ email: email, password: password })
      .then((valid) => {
        if (valid) setIsInputsValid(true)
        else setIsInputsValid(false)
      })
  }, [email, password])

  useEffect(() => {
    if (Cookies.get(CookiesStorage.AccessToken)) {
      router.push(PageRoute.Root)
    }
  }, [])

  return (
    <Fragment>
      <Header title='SongBook | Login' />
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Navbar currentPage='login' />
          <div className='d-flex justify-content-center mt-5'>
            <div className='w-50 mt-5'>
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
                disabled={isInputsValid ? false : true}
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
  )
}
