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

  async put(
    id: Chatpost["chatPostId"],
    createChatpostDto: CreateChatpostDto,
    user: User,
    categoryName?: Category
  ) {
    // chatPostId를 사용해 기존 포스트를 찾는다.
    const existingPost = await this.chatpostRepository.findOneOrFail({
      where: { chatPostId: id },
    });

    if (!existingPost) {
      console.log(`Chatpost with ID ${id} not found`);
      return;
    }

    existingPost.userId = user;
    existingPost.delYn = "N";
    existingPost.chatpostName = createChatpostDto.chatpostName;
    existingPost.categoryName = categoryName;

    const updatedPost = await this.chatpostRepository.save(existingPost);

    return updatedPost;
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
    return { posts: posts, postCount: postCount };
  }

  async findAllByUserId(user: User) {
    return this.chatpostRepository.find({ where: { userId: user } });
  }

  async findOneWithCount(id: string) {
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
      post.viewCount += 1;
      await this.chatpostRepository.save(post);
    }
    return post;
  }

  async findOne(id: string) {
    const post = await this.chatpostRepository.findOneOrFail({
      where: { chatPostId: id },
      relations: {
        chatPair: true,
        categoryName: true,
      },
    });
    return post;
  }

  async remove(id: Chatpost["chatPostId"]) {
    this.chatpostRepository.delete(id);
    return `This action removes a #${id} chatpost`;
  }
}
