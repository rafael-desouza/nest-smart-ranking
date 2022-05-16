import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeStatus } from './interfaces/challenge-status';
import { Challenge, Match } from './interfaces/challenge.interface';

@Injectable()
export class ChallengerService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    @InjectModel('Match') private readonly matchModel: Model<Match>,

    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  private readonly logger = new Logger(ChallengerService.name);

  async create(createChallengeDto: CreateChallengeDto) {
    const { challenger, challenged, challengeDate } = createChallengeDto;

    /**
     * Using the PlayerService to find the players
     */
    const challengerPlayer = await this.playersService.findOne(challenger);
    const challengedPlayer = await this.playersService.findOne(challenged);

    /**
     * Using the CategoryService to find the categories
     */
    const challengerCategory = await this.categoriesService.getPlayerCategory(challenger);
    const challengedCategory = await this.categoriesService.getPlayerCategory(challenged);

    if (challengerCategory.id !== challengedCategory.id) throw new BadRequestException('The players must be from the same category');

    /**
     * Validate Date
     */
    if (new Date(challengeDate) < new Date()) return new BadRequestException('Challenge date must be in the future');

    const challenge: Challenge = new this.challengeModel(createChallengeDto);
    challenge.status = ChallengeStatus.Pending;
    challenge.requestChallengeDate = new Date();
    challenge.category = challengerCategory;

    this.logger.log(`Create a new challenge between ${challengerPlayer.name} and ${challengedPlayer.name}`);

    return await challenge.save();
  }

  findAll() {
    return `This action returns all challenges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
