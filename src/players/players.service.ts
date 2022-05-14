import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createOrUpdatePlayer(createPlayerDto: CreatePlayerDto) {
    const { email } = createPlayerDto;

    const foundPlayer = await this.getPlayer(email);

    return foundPlayer
      ? this.updatePlayer(createPlayerDto)
      : this.createPlayer(createPlayerDto);
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayer(email: string): Promise<Player> {
    const foundPlayer = await this.playerModel.findOne({ email }).exec();

    foundPlayer &&
      this.logger.log(`Returning player: ${JSON.stringify(foundPlayer)}`);

    return foundPlayer;
  }

  async deletePlayer(email: string) {
    return await this.playerModel.remove({ email }).exec();
  }

  private async createPlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto);
    return await createdPlayer.save();
  }

  private async updatePlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: createPlayerDto.email },
        { $set: createPlayerDto },
      )
      .exec();
  }
}
