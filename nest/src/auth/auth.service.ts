import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    if (user) {
      const payload = { sub: user.id, username: user.username }; // jwt standard라고 합니다.
      return { access_token: await this.jwtService.signAsync(payload) };
    }
  }
}
