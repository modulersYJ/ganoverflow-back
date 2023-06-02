import { Injectable } from "@nestjs/common";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { UpdateConversationDto } from "./dto/update-conversation.dto";

@Injectable()
export class ConversationsService {
  create(createConversationDto: CreateConversationDto) {
    return "This action adds a new conversation";
  }

  findAll() {
    return `This action returns all conversations`;
  }

  findOne(id: string) {
    return `This action returns a #${id} conversation`;
  }

  update(id: string, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: string) {
    return `This action removes a #${id} conversation`;
  }
}
