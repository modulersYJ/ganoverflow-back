import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
} from "@nestjs/common";
import { ChatpostsService } from "./chatposts.service";
import { CreateChatpostDto } from "./dto/create-chatpost.dto";

import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ChatPairsService } from "src/chat-pairs/chat-pairs.service";

import { Public } from "src/auth/public.decorator";
import { UserService } from "src/user/user.service";
import { CategoriesService } from "src/categories/categories.service";

import { RemoveChatpostDto } from "./dto/remove-chatpost.dto";

import { UpdateChatpostNameDto } from "./dto/update-chatpost-name.dto";

@ApiBearerAuth("jwt")
@ApiTags("chatposts")
@Controller("chatposts")
export class ChatpostsController {
  constructor(
    private readonly chatpostsService: ChatpostsService,
    private readonly userService: UserService,
    private readonly chatpairsService: ChatPairsService,
    private readonly categoriesService: CategoriesService
  ) {}

  @Post()
  @ApiOperation({
    summary: "chatpost 추가",
    description: "chatpost 추가 및 유저.folders 업데이트",
  })
  async create(@Body() createChatpostDto: CreateChatpostDto, @Req() req) {
    const user = await this.userService.findOneByUsername(req.user.username);

    console.log("chatposts controller - user", user);

    // ^ category 먼저 찾아야함.
    const categoryName = await this.categoriesService.findOne(
      createChatpostDto.categoryName
    );

    // ^ chatPosts 먼저 등록 => chatPostTitle 등록, Id 추출
    const chatPost = await this.chatpostsService.create(
      createChatpostDto,
      user,
      categoryName
    );

    // const chatPostId = chatPost.chatPostId;
    await this.chatpairsService.create(createChatpostDto, chatPost);

    // ^ chatPosts 추가 시, 해당 user의 folders에 chatPostId push
    const updatedFolders = await this.userService.pushChatpostIdToFolder(
      user,
      chatPost
    );

    return updatedFolders; // foldersWithChatposts 정합성 위해 반환
  }

  @Patch(":id")
  @ApiOperation({
    summary: "chatpost name 업데이트",
    description: "chatpost name 업데이트",
  })
  async updateName(
    @Param("id") id: string,
    @Body() updateChatpostNameDto: UpdateChatpostNameDto
  ) {
    const targetPost = await this.chatpostsService.findOne(id);

    if (!targetPost) {
      throw new NotFoundException("Post not found.");
    }
    // chatpost name 업데이트
    const newPostName = await this.chatpostsService.updateName(
      targetPost,
      updateChatpostNameDto
    );

    const user = await this.userService.findOneById(
      updateChatpostNameDto.userId
    );
    // user folders 업데이트
    const newFolders = this.userService.updateChatpostNameWithFolders(
      user,
      targetPost,
      updateChatpostNameDto.folderId,
      newPostName
    );
    // sidebar 정합성을 위한 folders 반환
    return newFolders;
  }

  @Delete(":id")
  @ApiOperation({
    summary: "chatpost 제거",
    description: "chatpost 제거 및 유저.folders 업데이트",
  })
  async remove(
    @Param("id") id: string,
    @Body() removeChatpostDto: RemoveChatpostDto
  ) {
    await this.chatpostsService.remove(id);

    const user = await this.userService.findOneById(removeChatpostDto.userId);
    const chatpost = await this.chatpostsService.findOne(id);
    const updatedFolders = await this.userService.removeChatpostIdFromFolder(
      user,
      chatpost
    );

    return updatedFolders;
  }

  @Public()
  @Get()
  findAll() {
    return this.chatpostsService.findAll();
  }

  @Get("my-chats")
  async findAllByUserId(@Req() request) {
    const user = await this.userService.findOneById(request.user.id);
    return this.chatpostsService.findAllByUserId(user);
  }

  @Get(":id")
  @ApiOperation({
    summary: "chatpost 가져오기 by ID",
    description: "chatpost 가져오기 by ID (for chat페이지)",
  })
  findOne(@Param("id") id: string) {
    return this.chatpostsService.findOne(id);
  }

  @Public()
  @Get("public/:id")
  publicFindOne(@Param("id") id: string) {
    return this.chatpostsService.findOneWithCount(id);
  }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateChatpostDto: UpdateChatpostDto
  // ) {
  //   return this.chatpostsService.update(id, updateChatpostDto);
  // }
}
