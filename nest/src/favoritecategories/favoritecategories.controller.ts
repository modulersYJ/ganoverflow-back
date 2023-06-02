import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritecategoriesService } from './favoritecategories.service';
import { CreateFavoritecategoryDto } from './dto/create-favoritecategory.dto';
import { UpdateFavoritecategoryDto } from './dto/update-favoritecategory.dto';

@Controller('favoritecategories')
export class FavoritecategoriesController {
  constructor(private readonly favoritecategoriesService: FavoritecategoriesService) {}

  @Post()
  create(@Body() createFavoritecategoryDto: CreateFavoritecategoryDto) {
    return this.favoritecategoriesService.create(createFavoritecategoryDto);
  }

  @Get()
  findAll() {
    return this.favoritecategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritecategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoritecategoryDto: UpdateFavoritecategoryDto) {
    return this.favoritecategoriesService.update(+id, updateFavoritecategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritecategoriesService.remove(+id);
  }
}
