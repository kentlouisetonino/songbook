import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import {
  deleteSongAPI,
  getAllSongByArtistAPI,
  getAllSongByTitleAPI,
  getAllSongByUserAPI
} from 'src/api/song';
import { getUserAPI } from 'src/api/user';
import { CookiesStorage, PageRoute } from 'src/helpers/enums';
import decodedToken from '../../helpers/decode-token';
import Card from '../components/Card/Card';
import Footer from '../components/Footer/Footer';
import Header from '../components/Head/Head';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);
  const [accessToken, setAccessToken] = useState('');
  const [userInfo, setUserInfo] = useState<any>();
  const [songs, setSongs] = useState<any>([]);
  const [filterBy, setFilterBy] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  function onDeleteSong(songId: number) {
    deleteSongAPI({
      accessToken: accessToken,
      songId: songId,
      router: router
    });
  }

  function onFilterBySearch() {
    switch (filterBy) {
      case 'all':
        getAllSongByUserAPI({
          accessToken: accessToken,
          userId: userId,
          setSongs: setSongs
        });

        break;
      case 'artist':
        getAllSongByArtistAPI({
          accessToken: accessToken,
          search: filterValue,
          userId: userId,
          setSongs: setSongs
        });

        break;
      case 'title':
        getAllSongByTitleAPI({
          accessToken: accessToken,
          search: filterValue,
          userId: userId,
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
      const decodedAccessToken: any = decodedToken({ token: accessToken });

      if (!decodedAccessToken) {
        Cookies.remove(CookiesStorage.AccessToken);
        router.push(PageRoute.Root);
      } else {
        setIsLoggedIn(true);
        setAccessToken(accessToken);
        setUserId(decodedAccessToken?.id ?? '');

        getUserAPI({
          accessToken: accessToken,
          userId: decodedAccessToken?.id ?? '',
          setUserInfo: setUserInfo
        });
      }
    }
  }, []);

  useEffect(() => {
    if (filterBy === 'all') {
      getAllSongByUserAPI({
        accessToken: accessToken,
        userId: userId,
        setSongs: setSongs
      });
    }
  }, [accessToken, filterBy]);

  return (
    <Fragment>
      <Header title={isLoggedIn ? 'SongBook | All Songs' : 'SongBook | Home'} />
      <Navbar />

      {isLoggedIn ? (
        <Fragment>
          <div className='d-flex'>
            <Sidebar
              firstName={userInfo?.firstName}
              lastName={userInfo?.lastName}
              email={userInfo?.email}
            />

            <div className='flex-shrink-1' style={{ width: '800px' }}>
              <div className='mx-3'>
                <div className='input-group mb-3'>
                  <button
                    type='button'
                    className='btn btn-outline-secondary'
                    onClick={() => onFilterBySearch()}
                  >
                    Search
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-secondary dropdown-toggle dropdown-toggle-split'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <span className='mx-2'>
                      {!filterBy || filterBy === 'all'
                        ? 'All'
                        : filterBy === 'artist'
                          ? 'Artist'
                          : 'Title'}
                    </span>
                  </button>
                  <ul className='dropdown-menu'>
                    <li
                      className='dropdown-item'
                      onClick={() => {
                        setFilterValue('');
                        setFilterBy('all');
                      }}
                    >
                      All
                    </li>
                    <li
                      className='dropdown-item'
                      onClick={() => {
                        setFilterValue('');
                        setFilterBy('artist');
                      }}
                    >
                      Artist
                    </li>
                    <li
                      className='dropdown-item'
                      onClick={() => {
                        setFilterValue('');
                        setFilterBy('title');
                      }}
                    >
                      Title
                    </li>
                  </ul>
                  <input
                    disabled={filterBy === 'all' ? true : false}
                    type='text'
                    className='form-control'
                    aria-label='Text input with segmented dropdown button'
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                </div>
              </div>

              <div className='d-flex flex-wrap justify-content-between mx-3 mt-5'>
                {songs.length ? (
                  songs.map((song: any, index: any) => (
                    <div
                      key={index}
                      className='card'
                      style={{ width: '48%', margin: '7px' }}
                    >
                      <div className='card-body'>
                        <h5 className='card-title text-truncate fw-bolder'>
                          {song?.title}
                        </h5>
                        <p
                          className='card-text fst-italic fw-lighter'
                          style={{ overflow: 'hidden' }}
                        >
                          {song?.artist}
                        </p>
                        <button
                          className='btn btn-secondary w-100'
                          onClick={() =>
                            router.push(PageRoute.Song + `/${song?.id}/details`)
                          }
                        >
                          Details
                        </button>
                        <button
                          className='btn btn-info w-100 mt-2'
                          onClick={() =>
                            router.push(PageRoute.Song + `/${song.id}/update`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-danger w-100 mt-2'
                          onClick={() => onDeleteSong(song?.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='mx-auto text-center'>
                    <h1 className='fw-bolder'>No Posted Songs</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Jumbotron
            title='Save Your Favorite Music'
            content='Login to start saving your favorite song.'
          />

          <div className='mt-5 mx-3 row d-flex flex-wrap justify-content-between'>
            <Card
              title='Easy to Use'
              content='Simple interface and no hassle.'
              link='/register'
              linkName='Register'
            />
            <Card
              title='Free to Use'
              content='No need for card information. 100% free.'
              link='/register'
              linkName='Register'
            />
          </div>

          <div
            className='container fixed-bottom'
            style={{ maxWidth: '1080px' }}
          >
            <Footer />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
