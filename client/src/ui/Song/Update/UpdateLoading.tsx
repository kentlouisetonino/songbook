import { User } from 'src/types/user';
import Header from 'src/ui/components/Head/Head';
import Navbar from 'src/ui/components/Navbar/Navbar';
import Sidebar from 'src/ui/components/Sidebar/Sidebar';

interface Props {
  userInfo: User;
}

export default function UpdateLoading({ userInfo }: Props) {
  return (
    <>
      <Header title='SongBook | Update Song' />
      <Navbar />
      <div className='d-flex'>
        <Sidebar
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          email={userInfo.email}
        />
      </div>
    </>
  );
}
