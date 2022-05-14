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
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playersService.create(createPlayerDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async update(@Param('_id', PlayersValidationsParametersPipe) id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return await this.playersService.update(id, updatePlayerDto);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return await this.playersService.findAll();
  }

  @Get('/:_id')
  async findOne(@Param('_id') id: string) {
    return await this.playersService.findOne(id);
  }

  @Delete('/:_id')
  async remove(@Param('_id', PlayersValidationsParametersPipe) id: string) {
    return await this.playersService.remove(id);
  }
}
