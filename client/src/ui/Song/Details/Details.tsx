import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../../components/Head/Head';
import Navbar from '../../components/Navbar/Navbar';
import useDetailsAuthHandler from './useDetailsAuthHandler';

export default function Details() {
  const router = useRouter();
  const songId = String(router.query?.songId ?? '');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');

  // Hook to handle the authorization and fetching of song data.
  useDetailsAuthHandler({
    songId: songId,
    router: router,
    setTitle: setTitle,
    setArtist: setArtist,
    setLyrics: setLyrics
  });

  return (
    <>
      <Header title='SongBook | Song Details' />
      <Navbar />
      <div
        className='mx-5 mt-5 row justify-content-center mx-auto'
        style={{ width: '800px' }}
      >
        <h3 className='text-center fw-bolder mt-5'>{title}</h3>
        <div className='mt-5'>
          <textarea
            name='ingredients'
            className='form-control shadow-none'
            rows={20}
            value={lyrics}
            readOnly={true}
          />
        </div>
        <div className='mt-5'>
          <p className='fw-lighter fst-italic'>Artist: {artist}</p>
        </div>
      </div>
    </>
  );
}
