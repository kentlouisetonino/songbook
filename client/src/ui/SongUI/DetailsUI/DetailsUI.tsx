import Cookies from 'js-cookie'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Header from 'src/components/Head'
import Navbar from 'src/components/Navbar'
import decodeToken from 'src/helpers/decode-token'
import { getSongAPI } from 'src/api/song'
import { PageRoute, CookiesStorage } from 'src/helpers/enums'

export default function DetailsUI() {
  const router = useRouter()
  const songId = router.query?.songId
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [lyrics, setLyrics] = useState('')

  useEffect(() => {
    const accessToken = Cookies.get(CookiesStorage.ACCESS_TOKEN)

    if (!accessToken) {
      router.push(PageRoute.HOME)
    } else {
      const decodedAccessToken = decodeToken({ token: accessToken })

      if (!decodedAccessToken) {
        Cookies.remove(CookiesStorage.ACCESS_TOKEN)
        router.push(PageRoute.HOME)
      } else {
        getSongAPI({
          accessToken: accessToken,
          songId: songId,
          setTitle: setTitle,
          setArtist: setArtist,
          setLyrics: setLyrics,
        })
      }
    }
  }, [router.isReady])

  return (
    <Fragment>
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
    </Fragment>
  )
}

