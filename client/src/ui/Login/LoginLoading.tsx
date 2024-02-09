import Header from '../components/Head/Head';
import Spinner from '../components/Spinner/Spinner';

export default function LoginLoading() {
  return (
    <>
      <Header title='SongBook | Login' />
      <Spinner />
    </>
  );
}
