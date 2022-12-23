import LinkedIn from '../Icons/LinkedIn'
import Github from '../Icons/Github'

const Footer = () => {
  return (
    <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
      <div className='col-md-4 d-flex align-items-center'>
        <p>
          Developed by <span className='fw-bolder'>Kent Louise Tonino</span>
        </p>
      </div>
      <ul className='nav col-md-4 justify-content-end list-unstyled d-flex'>
        <li className='ms-3'>
          <a
            className='text-muted'
            href='https://www.linkedin.com/in/kentlouisetonino/'
            target='_blank'
          >
            <LinkedIn />
          </a>
        </li>
        <li className='ms-3'>
          <a
            className='text-muted'
            href='https://github.com/kentlouisetonino'
            target='_blank'
          >
            <Github />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
