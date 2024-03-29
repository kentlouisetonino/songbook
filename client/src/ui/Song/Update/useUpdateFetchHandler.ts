import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { useEffect } from 'react';
import { CookiesStorage, PageRoute } from 'src/types/route';
import AuthService from 'src/services/AuthService';
import SongService from 'src/services/SongService';
import UserService from 'src/services/UserService';
import { User } from 'src/types/user';

interface Props {
  songId: string;
  router: NextRouter;
  setTitle: (value: string) => void;
  setArtist: (value: string) => void;
  setLyrics: (value: string) => void;
  setUserId: (value: string) => void;
  setUserInfo: (value: User) => void;
  setIsLoggedIn: (value: boolean) => void;
  setAccessToken: (value: string) => void;
}

export default function useUpdateFetchHandler({
  songId,
  router,
  setTitle,
  setArtist,
  setLyrics,
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
        setAccessToken(accessToken);
        setUserId(String(decodedAccessToken?.id));
        setIsLoggedIn(true);

        UserService.getUserAPI({
          accessToken: accessToken,
          userId: String(decodedAccessToken?.id),
          setUserInfo: setUserInfo
        });

        SongService.getSongAPI({
          accessToken: accessToken,
          songId: Number(songId),
          setTitle: setTitle,
          setArtist: setArtist,
          setLyrics: setLyrics
        });
      }
    }
  }, [router.isReady]);
}
