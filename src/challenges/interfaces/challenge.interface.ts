import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';

import { Category } from '../../categories/interfaces/category.interface';
import { ChallengeStatus } from './challenge-status';

export interface Challenge extends Document {
  status: ChallengeStatus;
  challengeDate: Date;
  requestChallengeDate: Date;
  answerChallengeDate: Date;
  challenger: string;
  challenged: string;
  category: Category;
  match: Match;
}

export interface Match extends Document {
  winner: Player;
  loser: Player;
  result: Result[];
}

export interface Result {
  set: string;
}
