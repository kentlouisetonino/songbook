import { Fragment } from 'react';
import Card from '../components/Card/Card';
import Footer from '../components/Footer/Footer';
import Header from '../components/Head/Head';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Navbar from '../components/Navbar/Navbar';

export default function HomeSignedOut() {
  return (
    <>
      <Header title='SongBook | Home' />
      <Navbar />
      <Fragment>
        <Jumbotron
          title='Save Your Favorite Music'
          content='Login to start saving your favorite song.'
        />
        <div className='mt-5 mx-3 row d-flex flex-wrap justify-content-between'>
          <Card
            title='Easy to Use'
            content='Simple interface and no hassle.'
            link='/register'
            linkName='Register'
          />
          <Card
            title='Free to Use'
            content='No need for card information. 100% free.'
            link='/register'
            linkName='Register'
          />
        </div>
        <div className='container fixed-bottom' style={{ maxWidth: '1080px' }}>
          <Footer />
        </div>
      </Fragment>
    </>
  );
}
