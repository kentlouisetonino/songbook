import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSongInput {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsNotEmpty()
  @IsString()
  lyrics: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class UpdateSongInput {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  lyrics?: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
