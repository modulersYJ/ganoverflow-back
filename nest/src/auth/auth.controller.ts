import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthAccessTokenRefreshDto } from "./dto/auth.dto";
import { Public } from "./public.decorator";

interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // AuthGuard 예외지정 커스텀 데코
  @Post("login")
  @ApiOperation({
    summary: "로그인(진짜됨)",
    description: "jwt를 돌려줍니다",
  })
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    console.log("????");
    const { access_token, refresh_token, nickname, id } =
      await this.authService.login(loginUserDto);

    this.authService.setCookieWithRefreshToken(res, refresh_token);

    return res.send({ access_token: access_token, nickname: nickname, id: id });
  }

  @Post("logout")
  @ApiOperation({
    summary: "로그아웃",
    description: "사용자 로그아웃을 처리하고 refresh token을 무효화합니다.",
  })
  async logout(@Body() body: { userId: string }, @Res() res: Response) {
    const userId = body.userId;
    console.log("userId:", userId); // 여기서 로그를 확인해보세요.

    await this.authService.logout(userId);

    res.clearCookie("refresh_token"); // 쿠키 삭제

    return res.sendStatus(200);
  }

  @Public()
  @Post("refresh")
  @ApiOperation({
    summary: "Access Token 갱신",
    description: "새로운 Access Token을 반환합니다",
  })
  async refresh(@Body() token: AuthAccessTokenRefreshDto) {
    console.log("token", token);
    const refresh_token = token.token;

    try {
      const user = await this.authService.resolveRefreshToken(refresh_token);
      console.log("user", user);
      const newAccessToken = await this.authService.generateAccessToken(user);
      console.log("generateAccessToken", newAccessToken);

      return newAccessToken;
    } catch (e: any) {
      console.log("e: ", e);
      throw new UnauthorizedException("Access Token 발급 실패");
    }
  }
}
