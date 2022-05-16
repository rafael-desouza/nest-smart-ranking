import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  challengeDate: Date;

  @IsNotEmpty()
  @IsString()
  challenger: string;

  @IsNotEmpty()
  @IsString()
  challenged: string;
}
