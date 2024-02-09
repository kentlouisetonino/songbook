import { User } from 'src/types/user';
import Header from 'src/ui/components/Head/Head';
import Navbar from 'src/ui/components/Navbar/Navbar';
import Sidebar from 'src/ui/components/Sidebar/Sidebar';
import Spinner from 'src/ui/components/Spinner/Spinner';

interface Props {
  userInfo: User;
}

export default function AddLoading({ userInfo }: Props) {
  return (
    <>
      <Header title='SongBook | Add Song' />
      <Navbar />
      <div className='d-flex'>
        <Sidebar
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          email={userInfo.email}
        />
        <div className='flex-shrink-1' style={{ width: '800px' }}>
          <Spinner />
        </div>
      </div>
    </>
  );
}
