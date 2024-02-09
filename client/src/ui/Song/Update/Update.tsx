import { useRouter } from 'next/router';
import { useState } from 'react';
import SongService from '../../../services/SongService';
import { User } from 'src/types/user';
import useUpdateFetchHandler from './useUpdateFetchHandler';
import useUpdateValidator from './useUpdateValidator';
import UpdateLoading from './UpdateLoading';
import UpdateForm from './UpdateForm';

export default function Update() {
  const router = useRouter();
  const songId = String(router.query?.songId ?? '');
  const [accessToken, setAccessToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputsValid, setIsInputsValid] = useState(false);
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [userInfo, setUserInfo] = useState<User>();

  const onSubmit = () => {
    setIsLoading(true);

    SongService.updateSongAPI({
      accessToken: accessToken,
      songId: songId,
      title: title,
      artist: artist,
      lyrics: lyrics,
      userId: Number(userId),
      setIsLoading: setIsLoading,
      router: router
    });
  };

  // Hook to handle the fetching of song to update.
  useUpdateFetchHandler({
    songId: songId,
    router: router,
    setTitle: setTitle,
    setArtist: setArtist,
    setLyrics: setLyrics,
    setUserId: setUserId,
    setUserInfo: setUserInfo,
    setIsLoggedIn: setIsLoggedIn,
    setAccessToken: setAccessToken
  });

  // Hook to validate the new song information.
  useUpdateValidator({
    title: title,
    artist: artist,
    lyrics: lyrics,
    setIsInputsValid: setIsInputsValid
  });

  if (isLoggedIn && userInfo && isLoading) {
    return <UpdateLoading userInfo={userInfo} />;
  }

  if (isLoggedIn && userInfo && !isLoading) {
    return (
      <UpdateForm
        title={title}
        artist={artist}
        lyrics={lyrics}
        userInfo={userInfo}
        isInputsValid={isInputsValid}
        setTitle={setTitle}
        setArtist={setArtist}
        setLyrics={setLyrics}
        onSubmit={onSubmit}
      />
    );
  }

  return null;
}
