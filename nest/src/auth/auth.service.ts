import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "./constants";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto);
    if (user) {
      const resUserData = {
        id: user.id,
        nickname: user.nickname,
        access_token: await this.generateAccessToken(user),
        refresh_token: await this.generateRefreshToken(user),
      };

      console.log("resUserData - login:", resUserData);

      return resUserData;
    }
  }

  async logout(userId: string) {
    return await this.userService.removeRefreshToken(userId);
  }

  async generateAccessToken(user: User) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.signAsync(payload, { expiresIn: "15m" });
  }

  // Refresh token 생성 함수
  async generateRefreshToken(user: User) {
    const refresh_token = this.jwtService.sign(
      {},
      {
        subject: String(user.id),
        expiresIn: "7d", // JWT 토큰 자체의 만료 시간을 설정
      }
    );
    await this.userService.setUserRefreshToken(refresh_token, user.id); // refresh token을 사용자 정보에 저장

    return refresh_token;
  }

  async setCookieWithRefreshToken(res: any, refresh_token: string) {
    const cookieSecure = this.configService.get("COOKIE_SECURE") === "true"; // env파일 별 분기 string -> boolean 변환이요!
    const cookieDomain = this.configService.get("COOKIE_DOMAIN");
    const sameSitePolicy = cookieSecure ? "none" : "lax"; // Secure종속적 Samesite 정책!

    res.cookie("refresh_token", refresh_token, {
      httpOnly: cookieSecure,
      secure: cookieSecure,
      domain: cookieDomain,
      sameSite: sameSitePolicy,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res;
  }

  // Refresh token 확인 함수
  async resolveRefreshToken(refreshToken: string) {
    console.log("refreshToken", refreshToken);
    const payload = await this.jwtService.verifyAsync(refreshToken.toString(), {
      secret: jwtConstants.secret,
    });

    console.log("malformed error payload", payload);
    const tokenExists = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken.toString(),
      payload.sub
    );

    if (!tokenExists) {
      throw new Error("Expired token");
    }

    return this.userService.findOneById(payload.sub);
  }
}
