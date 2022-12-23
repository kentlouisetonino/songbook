import axios from 'axios'
import Swal from 'sweetalert2'

import { APIEndpoint, PageRoute } from 'src/helpers/enums'

export const getUserAPI = ({
  accessToken,
  userId,
  setUserInfo,
}: {
  accessToken: string
  userId: string
  setUserInfo: any
}) => {
  axios({
    method: 'get',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.USER,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      id: userId,
    },
  })
    .then((res) => {
      setUserInfo(res.data)
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const createUserAPI = ({
  firstName,
  lastName,
  email,
  password,
  setIsLoading,
  router,
}: {
  firstName: string
  lastName: string
  email: string
  password: string
  setIsLoading: any
  router: any
}) => {
  axios({
    method: 'post',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.USER_CREATE,
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  })
    .then(() => {
      setIsLoading(false)

      Swal.fire('Success', 'Go to Login Page', 'success').then(() => {
        router.push(PageRoute.LOGIN)
      })
    })
    .catch((err) => {
      setIsLoading(false)

      Swal.fire({
        icon: 'error',
        title: 'Something Went Wrong!',
        text: err.response.data.message,
      })
    })
}
