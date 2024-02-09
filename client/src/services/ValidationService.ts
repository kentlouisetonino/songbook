/* eslint-disable no-useless-escape */
import * as yup from 'yup';

export default class ValidationService {
  static loginValidator() {
    return yup.object().shape({
      email: yup.string().email().required(),
      password: yup
        .string()
        .required('Please Enter your password')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
    });
  }

  static registerValidator() {
    return yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
        .string()
        .required('Please Enter your password')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
    });
  }

  static songValidator() {
    return yup.object().shape({
      title: yup.string().required(),
      artist: yup.string().required(),
      lyrics: yup.string().required()
    });
  }
}
