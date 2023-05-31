import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/entities/user.entity";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("mypage/:userId")
  getMyPage(@Param("userId") userId: string) {
    return this.userService.myPage(userId);
  }

  @Post("register")
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.userService.register(registerUserDto);
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return this.userService.login(loginUserDto);
  }
}
