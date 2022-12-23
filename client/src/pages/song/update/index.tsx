import Cookies from 'js-cookie'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Navbar from 'src/components/Navbar'
import Header from 'src/components/Head'
import decodeToken from 'src/helpers/decode-token'
import Sidebar from 'src/components/Sidebar'
import InputField from 'src/components/InputField'
import TextAreaField from 'src/components/TextAreaField'
import Spinner from 'src/components/Spinner'
import { songValidor } from 'src/helpers/validators'
import { CookiesStorage, PageRoute } from 'src/helpers/enums'
import { getSongAPI, updateSongAPI } from 'src/api/song'
import { getUserAPI } from 'src/api/user'

const Update = () => {
  const router = useRouter()
  const songId = router.query?.songId
  const [accessToken, setAccessToken] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInputsValid, setIsInputsValid] = useState(false)
  const [userId, setUserId] = useState(0)
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [userInfo, setUserInfo] = useState<any>()

  const onSubmit = () => {
    setIsLoading(true)

    updateSongAPI({
      accessToken: accessToken,
      songId: songId,
      title: title,
      artist: artist,
      lyrics: lyrics,
      userId: userId,
      setIsLoading: setIsLoading,
      router: router,
    })
  }

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
        setAccessToken(accessToken)
        setUserId(decodedAccessToken?.id)
        setIsLoggedIn(true)

        getUserAPI({
          accessToken: accessToken,
          userId: decodedAccessToken?.id,
          setUserInfo: setUserInfo,
        })

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

  useEffect(() => {
    songValidor
      .isValid({
        title: title,
        artist: artist,
        lyrics: lyrics,
      })
      .then((valid) => {
        if (valid) setIsInputsValid(true)
        else setIsInputsValid(false)
      })
  }, [title, artist, lyrics])

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
  )
}

export default Update
