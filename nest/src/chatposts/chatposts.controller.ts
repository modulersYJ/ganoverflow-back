import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ChatpostsService } from "./chatposts.service";
import { CreateChatpostDto } from "./dto/create-chatpost.dto";
import { UpdateChatpostDto } from "./dto/update-chatpost.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("chatposts")
@Controller("chatposts")
export class ChatpostsController {
  constructor(private readonly chatpostsService: ChatpostsService) {}

  @Post()
  create(@Body() createChatpostDto: CreateChatpostDto) {
    return this.chatpostsService.create(createChatpostDto);
  }

  @Get()
  findAll() {
    return this.chatpostsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.chatpostsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateChatpostDto: UpdateChatpostDto
  ) {
    return this.chatpostsService.update(+id, updateChatpostDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.chatpostsService.remove(+id);
  }
}
