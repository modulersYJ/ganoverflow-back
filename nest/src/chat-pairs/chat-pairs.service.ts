import { Injectable } from "@nestjs/common";
import { CreateChatPairDto } from "./dto/create-chat-pair.dto";
import { UpdateChatPairDto } from "./dto/update-chat-pair.dto";
import { Repository } from "typeorm";
import { ChatPair } from "./entities/chat-pair.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateChatpostDto } from "src/chatposts/dto/create-chatpost.dto";
import { ChatpostsService } from "src/chatposts/chatposts.service";
import { Chatpost } from "src/chatposts/entities/chatpost.entity";

@Injectable()
export class ChatPairsService {
  constructor(
    @InjectRepository(ChatPair)
    private readonly chatPairRepository: Repository<ChatPair>
  ) {}
  async create(createChatPairDto: CreateChatpostDto[], chatPost: Chatpost) {
    const savedPairs = createChatPairDto.map(async (pair, idx) => {
      const chatPair = {
        chatPost: chatPost,
        question: pair.question,
        answer: pair.answer,
        order: idx,
      };
      const savedPairs = await this.chatPairRepository.save(chatPair);
      return savedPairs;
    });
    return savedPairs;
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
