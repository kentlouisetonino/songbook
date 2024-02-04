import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class DeleteUserOutput {
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
