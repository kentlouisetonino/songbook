import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import { CookiesStorage, PageRoute } from 'src/helpers/enums';
import SongService from '../../services/SongService';
import UserService from '../../services/UserService';
import HomeSignedIn from './HomeSignedIn';
import HomeSignedOut from './HomeSignedOut';
import { User } from 'src/types/user';
import { FilterBy, Song } from 'src/types/song';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userInfo, setUserInfo] = useState<User>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [filterValue, setFilterValue] = useState('');

  function onDeleteSong(songId: number) {
    SongService.deleteSongAPI({
      accessToken: accessToken,
      songId: songId,
      router: router
    });
  }

  function onFilterBySearch() {
    switch (filterBy) {
      case FilterBy.All:
        SongService.getAllSongByUserAPI({
          accessToken: accessToken,
          userId: Number(userId),
          setSongs: setSongs
        });

        break;
      case FilterBy.Artist:
        SongService.getAllSongByArtistAPI({
          accessToken: accessToken,
          search: filterValue,
          userId: Number(userId),
          setSongs: setSongs
        });

        break;
      case FilterBy.Title:
        SongService.getAllSongByTitleAPI({
          accessToken: accessToken,
          search: filterValue,
          userId: Number(userId),
          setSongs: setSongs
        });

        break;
      default:
        break;
    }
  }

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

  useEffect(() => {
    if (filterBy === 'all') {
      SongService.getAllSongByUserAPI({
        accessToken: accessToken,
        userId: Number(userId),
        setSongs: setSongs
      });
    }
  }, [accessToken, filterBy]);

  if (isLoggedIn) {
    return (
      <HomeSignedIn
        songs={songs}
        userInfo={userInfo}
        filterBy={filterBy}
        filterValue={filterValue}
        router={router}
        setFilterBy={setFilterBy}
        setFilterValue={setFilterValue}
        onDeleteSong={onDeleteSong}
        onFilterBySearch={onFilterBySearch}
      />
    );
  }

  return <HomeSignedOut />;
}
