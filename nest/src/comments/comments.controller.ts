import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { ChatpostsService } from "src/chatposts/chatposts.service";
import { UserService } from "src/user/user.service";

@ApiTags("comments")
@Controller("comments")
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly chatPostsService: ChatpostsService,
    private readonly userService: UserService
  ) {}

  @ApiParam({
    name: "chatPostId",
    required: true,
    description: "chatPostId는 parameter로, 커멘트는 body에",
  })
  @Post("/:chatPostId")
  async create(
    @Param()
    chatPostId: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const chatPost = await this.chatPostsService.findOne(chatPostId);
    const user = await this.userService.findOneByUsername(
      createCommentDto.userName
    );
    return this.commentsService.create(chatPost, user, createCommentDto);
  }

  @Get("/all/:id")
  findAll(@Param("id") id: string) {
    return this.commentsService.findCommentsByChatPostId(id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentsService.remove(+id);
  }
}
