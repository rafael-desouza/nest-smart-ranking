import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const foundPlayer = await this.playerModel.findOne({ email: createPlayerDto.email }).exec();

    if (foundPlayer) throw new BadRequestException(`Player with email ${createPlayerDto.email} already exists`);

    return new this.playerModel(createPlayerDto).save();
  }

  async updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const foundPlayer = await this.playerModel.findOne({ id }).exec();

    if (!foundPlayer) throw new NotFoundException(`Player with id ${id} does not exists`);

    await this.playerModel.findOneAndUpdate({ id }, { $set: updatePlayerDto }).exec();
  }

  async deletePlayer(id: string) {
    await this.getPlayerById(id);

    return await this.playerModel.deleteOne({ id }).exec();
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerById(id: string): Promise<Player> {
    const foundPlayer = await this.playerModel.findById(id).exec();

    if (!foundPlayer) throw new NotFoundException(`Player with id ${id} does not exists`);

    return foundPlayer;
  }
}
