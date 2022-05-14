import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async createOrUpdatePlayer(createPlayerDto: CreatePlayerDto) {
    const { email } = createPlayerDto;

    const foundPlayer = this.players.find((player) => {
      return player.email === email;
    });

    return foundPlayer
      ? this.updatePlayer(foundPlayer, createPlayerDto)
      : this.createPlayer(createPlayerDto);
  }

  async getAllPlayers(): Promise<Player[]> {
    this.logger.log(`Returning all players: ${JSON.stringify(this.players)}`);
    return this.players;
  }

  async getPlayer(email: string): Promise<Player> {
    const foundPlayer = this.players.find((player) => {
      return player.email === email;
    });

    this.logger.log(`Returning player: ${JSON.stringify(foundPlayer)}`);

    return foundPlayer;
  }

  async deletePlayer(email: string) {
    const foundPlayer = this.players.find((player) => {
      return player.email === email;
    });

    this.logger.log(`Deleting player: ${JSON.stringify(foundPlayer)}`);

    this.players = this.players.filter((player) => {
      return player.email !== email;
    });

    this.players = this.players.filter((player) => {
      return player.email !== email;
    });
  }

  private async createPlayer(createPlayerDto: CreatePlayerDto) {
    const { name, email, phoneNumber } = createPlayerDto;

    const player: Player = {
      _id: uuidv4(),
      name,
      email,
      phoneNumber,
      ranking: 'A',
      rankPosition: 0,
      urlPlayerPhoto: 'www.google.com/photo123.jpg',
    };

    this.logger.log(`Created player: ${JSON.stringify(player)}`);

    this.players.push(player);
  }

  private async updatePlayer(
    foundPlayer: Player,
    createPlayerDto: CreatePlayerDto,
  ) {
    const { name } = createPlayerDto;

    this.logger.log(`Updating player: ${JSON.stringify(foundPlayer)}`);

    foundPlayer.name = name;
  }
}
