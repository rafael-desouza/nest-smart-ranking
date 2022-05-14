import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>, private readonly playersService: PlayersService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { category } = createCategoryDto;

    const foundCategory = await this.categoryModel.findOne({ category });
    if (foundCategory) throw new BadRequestException(`Category with name ${category} already exists`);

    console.log(createCategoryDto);
    return await new this.categoryModel(createCategoryDto).save();
  }

  async findAll() {
    return await this.categoryModel.find().populate('players').exec();
  }

  async findOne(id: string) {
    const foundCategory = await this.categoryModel.findById(id).populate('players').exec();
    if (!foundCategory) throw new NotFoundException(`Category with id ${id} not found`);

    return foundCategory;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto).exec();
  }

  async addPlayer(category: string, playerId: string) {
    const foundCategory = await this.categoryModel.findOne({ category });
    if (!foundCategory) throw new NotFoundException(`Category with name ${category} not found`);

    const foundPlayer = await this.playersService.findOne(playerId);

    const registeredPlayers = await this.categoryModel.find({ category }).where('players').in([playerId]).exec();
    if (registeredPlayers.length > 0)
      throw new BadRequestException(`Player with id ${playerId} is already registered in category ${category}`);

    foundCategory.players.push(foundPlayer);
    await this.categoryModel.findByIdAndUpdate(foundCategory._id, { $set: foundCategory }).exec();
  }

  async removePlayer(category: string, playerId: string) {
    const foundCategory = await this.categoryModel.findOne({ category });
    if (!foundCategory) throw new NotFoundException(`Category with name ${category} not found`);

    await this.playersService.findOne(playerId);

    const registeredPlayers = await this.categoryModel.find({ category }).where('players').in([playerId]).exec();
    if (registeredPlayers.length === 0)
      throw new BadRequestException(`Player with id ${playerId} is not registered in category ${category}`);

    foundCategory.players.filter((player) => player._id.toString() !== playerId);
    await this.categoryModel.findByIdAndUpdate(foundCategory._id, { $set: foundCategory }).exec();
  }
}
