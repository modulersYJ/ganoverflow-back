import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/entities/user.entity";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { SkipAuth } from "src/auth/auth.decorator";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get("mypage/:userId")
  @ApiOperation({
    summary: "마이페이지",
    description: "마이페이지 - 아직 서비스 없음",
  })
  getMyPage(@Param("userId") userId: string) {
    return this.userService.myPage(userId);
  }

  @SkipAuth()
  @Post("register")
  @ApiOperation({
    summary: "회원가입",
    description: "회원가입",
  })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.userService.register(registerUserDto);
  }

  @SkipAuth()
  @Post("login")
  @ApiOperation({
    summary: "사용자 login",
    description: "추후 cognito 연결, usersService에 등록된 사용자 login",
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.userService.login(loginUserDto);
  }
}
