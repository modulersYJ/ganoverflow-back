import { Injectable } from '@nestjs/common';
import { CreateCommentlikeDto } from './dto/create-commentlike.dto';
import { UpdateCommentlikeDto } from './dto/update-commentlike.dto';

@Injectable()
export class CommentlikesService {
  create(createCommentlikeDto: CreateCommentlikeDto) {
    return 'This action adds a new commentlike';
  }

  findAll() {
    return `This action returns all commentlikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentlike`;
  }

  update(id: number, updateCommentlikeDto: UpdateCommentlikeDto) {
    return `This action updates a #${id} commentlike`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentlike`;
  }
}
