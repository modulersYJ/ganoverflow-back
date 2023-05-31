import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SkipAuth } from "./auth.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post("login")
  @ApiOperation({
    summary: "로그인(진짜됨)",
    description: "jwt를 돌려줍니다",
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
