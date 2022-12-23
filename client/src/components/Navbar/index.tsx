import Cookies from 'js-cookie'
import { useEffect, useState, Fragment } from 'react'

import styles from './index.module.css'
import { CookiesStorage, PageRoute } from 'src/helpers/enums'

type Props = {
  currentPage?: string
}

const Navbar = ({ currentPage }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const accessToken = Cookies.get(CookiesStorage.ACCESS_TOKEN)
    if (accessToken) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }, [])

  return (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container-fluid'>
        <a
          className={`navbar-brand fw-bolder ${styles.brand}`}
          href={PageRoute.HOME}
        >
          SongBook
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse flex-row-reverse'
          id='navbarNavDropdown'
        >
          <ul className='navbar-nav '>
            {isLoggedIn ? (
              <Fragment>
                <li className='nav-item'>
                  <a
                    className={`nav-link ${styles.nav}`}
                    aria-current='page'
                    href={PageRoute.HOME}
                    onClick={() => Cookies.remove(CookiesStorage.ACCESS_TOKEN)}
                  >
                    Logout
                  </a>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className='nav-item'>
                  <a
                    className={`nav-link ${
                      currentPage === 'login' ? 'active' : ''
                    } ${styles.nav}`}
                    aria-current='page'
                    href={PageRoute.LOGIN}
                  >
                    Login
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className={`nav-link ${
                      currentPage === 'register' ? 'active' : ''
                    } ${styles.nav}`}
                    href={PageRoute.REGISTER}
                  >
                    Register
                  </a>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
