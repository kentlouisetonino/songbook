import { useEffect } from 'react';
import SongService from 'src/services/SongService';
import { FilterBy, Song } from 'src/types/song';

interface Props {
  userId: string;
  filterBy: FilterBy;
  accessToken: string;
  setSongs: (value: Song[]) => void;
}

export default function useHomeInitialization({
  userId,
  filterBy,
  accessToken,
  setSongs
}: Props) {
  useEffect(() => {
    if (filterBy === FilterBy.All) {
      SongService.getAllSongByUserAPI({
        accessToken: accessToken,
        userId: Number(userId),
        setSongs: setSongs
      });
    }
  }, [accessToken, filterBy]);
}
