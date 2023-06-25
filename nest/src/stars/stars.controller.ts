import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarsService } from './stars.service';
import { CreateStarDto } from './dto/create-star.dto';
import { UpdateStarDto } from './dto/update-star.dto';

@Controller('stars')
export class StarsController {
  constructor(private readonly starsService: StarsService) {}

  @Post()
  create(@Body() createStarDto: CreateStarDto) {
    return this.starsService.create(createStarDto);
  }

  @Get()
  findAll() {
    return this.starsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStarDto: UpdateStarDto) {
    return this.starsService.update(+id, updateStarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.starsService.remove(+id);
  }
}
