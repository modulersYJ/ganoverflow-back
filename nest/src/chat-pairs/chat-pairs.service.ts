import { Injectable } from '@nestjs/common';
import { CreateChatPairDto } from './dto/create-chat-pair.dto';
import { UpdateChatPairDto } from './dto/update-chat-pair.dto';

@Injectable()
export class ChatPairsService {
  create(createChatPairDto: CreateChatPairDto) {
    return 'This action adds a new chatPair';
  }

  findAll() {
    return `This action returns all chatPairs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatPair`;
  }

  update(id: number, updateChatPairDto: UpdateChatPairDto) {
    return `This action updates a #${id} chatPair`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatPair`;
  }
}
