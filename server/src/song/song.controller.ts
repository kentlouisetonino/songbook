import { Controller, Get, Post, Req, Delete, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthGuard } from '../auth/guards/auth.guard';
import { SongService } from './song.service';
import { Song } from '../entities/Song';
import { DeleteSongOutput } from './dto/song.output';

@Controller('song')
@UseGuards(AuthGuard)
export class SongController {
  constructor(private songService: SongService) {}

  @Get('all')
  getSongs(): Promise<Song[]> {
    return this.songService.getSongs();
  }

  @Get()
  getSong(@Req() req: Request): Promise<Song> {
    return this.songService.getSong(Number(req.query?.id));
  }

  @Get('all/user')
  getSongsByUser(@Req() req: Request): Promise<Song[]> {
    return this.songService.getSongsByUser(Number(req.query?.id));
  }

  @Get('all/title')
  getSongsByTitle(@Req() req: Request): Promise<Song[]> {
    return this.songService.getSongsByTitle(
      String(req.query?.search),
      Number(req.query?.userId),
    );
  }

  @Get('all/artist')
  getSongsByArtist(@Req() req: Request): Promise<Song[]> {
    return this.songService.getSongsByArtist(
      String(req.query?.search),
      Number(req.query?.userId),
    );
  }

  @Post('create')
  createSong(@Req() req: Request): Promise<Song> {
    return this.songService.createSong(req.body);
  }

  @Post('update')
  updateSong(@Req() req: Request): Promise<Song> {
    return this.songService.updateSong(req.body);
  }

  @Delete('delete')
  deleteSong(@Req() req: Request): Promise<DeleteSongOutput> {
    return this.songService.deleteSong(Number(req.query.id));
  }
}
