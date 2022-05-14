import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
