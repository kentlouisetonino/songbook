import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Song } from '../entities/Song';
import { UserService } from '../user/user.service';
import { CreateSongInput, UpdateSongInput } from './dto/song.input';
import { DeleteSongOutput } from './dto/song.output';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    private userService: UserService,
  ) {}

  async getSongs(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async getSong(id: number): Promise<Song> {
    const songDb = await this.songRepository.findOne({ where: { id: id } });

    if (!songDb) {
      throw new NotFoundException('User Id does not exist.');
    }

    return songDb;
  }

  async getSongsByUser(userId: number): Promise<Song[]> {
    return await this.songRepository.find({
      where: { userId: userId },
    });
  }

  async getSongsByTitle(search: string, userId: number): Promise<Song[]> {
    return await this.songRepository
      .createQueryBuilder()
      .select()
      .where('user_id = :id', { id: userId })
      .andWhere('title Like :search', { search: `%${search}%` })
      .getMany();
  }

  async getSongsByArtist(search: string, userId: number): Promise<Song[]> {
    return await this.songRepository
      .createQueryBuilder()
      .select()
      .where('user_id = :id', { id: userId })
      .andWhere('artist Like :search', { search: `%${search}%` })
      .getMany();
  }

  async createSong(payload: CreateSongInput): Promise<Song> {
    await this.userService.getUserById(payload.userId);
    const songInstance = this.songRepository.create(payload);
    return await this.songRepository.save(songInstance);
  }

  async updateSong(payload: UpdateSongInput): Promise<Song> {
    const songDb = await this.songRepository.findOne({
      where: { id: payload.id },
    });

    if (!songDb) {
      throw new NotFoundException(
        'User Id does not exist. Use a different Id.',
      );
    }

    const songInstance = this.songRepository.create(payload);
    return await this.songRepository.save(songInstance);
  }

  async deleteSong(id: number): Promise<DeleteSongOutput> {
    const deletedSong = await this.songRepository.delete(id);

    if (deletedSong.affected) {
      return {
        status: HttpStatus.OK,
        message: 'Song successfully deleted.',
      };
    } else {
      return {
        status: HttpStatus.OK,
        message: 'Song already deleted.',
      };
    }
  }
}
