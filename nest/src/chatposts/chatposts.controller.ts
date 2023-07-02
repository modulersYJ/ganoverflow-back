import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ChatpostsService } from "./chatposts.service";
import { CreateChatpostDto } from "./dto/create-chatpost.dto";
import { UpdateChatpostDto } from "./dto/update-chatpost.dto";
import { ApiTags } from "@nestjs/swagger";
import { ChatPairsService } from "src/chat-pairs/chat-pairs.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Public } from "src/auth/public.decorator";

@Public()
@ApiTags("chatposts")
@Controller("chatposts")
export class ChatpostsController {
  constructor(
    private readonly chatpostsService: ChatpostsService,
    private readonly chatpairsService: ChatPairsService
  ) {}

  @Post()
  async create(@Body() createChatpostDto: CreateChatpostDto) {
    console.log(createChatpostDto);
    // ^ chatPosts 먼저 등록 => chatPostTitle 등록, Id 추출
    const chatPost = await this.chatpostsService.create(createChatpostDto);
    // const chatPostId = chatPost.chatPostId;
    await this.chatpairsService.create(createChatpostDto, chatPost);
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
