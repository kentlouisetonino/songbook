import { IsNotEmpty, IsEmail, IsString, IsOptional } from 'class-validator'

export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  firstName: string

  @IsNotEmpty()
  @IsString()
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export class UpdateUserInput {
  @IsNotEmpty()
  @IsString()
  id: number

  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  accessToken?: string
}
