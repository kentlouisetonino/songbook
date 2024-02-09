import { User } from 'src/types/user';
import Header from 'src/ui/components/Head/Head';
import InputField from 'src/ui/components/InputField/InputField';
import Navbar from 'src/ui/components/Navbar/Navbar';
import Sidebar from 'src/ui/components/Sidebar/Sidebar';
import TextAreaField from 'src/ui/components/TextAreaField/TextAreaField';

interface Props {
  title: string;
  artist: string;
  lyrics: string;
  userInfo: User;
  isInputsValid: boolean;
  setTitle: (value: string) => void;
  setArtist: (value: string) => void;
  setLyrics: (value: string) => void;
  onSubmit: () => void;
}

export default function UpdateForm({
  title,
  artist,
  lyrics,
  userInfo,
  isInputsValid,
  setTitle,
  setArtist,
  setLyrics,
  onSubmit
}: Props) {
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
      </div>
    </>
  );
}
