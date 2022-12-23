import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

import { APIEndpoint, CookiesStorage, PageRoute } from 'src/helpers/enums'

export const loginAPI = ({
  email,
  password,
  setIsLoading,
  router,
}: {
  email: string
  password: string
  setIsLoading: any
  router: any
}) => {
  axios({
    method: 'post',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.AUTH_LOGIN,
    data: {
      email: email,
      password: password,
    },
  })
    .then((res) => {
      Cookies.set(CookiesStorage.ACCESS_TOKEN, res.data.accessToken)
      setIsLoading(false)

      Swal.fire('Success', 'Go to Home Page', 'success').then(() => {
        router.push(PageRoute.HOME)
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
