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
import { ConversationsService } from "./conversations.service";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { UpdateConversationDto } from "./dto/update-conversation.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("conversations")
@ApiBearerAuth("jwt")
@UseGuards(AuthGuard)
@Controller("conversations")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @ApiOperation({
    summary: "대화 내용 저장",
    description: "대화 내용 저장",
  })
  @Post("")
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.create(createConversationDto);
  }

  // @UseGuards(AuthGuard)
  @ApiOperation({
    summary: "대화 내용 모두 찾기",
    description: "대화 내용 모두 찾기",
  })
  @Get()
  findAll() {
    return this.conversationsService.findAll();
  }

  @ApiOperation({
    summary: "대화 내용 찾기",
    description: "대화 내용 찾기",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.conversationsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateConversationDto: UpdateConversationDto
  ) {
    return this.conversationsService.update(id, updateConversationDto);
  }

  // @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.conversationsService.remove(id);
  }
}
