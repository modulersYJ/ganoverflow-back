import { Body, Controller, Post, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/user/entities/user.entity";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Public } from "src/auth/public.decorator";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get("mypage/:userId")
  @ApiOperation({
    summary: "마이페이지",
    description: "마이페이지 - 아직 서비스 없음",
  })
  getMyPage(@Param("userId") userId: string) {
    return this.userService.myPage(userId);
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

  @Post("login")
  @ApiOperation({
    summary: "사용자 login",
    description: "추후 cognito 연결, usersService에 등록된 사용자 login",
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.userService.validateUser(loginUserDto);
  }
}
