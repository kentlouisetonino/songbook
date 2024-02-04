import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { Song } from 'src/entities/Song';
import { SongService } from './song.service';
import { SongController } from './song.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), UserModule],
  providers: [SongService],
  controllers: [SongController],
  exports: [SongService],
})
export class SongModule {}
