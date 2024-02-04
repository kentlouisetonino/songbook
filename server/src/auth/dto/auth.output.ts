import { IsNotEmpty, IsString } from 'class-validator';

export class LoginOutput {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
