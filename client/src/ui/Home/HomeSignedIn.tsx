import { NextRouter } from 'next/router';
import Header from '../components/Head/Head';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import HomeListEmpty from './HomeListEmpty';
import HomeListSongs from './HomeListSongs';
import HomeSearchBar from './HomeSearchBar';
import { FilterBy } from 'src/types/song';
import { User } from 'src/types/user';

interface Props {
  songs: any[];
  userInfo: User;
  filterBy: FilterBy;
  filterValue: string;
  router: NextRouter;
  setFilterBy: (value: FilterBy) => void;
  setFilterValue: (value: string) => void;
  onDeleteSong: (value: number) => void;
  onFilterBySearch: () => void;
}

export default function HomeSignedIn({
  songs,
  userInfo,
  filterBy,
  filterValue,
  router,
  setFilterBy,
  setFilterValue,
  onDeleteSong,
  onFilterBySearch
}: Props) {
  return (
    <>
      <Header title='SongBook | All Songs' />
      <Navbar />
      <div className='d-flex'>
        <Sidebar
          firstName={userInfo?.firstName}
          lastName={userInfo?.lastName}
          email={userInfo?.email}
        />
        <div className='flex-shrink-1' style={{ width: '800px' }}>
          <HomeSearchBar
            filterBy={filterBy}
            filterValue={filterValue}
            setFilterBy={setFilterBy}
            setFilterValue={setFilterValue}
            onFilterBySearch={onFilterBySearch}
          />

          <div className='d-flex flex-wrap justify-content-between mx-3 mt-5'>
            {songs.length ? (
              <HomeListSongs
                songs={songs}
                router={router}
                onDeleteSong={onDeleteSong}
              />
            ) : (
              <HomeListEmpty />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
