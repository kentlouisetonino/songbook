import { useRouter } from 'next/router';
import { useState } from 'react';
import SongService from '../../services/SongService';
import HomeSignedIn from './HomeSignedIn';
import HomeSignedOut from './HomeSignedOut';
import { User } from 'src/types/user';
import { FilterBy, Song } from 'src/types/song';
import useHomeFetchHandler from './useHomeFetchHandler';
import useHomeInitialization from './useHomeInitialization';

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

  // Authenticate the user.
  useHomeFetchHandler({
    router: router,
    setUserId: setUserId,
    setUserInfo: setUserInfo,
    setIsLoggedIn: setIsLoggedIn,
    setAccessToken: setAccessToken
  });

  // Initialize the date once user is authenticated successfully.
  useHomeInitialization({
    userId: userId,
    filterBy: filterBy,
    accessToken: accessToken,
    setSongs: setSongs
  });

  if (isLoggedIn && userInfo) {
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
