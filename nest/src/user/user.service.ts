import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { MypageDto } from './dto/mypage-user.dto';

@Injectable()
export class UserService {
  //   constructor(
  //     @InjectRepository(User)
  //     private userRepository: Repository<User>,
  //   ) {}

  myPage(userId: string) {
    // : MypageDto 를 타입으로 하는 리턴값을 돌려주는 게 맞다 ...
    return `My page of ${userId} `;
  }
}
