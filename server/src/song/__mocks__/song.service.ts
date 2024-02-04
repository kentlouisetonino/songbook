import { songStub, deleteSongStub } from '../test/stubs/song.stub';

export const SongService = jest.fn().mockReturnValue({
  getSongs: jest.fn().mockReturnValue([songStub()]),
  getSong: jest.fn().mockReturnValue(songStub()),
  getSongsByUser: jest.fn().mockReturnValue([songStub()]),
  getSongsByTitle: jest.fn().mockReturnValue([songStub()]),
  getSongsByArtist: jest.fn().mockReturnValue([songStub()]),
  createSong: jest.fn().mockResolvedValue(songStub()),
  updateSong: jest.fn().mockResolvedValue(songStub()),
  deleteSong: jest.fn().mockResolvedValue(deleteSongStub())
});
