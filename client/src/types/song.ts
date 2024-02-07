export interface Song {
  id: number;
  userId: number;
  title: string;
  artist: string;
  lyrics: string;
  createdAt: string;
  updatedAt: string;
}

export enum FilterBy {
  All = 'all',
  Artist = 'artist',
  Title = 'title'
}
