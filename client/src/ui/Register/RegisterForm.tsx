import Footer from '../components/Footer/Footer';
import Header from '../components/Head/Head';
import InputField from '../components/InputField/InputField';
import Navbar from '../components/Navbar/Navbar';
import PasswordCheckbox from '../components/PasswordCheckbox/PasswordCheckbox';

interface Props {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  isInputsValid: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setLastName: (value: string) => void;
  setFirstName: (value: string) => void;
  onSubmit: () => void;
}

export default function RegisterForm({
  email,
  password,
  lastName,
  firstName,
  isInputsValid,
  setEmail,
  setPassword,
  setLastName,
  setFirstName,
  onSubmit
}: Props) {
  return (
    <>
      <Header title='SongBook | Register' />
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
            disabled={!(email && password && isInputsValid)}
            className={`btn btn-secondary w-100 mt-3`}
            onClick={() => onSubmit()}
          >
            Submit
          </button>
        </div>
      </div>

      <div className='container fixed-bottom' style={{ maxWidth: '1080px' }}>
        <Footer />
      </div>
    </>
  );
}
