import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/user/entities/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  myPage(userId: string) {
    return `My page of ${userId} `;
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    // 패스워드 해싱
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const user = {
      ...registerUserDto,
      password: hashedPassword,
      // status: "N",
      provider: null,
      social_id: null,
    };

    // 사용자 저장 및 반환
    return this.usersRepository.save(user);
  }

  // 사용자 증명 검증
  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: loginUserDto.username },
    });

    if (
      !user ||
      !(await bcrypt.compare(loginUserDto.password, user.password))
    ) {
      throw new BadRequestException("Invalid username or password");
    }

    return user;
  }

  async setUserRefreshToken(refreshToken: string, userId: string) {
    const currentUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!currentUser) throw new NotFoundException("User not found");

    const currentRefreshToken = await this.getCurrentHashedRefreshToken(
      refreshToken
    );
    const currentRefreshTokenExp = await this.getCurrentRefreshTokenExp();

    await this.usersRepository.update(userId, {
      refreshToken: currentRefreshToken,
      refreshTokenExp: currentRefreshTokenExp,
    });
  }

  async getCurrentHashedRefreshToken(refreshToken: string) {
    // 토큰 값을 그대로 저장하기 보단, 암호화를 거쳐 데이터베이스에 저장한다.
    // bcrypt는 단방향 해시 함수이므로 암호화된 값으로 원래 문자열을 유추할 수 없다.
    const saltOrRounds = 10;
    const currentRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);
    return currentRefreshToken;
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date();

    const currentRefreshTokenExp = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
      //이 만료 시간은 refreshToken 자체의 만료 시간이 아니라, 해당 refreshToken가 사용자에게 할당되어 있는 기간임
      // 이 기간이 지나면 사용자는 새로운 refreshToken를 요청해야 함
    );
    return currentRefreshTokenExp;
  }

  async removeRefreshToken(userId: string): Promise<any> {
    const current = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!current) throw new NotFoundException("User not found");
    return await this.usersRepository.update(userId, {
      refreshToken: null,
      refreshTokenExp: null,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    console.log("@@@@@@@getUserIfRefreshTokenMatches", userId);
    const current = await this.usersRepository.findOne({
      where: { id: userId },
    });
    console.log("current", current);

    if (!current) throw new NotFoundException("User not found");

    // 해쉬된 refreshToken과 데이터베이스에 저장된 refreshToken을 비교하기
    const isMatch = bcrypt.compareSync(refreshToken, current.refreshToken);

    if (isMatch) {
      return current;
    }
  }
}
