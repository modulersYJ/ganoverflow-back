import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Put,
  Req,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/user/entities/user.entity";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Public } from "src/auth/public.decorator";
import { ChatpostsService } from "src/chatposts/chatposts.service";
import { StarsService } from "src/stars/stars.service";
import { CommentsService } from "src/comments/comments.service";

@ApiBearerAuth("jwt")
@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly chatpostsService: ChatpostsService,
    private readonly commentsService: CommentsService
  ) {}

  @UseGuards(AuthGuard)
  @Get("my-page")
  @ApiOperation({
    summary: "마이페이지",
    description: "마이페이지 - 아직 서비스 없음",
  })
  async getMyPage(@Req() request) {
    console.log("requser", request.user);
    const user = await this.userService.findOneByUsername(
      request.user.username
    );
    const posts = await this.chatpostsService.findMyPosts(user);
    const favoritePosts = await this.chatpostsService.findChatpostsUserLiked(
      user
    );
    const comments = await this.commentsService.findCommentsByUserId(user.id);
    return this.userService.mypage(user, posts, favoritePosts, comments);
  }

  @Public()
  @Post("register")
  @ApiOperation({
    summary: "회원가입",
    description: "회원가입",
  })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.userService.register(registerUserDto);
  }

  @UseGuards(AuthGuard)
  @Get("folders/:userId")
  @ApiOperation({
    summary: "사용자의 폴더 & 종속 포스트 기본정보 조회",
    description: "사용자의 폴더 & 종속 포스트 기본정보 조회",
  })
  async getFolders(@Param("userId") userId: string) {
    const targetUser = await this.userService.findOneById(userId);
    return this.userService.getFoldersWithPosts(targetUser);
  }

  @UseGuards(AuthGuard)
  @Put("folders/:userId")
  @ApiOperation({
    summary: "사용자의 폴더 & 종속 포스트 정보 갱신",
    description:
      "사용자의 폴더 & 종속 포스트 정보를 갱신 ( post 소속변경 or 폴더 추가, 제거 시 )",
  })
  async overwriteFoldersWithPosts(
    @Param("userId") userId: string,
    @Body() folders: any[]
  ) {
    const targetUser = await this.userService.findOneById(userId);
    if (folders === undefined) {
      throw new Error("folders is undefined");
    }
    return this.userService.overwriteFoldersWithPosts(targetUser, folders);
  }
}
