import { Injectable } from '@nestjs/common';
import { CreateChatpostDto } from './dto/create-chatpost.dto';
import { UpdateChatpostDto } from './dto/update-chatpost.dto';

@Injectable()
export class ChatpostsService {
  create(createChatpostDto: CreateChatpostDto) {
    return 'This action adds a new chatpost';
  }

  findAll() {
    return `This action returns all chatposts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatpost`;
  }

  update(id: number, updateChatpostDto: UpdateChatpostDto) {
    return `This action updates a #${id} chatpost`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatpost`;
  }
}
