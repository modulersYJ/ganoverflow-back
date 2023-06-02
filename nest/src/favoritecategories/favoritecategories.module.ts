import { Module } from '@nestjs/common';
import { FavoritecategoriesService } from './favoritecategories.service';
import { FavoritecategoriesController } from './favoritecategories.controller';

@Module({
  controllers: [FavoritecategoriesController],
  providers: [FavoritecategoriesService]
})
export class FavoritecategoriesModule {}
