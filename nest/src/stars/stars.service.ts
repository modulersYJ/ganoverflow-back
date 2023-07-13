import { Injectable } from "@nestjs/common";
import { CreateStarDto } from "./dto/create-star.dto";
import { UpdateStarDto } from "./dto/update-star.dto";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { Star } from "./entities/star.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Chatpost } from "src/chatposts/entities/chatpost.entity";

@Injectable()
export class StarsService {
  constructor(
    @InjectRepository(Star)
    private readonly starRepository: Repository<Star>
  ) {}

  async likeOrUpdate(
    createStarDto: CreateStarDto,
    chatpost: Chatpost,
    user: User
  ) {
    // ^ star가 있는지 찾는다!
    const star = await this.starRepository
      .createQueryBuilder()
      .where("chatpostid = :chatpostid", {
        chatpostid: createStarDto.chatPostId,
      })
      .andWhere("userid = :user", { user: user.id })
      .getOne();

    // const query = this.starRepository
    //   .createQueryBuilder()
    //   .where("chatpostid = :chatpostid", {
    //     chatpostid: createStarDto.chatPostId,
    //   })
    //   .andWhere("userid = :user", { user: user.id });

    // console.log("query", query.getSql());

    // console.log("star", star);

    let insertOrUpdate = "insert";

    // ^ star 테이블 안에 user + chatpost 조합이 없는 경우 (유저가 처음 누른경우)
    if (!star) {
      await this.starRepository.save({
        user: user,
        chatPostId: chatpost,
        value: createStarDto.like,
      });
    } else {
      // ^ star 있으면 업데이트 요청!
      await this.starRepository.update(star, {
        user: user,
        chatPostId: chatpost,
        value: createStarDto.like,
      });
      insertOrUpdate = "updated";
    }

    return this.findStarsByChatpostId(createStarDto.chatPostId);
  }

  findAll() {
    return `This action returns all stars`;
  }

  async findStarsByChatpostId(chatPostId: string) {
    const stars = await this.starRepository
      .createQueryBuilder("stars")
      .leftJoinAndSelect("stars.user", "user")
      .where("chatpostid = :chatpostid", {
        chatpostid: chatPostId,
      })
      .getMany();

    const count = stars.reduce((acc, curr) => acc + curr.value, 0);

    return { stars: stars, count: count };
  }

  update(id: number, updateStarDto: UpdateStarDto) {
    return `This action updates a #${id} star`;
  }

  remove(id: number) {
    return `This action removes a #${id} star`;
  }
}
