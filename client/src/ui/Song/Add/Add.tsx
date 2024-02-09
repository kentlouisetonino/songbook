import { useRouter } from 'next/router';
import { useState } from 'react';
import SongService from '../../../services/SongService';
import { User } from 'src/types/user';
import useAddAuthHandler from './useAddAuthHandler';
import useAddValidator from './useAddValidator';
import AddLoading from './AddLoading';
import AddForm from './AddForm';

export default function Add() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputsValid, setIsInputsValid] = useState(false);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [userInfo, setUserInfo] = useState<User>();

  const onSubmit = () => {
    setIsLoading(true);

    SongService.createSongAPI({
      accessToken: accessToken,
      title: title,
      artist: artist,
      lyrics: lyrics,
      userId: userId,
      setIsLoading: setIsLoading,
      router: router
    });
  };

  // Hook to check if user is authorize to do the operation.
  useAddAuthHandler({
    router: router,
    setUserId: setUserId,
    setUserInfo: setUserInfo,
    setIsLoggedIn: setIsLoggedIn,
    setAccessToken: setAccessToken
  });

  // Hook to validate the input of user.
  useAddValidator({
    title: title,
    artist: artist,
    lyrics: lyrics,
    setIsInputsValid: setIsInputsValid
  });

  if (isLoggedIn && userInfo && isLoading) {
    return <AddLoading userInfo={userInfo} />;
  }

  if (isLoggedIn && userInfo && !isLoading) {
    return (
      <AddForm
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
