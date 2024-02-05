import axios from 'axios';
import { NextRouter } from 'next/router';
import Swal from 'sweetalert2';
import { APIEndpoint, PageRoute } from '../helpers/enums';

export default class SongService {
  static createSongAPI({
    accessToken,
    title,
    artist,
    lyrics,
    userId,
    setIsLoading,
    router
  }: {
    title: string;
    artist: string;
    lyrics: string;
    userId: number;
    accessToken: string;
    router: NextRouter;
    setIsLoading: (value: boolean) => void;
  }) {
    axios({
      method: 'post',
      url:
        process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.SongCreate,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        title: title,
        artist: artist,
        lyrics: lyrics,
        userId: userId
      }
    })
      .then(() => {
        setIsLoading(false);

        Swal.fire('Success', 'Go Back to Home Page', 'success').then(() => {
          router.push(PageRoute.Root);
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error(error);
        }

        setIsLoading(false);
      });
  }

  static getSongAPI({
    accessToken,
    songId,
    setTitle,
    setArtist,
    setLyrics
  }: {
    accessToken: string;
    songId: any;
    setTitle: (value: string) => void;
    setArtist: (value: string) => void;
    setLyrics: (value: string) => void;
  }) {
    axios({
      method: 'get',
      url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.Song,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: Number(songId)
      }
    })
      .then((res) => {
        setTitle(res?.data?.title);
        setArtist(res?.data?.artist);
        setLyrics(res?.data?.lyrics);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }

  static getAllSongByUserAPI({
    accessToken,
    userId,
    setSongs
  }: {
    accessToken: string;
    userId: number;
    setSongs: (value: any[]) => void;
  }) {
    console.log('accessToken', accessToken);

    axios({
      method: 'get',
      url:
        process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT +
        APIEndpoint.SongAllByUser,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: userId
      }
    })
      .then((res) => {
        setSongs(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static getAllSongByArtistAPI({
    accessToken,
    search,
    userId,
    setSongs
  }: {
    accessToken: string;
    search: string;
    userId: number;
    setSongs: (value: any[]) => void;
  }) {
    axios({
      method: 'get',
      url:
        process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT +
        APIEndpoint.SongAllByArtist,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        search: search,
        userId: userId
      }
    })
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }

  static getAllSongByTitleAPI({
    accessToken,
    search,
    userId,
    setSongs
  }: {
    accessToken: string;
    search: string;
    userId: number;
    setSongs: (value: any[]) => void;
  }) {
    axios({
      method: 'get',
      url:
        process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT +
        APIEndpoint.SongAllByTitle,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        search: search,
        userId: userId
      }
    })
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }

  static updateSongAPI({
    accessToken,
    songId,
    title,
    artist,
    lyrics,
    userId,
    setIsLoading,
    router
  }: {
    accessToken: string;
    songId: any;
    title: string;
    artist: string;
    lyrics: string;
    userId: number;
    setIsLoading: (value: boolean) => void;
    router: NextRouter;
  }) {
    axios({
      method: 'post',
      url:
        process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.SongUpdate,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        id: Number(songId),
        title: title,
        artist: artist,
        lyrics: lyrics,
        userId: userId
      }
    })
      .then(() => {
        setIsLoading(false);

        Swal.fire(
          'Song Successfully Updated',
          'Go Back to Home Page',
          'success'
        ).then(() => {
          router.push(PageRoute.Root);
        });
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err.response.data.message);
      });
  }

  static deleteSongAPI({
    accessToken,
    songId,
    router
  }: {
    accessToken: string;
    songId: number;
    router: NextRouter;
  }) {
    axios({
      method: 'delete',
      url:
        process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.SongDelete,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        id: songId
      }
    })
      .then(() => {
        Swal.fire('Song Successfully Deleted', 'Reload Page', 'success').then(
          () => {
            router.reload();
          }
        );
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }
}
