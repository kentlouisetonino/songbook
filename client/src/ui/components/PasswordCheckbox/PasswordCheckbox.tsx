import { Fragment } from 'react'

export default function PasswordCheckbox() {
  const showPassword = () => {
    const x: any = document.getElementById('password')
    if (x && x.type === 'password') x.type = 'text'
    else x.type = 'password'
  }

  return (
    <Fragment>
      <input
        type='checkbox'
        className='form-check-input'
        onClick={() => showPassword()}
      />
      <label>Show Password</label>
    </Fragment>
  )
}

