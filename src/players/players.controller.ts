import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationsParametersPipe } from './pipes/players-validations-parameters.pipe';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playersService.createPlayer(createPlayerDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async post(@Param('_id', PlayersValidationsParametersPipe) id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return await this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playersService.getAllPlayers();
  }

  @Get('/:_id')
  async getPlayer(@Param('_id') id: string) {
    return await this.playersService.getPlayerById(id);
  }

  @Delete('/:_id')
  async deletePlayer(@Param('_id', PlayersValidationsParametersPipe) id: string) {
    return await this.playersService.deletePlayer(id);
  }
}
