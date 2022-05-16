import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';
import { ChallengesModule } from './challenges/challenges.module';

const databasePath = 'mongodb+srv://admin:9oOF8y68uttZ0l0Y@nestjs-tenis.hfmfq.mongodb.net/nestjs-tenis-project?retryWrites=true&w=majority';

@Module({
  controllers: [],
  providers: [],
  imports: [MongooseModule.forRoot(databasePath), PlayersModule, CategoriesModule, ChallengesModule],
})
export class AppModule {}
