import { Injectable } from "@nestjs/common";
import { CreateChatpostDto } from "./dto/create-chatpost.dto";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Chatpost } from "./entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import { Category } from "src/categories/entities/category.entity";
import { UpdateChatpostNameDto } from "./dto/update-chatpost-name.dto";

@Injectable()
export class ChatpostsService {
  constructor(
    @InjectRepository(Chatpost)
    private chatpostRepository: Repository<Chatpost>
  ) {}

  async create(
    createChatpostDto: CreateChatpostDto,
    user: User,
    categoryName?: Category
  ) {
    console.log("@@userId", user.id);

    const chatpost = {
      userId: user,
      createdAt: new Date(),
      delYn: "N",
      chatpostName: createChatpostDto.chatpostName,
      categoryName: categoryName,
    };

    const savedPost = await this.chatpostRepository.save(chatpost);
    return savedPost;
  }

  async updateName(
    targetPost: Chatpost,
    updateChatpostNameDto: UpdateChatpostNameDto
  ) {
    const newPostName = updateChatpostNameDto.chatpostName;
    targetPost.chatpostName = newPostName;
    await this.chatpostRepository.save(targetPost);
    return newPostName;
  }

  async findAll(page: number) {
    const [posts, postCount] = await this.chatpostRepository.findAndCount({
      relations: {
        chatPair: true,
        userId: true,
        comments: true,
        stars: true,
        categoryName: true,
      },
      order: {
        createdAt: "DESC",
      },
      take: 10,
      skip: 10 * (page - 1),
    });
    // const totalCount = await this.chatpostRepository.count
    return { posts: posts, postCount: postCount };
    // return `This action returns all chatposts`;
  }

  async findAllByUserId(user: User) {
    return this.chatpostRepository.find({ where: { userId: user } });
  }

  async findOneWithCount(id: string) {
    // return `This action returns a #${id} chatpost`;
    const post = await this.chatpostRepository.findOneOrFail({
      where: { chatPostId: id },
      relations: {
        chatPair: true,
        comments: { user: true },
        userId: true,
        stars: true,
      },
    });

    if (post) {
      post.viewCount += 1; // viewCount 증가
      await this.chatpostRepository.save(post);
    }
    return post;
  }

  async findOne(id: string) {
    const post = await this.chatpostRepository.findOneOrFail({
      where: { chatPostId: id },
      relations: {
        chatPair: true,
      },
    });
    return post;
  }

  async remove(id: Chatpost["chatPostId"]) {
    this.chatpostRepository.delete(id);
    return `This action removes a #${id} chatpost`;
  }
}
