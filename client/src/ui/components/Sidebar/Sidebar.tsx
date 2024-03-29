import { useRouter } from 'next/router';
import { PageRoute } from 'src/types/route';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
}

export default function Sidebar({ firstName, lastName, email }: Props) {
  const router = useRouter();

  return (
    <div
      className='flex-shrink-0 p-3 text-white bg-secondary'
      style={{ width: '280px', height: '100vh' }}
    >
      <p className='display-5 fs-6 fw-lighter'>
        First Name : <span className='fw-bolder'>{firstName}</span>
      </p>
      <p className='display-5 fs-6 fw-lighter'>
        Last Name : <span className='fw-bolder'>{lastName}</span>
      </p>
      <p className='display-5 fs-6 fw-lighter'>
        Email : <span className='fw-bolder'>{email}</span>
      </p>
      <hr />
      <div>
        <button
          className='btn btn-success w-100'
          onClick={() => router.push(PageRoute.Root)}
        >
          All Song
        </button>
        <button
          className='btn btn-primary w-100 mt-3'
          onClick={() => router.push(PageRoute.SongAdd)}
        >
          Add Song
        </button>
      </div>
    </div>
  );
}
