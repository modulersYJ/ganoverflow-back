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
    const star = await this.starRepository
      .createQueryBuilder()
      .where("chatpostid = :chatpostid", {
        chatpostid: createStarDto.chatPostId,
      })
      .andWhere("userid = :user", { user: user.id })
      .getOne();

    if (!star) {
      const newStar = this.starRepository.create({
        user: user,
        chatPostId: chatpost, // 여기서 chatpost 객체 전체를 전달합니다.
        value: createStarDto.like,
      });
      await this.starRepository.save(newStar);
    } else {
      await this.starRepository.update(star.starId, {
        chatPostId: chatpost, // 여기서 chatpost 객체 전체를 전달합니다.
        value: createStarDto.like,
      });
    }

    const stars = await this.starRepository
      .createQueryBuilder()
      .where("chatpostid = :chatpostid", {
        chatpostid: createStarDto.chatPostId,
      })
      .getMany();

    return {
      stars: stars,
      count: stars.reduce((acc, curr) => acc + curr.value, 0),
    };
  }

  findAll() {
    return `This action returns all stars`;
  }

  async findOneByChatPostId(chatPostId: string) {
    const star = await this.starRepository
      .createQueryBuilder("stars")
      .where("chatpostid = :chatpostid", {
        chatpostid: chatPostId,
      })
      .leftJoinAndSelect("stars.user", "user")
      .getMany();

    return {
      stars: star,
      count: star.reduce((acc, curr) => acc + curr.value, 0),
    };
  }

  // async findChatpostsUserLiked(user: User) {
  //   const posts = await this.starRepository.find({
  //     where: { user: user },
  //     relations: { chatPostId: true },
  //   });
  //   return posts;
  // }

  update(id: number, updateStarDto: UpdateStarDto) {
    return `This action updates a #${id} star`;
  }

  remove(id: number) {
    return `This action removes a #${id} star`;
  }
}
