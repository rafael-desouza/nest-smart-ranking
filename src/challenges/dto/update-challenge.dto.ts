import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ChallengeStatus } from '../interfaces/challenge-status';
import { CreateChallengeDto } from './create-challenge.dto';

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {
  @IsOptional()
  challengeDate?: Date;

  @IsOptional()
  challenged?: string;

  @IsOptional()
  status: ChallengeStatus;
}
