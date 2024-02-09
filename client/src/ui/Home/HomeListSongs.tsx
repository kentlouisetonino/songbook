import { NextRouter } from 'next/router';
import { PageRoute } from '../../types/route';
import { Song } from 'src/types/song';

interface Props {
  songs: Song[];
  router: NextRouter;
  onDeleteSong: (value: number) => void;
}

export default function HomeListSongs({ songs, router, onDeleteSong }: Props) {
  return (
    <>
      {songs.map((song: Song) => (
        <div
          key={song.id}
          className='card'
          style={{ width: '48%', margin: '7px' }}
        >
          <div className='card-body'>
            <h5 className='card-title text-truncate fw-bolder'>{song.title}</h5>
            <p
              className='card-text fst-italic fw-lighter'
              style={{ overflow: 'hidden' }}
            >
              {song.artist}
            </p>
            <button
              className='btn btn-secondary w-100'
              onClick={() =>
                router.push(PageRoute.Song + `/${song?.id}/details`)
              }
            >
              Details
            </button>
            <button
              className='btn btn-info w-100 mt-2'
              onClick={() => router.push(PageRoute.Song + `/${song.id}/update`)}
            >
              Edit
            </button>
            <button
              className='btn btn-danger w-100 mt-2'
              onClick={() => onDeleteSong(song?.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
