import { Test } from '@nestjs/testing';
import { Request } from 'express';

import { SongController } from '../song.controller';
import { SongService } from '../song.service';
import { songStub, deleteSongStub } from './stubs/song.stub';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Song } from '../../entities/Song';
import { CreateSongInput, UpdateSongInput } from '../dto/song.input';
import { DeleteSongOutput } from '../dto/song.output';

jest.mock('../song.service');

describe('SongController', () => {
  let songController: SongController;
  let songService: SongService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [SongController],
      providers: [
        SongService,
        {
          provide: AuthGuard,
          useValue: jest.fn().mockImplementation(() => true)
        }
      ]
    }).compile();

    songController = moduleRef.get<SongController>(SongController);
    songService = moduleRef.get<SongService>(SongService);
    jest.clearAllMocks();
  });

  describe('A. getSongs', () => {
    let songs: Song[];

    beforeEach(async () => {
      songs = await songController.getSongs();
    });

    test('#1: If getSongs is called.', () => {
      expect(songService.getSongs).toHaveBeenCalled();
    });

    test('#2: If getSongs returns an array.', () => {
      expect(songService.getSongs()).toBe(songs);
    });
  });

  describe('B. getSong', () => {
    let song: Song;

    const request: Request | any = {
      query: {
        id: songStub().id
      }
    };

    beforeEach(async () => {
      song = await songController.getSong(request);
    });

    test('#1: If getSong is called.', () => {
      expect(songService.getSong).toBeCalledWith(request.query.id);
    });

    test('#2: If getSong returns a song object.', () => {
      expect(songService.getSong(songStub().id)).toBe(song);
    });
  });

  describe('C. getSongByUser', () => {
    let songs: Song[];

    const request: Request | any = {
      query: {
        id: songStub().userId
      }
    };

    beforeEach(async () => {
      songs = await songController.getSongsByUser(request);
    });

    test('#1: If getSongsByUser is called.', () => {
      expect(songService.getSongsByUser).toBeCalledWith(request.query.id);
    });

    test('#2: If getSongsByUser returns an array of song.', () => {
      expect(songService.getSongsByUser(songStub().userId)).toBe(songs);
    });
  });

  describe('D. getSongsByTitle', () => {
    let songs: Song[];

    const request: Request | any = {
      query: {
        search: songStub().title,
        userId: songStub().userId
      }
    };

    beforeEach(async () => {
      songs = await songController.getSongsByTitle(request);
    });

    test('#1: If getSongsByTitle is called.', () => {
      expect(songService.getSongsByTitle).toBeCalledWith(
        request.query.search,
        request.query.userId
      );
    });

    test('#2: If getSongsByTitle returns an array of song.', () => {
      expect(
        songService.getSongsByTitle(songStub().title, songStub().userId)
      ).toBe(songs);
    });
  });

  describe('D. getSongsByArtist', () => {
    let songs: Song[];

    const request: Request | any = {
      query: {
        search: songStub().title,
        userId: songStub().userId
      }
    };

    beforeEach(async () => {
      songs = await songController.getSongsByArtist(request);
    });

    test('#1: If getSongsByArtist is called.', () => {
      expect(songService.getSongsByArtist).toBeCalledWith(
        request.query.search,
        request.query.userId
      );
    });

    test('#2: If getSongsByArtist returns an array of song.', () => {
      expect(
        songService.getSongsByArtist(songStub().title, songStub().userId)
      ).toBe(songs);
    });
  });

  describe('E. createSong', () => {
    let song: Song;
    let createSongInput: CreateSongInput;

    beforeEach(async () => {
      createSongInput = {
        title: songStub().title,
        artist: songStub().artist,
        lyrics: songStub().lyrics,
        userId: songStub().userId
      };

      const request: Request | any = {
        body: createSongInput
      };

      song = await songController.createSong(request);
    });

    test('#1: If createSong is called.', () => {
      expect(songService.createSong).toHaveBeenCalledWith(createSongInput);
    });

    test('#2: If createSong return a song object.', () => {
      expect(song).toEqual(songStub());
    });
  });

  describe('F. updateSong', () => {
    let song: Song;
    let updateSongInput: UpdateSongInput;

    beforeEach(async () => {
      updateSongInput = {
        id: songStub().id,
        title: songStub().title,
        userId: songStub().userId
      };

      const request: Request | any = {
        body: updateSongInput
      };

      song = await songController.updateSong(request);
    });

    test('#1: If updateSong is called.', () => {
      expect(songService.updateSong).toHaveBeenCalledWith(updateSongInput);
    });

    test('#2: If updateSong returns a song object.', () => {
      expect(song).toStrictEqual(songStub());
    });
  });

  describe('G. deleteSong', () => {
    let deleteSongOutput: DeleteSongOutput;

    const request: Request | any = {
      query: {
        id: songStub().id
      }
    };

    beforeEach(async () => {
      deleteSongOutput = await songController.deleteSong(request);
    });

    test('#1: If deleteSong is called', () => {
      expect(songService.deleteSong).toHaveBeenCalledWith(songStub().id);
    });

    test('#2: If deleteSong returns an output.', () => {
      expect(deleteSongOutput).toStrictEqual(deleteSongStub());
    });
  });
});
