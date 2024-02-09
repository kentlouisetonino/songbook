import Cookies from 'js-cookie';
import { NextRouter } from 'next/router';
import { useEffect } from 'react';
import { CookiesStorage, PageRoute } from 'src/helpers/enums';
import AuthService from 'src/services/AuthService';
import SongService from 'src/services/SongService';

interface Props {
  songId: string;
  router: NextRouter;
  setTitle: (value: string) => void;
  setArtist: (value: string) => void;
  setLyrics: (value: string) => void;
}

export default function useDetailsAuthHandler({
  songId,
  router,
  setTitle,
  setArtist,
  setLyrics
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
