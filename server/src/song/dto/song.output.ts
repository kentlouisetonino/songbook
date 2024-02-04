import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class DeleteSongOutput {
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
