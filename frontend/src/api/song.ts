import axios from 'axios'
import Swal from 'sweetalert2'

import { APIEndpoint, PageRoute } from 'src/helpers/enums'

export const createSongAPI = ({
  accessToken,
  title,
  artist,
  lyrics,
  userId,
  setIsLoading,
  router,
}: {
  accessToken: string
  title: string
  artist: string
  lyrics: string
  userId: number
  setIsLoading: any
  router: any
}) => {
  axios({
    method: 'post',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.SONG_CREATE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      title: title,
      artist: artist,
      lyrics: lyrics,
      userId: userId,
    },
  })
    .then(() => {
      setIsLoading(false)

      Swal.fire('Success', 'Go Back to Home Page', 'success').then(() => {
        router.push(PageRoute.HOME)
      })
    })
    .catch((err) => {
      setIsLoading(false)
      console.error(err.response.data.message)
    })
}

export const getSongAPI = ({
  accessToken,
  songId,
  setTitle,
  setArtist,
  setLyrics,
}: {
  accessToken: string
  songId: any
  setTitle: any
  setArtist: any
  setLyrics: any
}) => {
  axios({
    method: 'get',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.SONG,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      id: Number(songId),
    },
  })
    .then((res) => {
      setTitle(res?.data?.title)
      setArtist(res?.data?.artist)
      setLyrics(res?.data?.lyrics)
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const getAllSongByUserAPI = ({
  accessToken,
  userId,
  setSongs,
}: {
  accessToken: string
  userId: number
  setSongs: any
}) => {
  axios({
    method: 'get',
    url:
      process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT +
      APIEndpoint.SONG_ALL_BY_USER,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      id: userId,
    },
  })
    .then((res) => {
      setSongs(res.data)
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const getAllSongByArtistAPI = ({
  accessToken,
  search,
  userId,
  setSongs,
}: {
  accessToken: string
  search: string
  userId: number
  setSongs: any
}) => {
  axios({
    method: 'get',
    url:
      process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT +
      APIEndpoint.SONG_ALL_BY_ARTIST,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      search: search,
      userId: userId,
    },
  })
    .then((res) => {
      setSongs(res.data)
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const getAllSongByTitleAPI = ({
  accessToken,
  search,
  userId,
  setSongs,
}: {
  accessToken: string
  search: string
  userId: number
  setSongs: any
}) => {
  axios({
    method: 'get',
    url:
      process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT +
      APIEndpoint.SONG_ALL_BY_TITLE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      search: search,
      userId: userId,
    },
  })
    .then((res) => {
      setSongs(res.data)
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}

export const updateSongAPI = ({
  accessToken,
  songId,
  title,
  artist,
  lyrics,
  userId,
  setIsLoading,
  router,
}: {
  accessToken: string
  songId: any
  title: string
  artist: string
  lyrics: string
  userId: number
  setIsLoading: any
  router: any
}) => {
  axios({
    method: 'post',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.SONG_UPDATE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      id: Number(songId),
      title: title,
      artist: artist,
      lyrics: lyrics,
      userId: userId,
    },
  })
    .then(() => {
      setIsLoading(false)

      Swal.fire(
        'Song Successfully Updated',
        'Go Back to Home Page',
        'success'
      ).then(() => {
        router.push(PageRoute.HOME)
      })
    })
    .catch((err) => {
      setIsLoading(false)
      console.error(err.response.data.message)
    })
}

export const deleteSongAPI = ({
  accessToken,
  songId,
  router,
}: {
  accessToken: string
  songId: number
  router: any
}) => {
  axios({
    method: 'delete',
    url: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT + APIEndpoint.SONG_DELETE,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      id: songId,
    },
  })
    .then(() => {
      Swal.fire('Song Successfully Deleted', 'Reload Page', 'success').then(
        () => {
          router.reload()
        }
      )
    })
    .catch((err) => {
      console.error(err.response.data.message)
    })
}
