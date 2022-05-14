import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  readonly phoneNumber: string;
}
