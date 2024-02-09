import { NextRouter } from 'next/router';
import { useEffect } from 'react';
import { User } from 'src/types/user';
import Cookies from 'js-cookie';
import { CookiesStorage, PageRoute } from 'src/helpers/enums';
import AuthService from 'src/services/AuthService';
import UserService from 'src/services/UserService';

interface Props {
  router: NextRouter;
  setUserId: (value: string) => void;
  setUserInfo: (value: User) => void;
  setIsLoggedIn: (value: boolean) => void;
  setAccessToken: (value: string) => void;
}

export default function useHomeAuthHandler({
  router,
  setUserId,
  setUserInfo,
  setIsLoggedIn,
  setAccessToken
}: Props) {
  useEffect(() => {
    const accessToken = Cookies.get(CookiesStorage.AccessToken);

    if (!accessToken) {
      router.push(PageRoute.Root);
    } else {
      const decodedAccessToken = AuthService.getDecodedToken(accessToken);

      if (!decodedAccessToken) {
        Cookies.remove(CookiesStorage.AccessToken);
        router.push(PageRoute.Root);
      } else {
        setIsLoggedIn(true);
        setAccessToken(accessToken);
        setUserId(String(decodedAccessToken?.id) ?? '');

        UserService.getUserAPI({
          accessToken: accessToken,
          userId: String(decodedAccessToken?.id) ?? '',
          setUserInfo: setUserInfo
        });
      }
    }
  }, []);
}
