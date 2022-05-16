import { IsNotEmpty } from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';
import { Result } from '../interfaces/challenge.interface';

export class UpdateMatchResultDto {
  @IsNotEmpty()
  winner: Player;

  @IsNotEmpty()
  result: Result[];
}
