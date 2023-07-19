import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateChatpostDto } from "./dto/create-chatpost.dto";
import { UpdateChatpostDto } from "./dto/update-chatpost.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Chatpost } from "./entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import { Category } from "src/categories/entities/category.entity";

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

  async findAll() {
    const posts = await this.chatpostRepository.find({
      relations: {
        chatPair: true,
        userId: true,
        comments: true,
        stars: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
    return posts;
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

  update(id: string, updateChatpostDto: UpdateChatpostDto) {
    return `This action updates a #${id} chatpost`;
  }

  async remove(id: Chatpost["chatPostId"]) {
    this.chatpostRepository.delete(id);
    return `This action removes a #${id} chatpost`;
  }
}
