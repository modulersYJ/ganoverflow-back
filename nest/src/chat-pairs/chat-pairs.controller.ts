import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ChatPairsService } from "./chat-pairs.service";
import { CreateChatPairDto } from "./dto/create-chat-pair.dto";
import { UpdateChatPairDto } from "./dto/update-chat-pair.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("chat-pairs")
@Controller("chat-pairs")
export class ChatPairsController {
  constructor(private readonly chatPairsService: ChatPairsService) {}

  @Post()
  create(@Body() createChatPairDto: CreateChatPairDto) {
    return this.chatPairsService.create(createChatPairDto);
  }

  @Get()
  findAll() {
    return this.chatPairsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chatPairsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateChatPairDto: UpdateChatPairDto
  ) {
    return this.chatPairsService.update(+id, updateChatPairDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.chatPairsService.remove(+id);
  }
}
