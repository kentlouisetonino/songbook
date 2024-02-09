import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { CookiesStorage, PageRoute } from 'src/helpers/enums';
import AuthService from '../../../services/AuthService';
import SongService from '../../../services/SongService';
import UserService from '../../../services/UserService';
import ValidationService from '../../../services/ValidationService';
import Header from '../../components/Head/Head';
import InputField from '../../components/InputField/InputField';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Spinner from '../../components/Spinner/Spinner';
import TextAreaField from '../../components/TextAreaField/TextAreaField';

export default function Update() {
  const router = useRouter();
  const songId = Number(router.query?.songId ?? '');
  const [accessToken, setAccessToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputsValid, setIsInputsValid] = useState(false);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [userInfo, setUserInfo] = useState<any>();

  const onSubmit = () => {
    setIsLoading(true);

    SongService.updateSongAPI({
      accessToken: accessToken,
      songId: songId,
      title: title,
      artist: artist,
      lyrics: lyrics,
      userId: userId,
      setIsLoading: setIsLoading,
      router: router
    });
  };

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
        setUserId(decodedAccessToken?.id);
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

  useEffect(() => {
    ValidationService.songValidator()
      .isValid({
        title: title,
        artist: artist,
        lyrics: lyrics
      })
      .then((valid) => {
        if (valid) setIsInputsValid(true);
        else setIsInputsValid(false);
      });
  }, [title, artist, lyrics]);

  return (
    <Fragment>
      <Header title='SongBook | Update Song' />
      <Navbar />

      {isLoggedIn && (
        <div className='d-flex'>
          <Sidebar
            firstName={userInfo?.firstName}
            lastName={userInfo?.lastName}
            email={userInfo?.email}
          />

          {isLoading ? (
            <div className='flex-shrink-1' style={{ width: '800px' }}>
              <Spinner />
            </div>
          ) : (
            <div className='flex-shrink-1' style={{ width: '800px' }}>
              <div className='mx-5'>
                <h3 className='fw-bolder'>Update Song Information</h3>
                <div className='w-75 mt-5'>
                  <div className='mb-4'>
                    <InputField
                      label='Title'
                      type='text'
                      placeholder='Enter song title'
                      value={title}
                      onChange={setTitle}
                    />
                  </div>
                  <div className='mb-4'>
                    <InputField
                      label='Artist'
                      type='text'
                      placeholder='Enter artist name'
                      value={artist}
                      onChange={setArtist}
                    />
                  </div>
                  <div className='mb-4'>
                    <TextAreaField
                      label='Lyrics'
                      placeholder='Enter the lyrics'
                      value={lyrics}
                      onChange={setLyrics}
                    />
                  </div>
                  <button
                    className={`btn btn-secondary w-100 mt-3`}
                    onClick={() => onSubmit()}
                    disabled={!isInputsValid}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}
