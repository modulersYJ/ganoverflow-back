import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentlikesService } from './commentlikes.service';
import { CreateCommentlikeDto } from './dto/create-commentlike.dto';
import { UpdateCommentlikeDto } from './dto/update-commentlike.dto';

@Controller('commentlikes')
export class CommentlikesController {
  constructor(private readonly commentlikesService: CommentlikesService) {}

  @Post()
  create(@Body() createCommentlikeDto: CreateCommentlikeDto) {
    return this.commentlikesService.create(createCommentlikeDto);
  }

  @Get()
  findAll() {
    return this.commentlikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentlikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentlikeDto: UpdateCommentlikeDto) {
    return this.commentlikesService.update(+id, updateCommentlikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentlikesService.remove(+id);
  }
}
