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
    const { access_token, refresh_token, nickname, id, imgUrl } =
      await this.authService.login(loginUserDto);

    this.authService.setCookieWithRefreshToken(res, refresh_token);

    return res.send({
      access_token: access_token,
      nickname: nickname,
      id: id,
      imgUrl: imgUrl,
    });
  }

  @Public()
  @Post("logout")
  @ApiOperation({
    summary: "로그아웃",
    description: "사용자 로그아웃을 처리하고 refresh token을 무효화합니다.",
  })
  async logout(@Body() body: { userId: string }, @Res() res: Response) {
    const userId = body.userId;
    console.log("userId:", userId); // 여기서 로그를 확인해보세요.

    await this.authService.logout(userId);

    res.clearCookie("refresh_token"); // http only 쿠키 삭제(서버가 삭제하도록 설정하는것)

    return res.sendStatus(200);
  }

  @Public()
  @Post("refresh")
  @ApiOperation({
    summary: "Access Token 갱신",
    description: "새로운 Access Token을 반환합니다",
  })
  async refresh(@Req() request: Request) {
    const refresh_token = request.cookies["refresh_token"];

    try {
      // refresh 검증 및 user정보 반환.
      const user = await this.authService.resolveRefreshToken(refresh_token);
      const newAccessToken = await this.authService.generateAccessToken(user);

      return newAccessToken;
    } catch (e: any) {
      throw new UnauthorizedException("Access Token 발급 실패");
    }
  }

  @Post("refresh-extension")
  @ApiOperation({
    summary: "Access Token 갱신 - Extension전용",
    description: "새로운 Access Token을 반환합니다 - Extension전용 ",
  })
  async refreshExtension(@Body("refresh_token") refreshToken: string) {
    try {
      const user = await this.authService.resolveRefreshToken(refreshToken);
      const newAccessToken = await this.authService.generateAccessToken(user);
      return { access_token: newAccessToken };
    } catch (e: any) {
      throw new UnauthorizedException("Access Token 발급 실패");
    }
  }
}
