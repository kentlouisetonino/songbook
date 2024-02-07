import axios from 'axios';
import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { decodeToken } from 'react-jwt';
import { APIEndpoint, CookiesStorage, PageRoute } from 'src/helpers/enums';
import {DecodedToken} from 'src/types/auth';
import Swal from 'sweetalert2';

interface LoginProps {
  email: string;
  password: string;
  router: NextRouter;
  setIsLoading: (value: boolean) => void;
}

export default class AuthService {
  // This method is used for logging in the user.
  static login({ email, password, setIsLoading, router }: LoginProps) {
    axios({
      method: 'post',
      url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.AuthLogin,
      data: {
        email: email,
        password: password
      }
    })
      .then((res) => {
        Cookies.set(CookiesStorage.AccessToken, res.data.accessToken);
        setIsLoading(false);

        Swal.fire('Success', 'Go to Home Page', 'success').then(() => {
          router.push(PageRoute.Root);
        });
      })
      .catch((error) => {
        setIsLoading(false);

        if (error instanceof Error) {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong!',
            text: error.message
          });
        }
      });
  }

  // This method will decode the content associated in the token.
  static getDecodedToken(token: string) {
    try {
      const decodedToken: DecodedToken | null = decodeToken(token);

      if (decodedToken) {
        return decodedToken as DecodedToken;
      }

      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      return;
    }
  }
}
