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
    const chatpost = {
      userId: user.id,
      createdAt: new Date(),
      delYn: "N",
      chatpostName: createChatpostDto.chatpostName,
      categoryName: categoryName,
      tags: createChatpostDto.tags,
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

    existingPost.user = user;
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
      where: { delYn: "N" },
      relations: {
        chatPair: true,
        user: true,
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
    console.log("🚀 ~ ChatpostsService ~ findAllByUserId ~ user:", user);

    // user 객체에서 ID를 추출
    const userId = user.id;

    const res = await this.chatpostRepository
      .createQueryBuilder("chatpost")
      .where("chatpost.userId = :userId", { userId })
      .getMany();

    console.log("chatpostsService - findAllByUserId:", res);
    return res;
  }

  async findMyPosts(user: User) {
    const posts = await this.chatpostRepository.find({
      // where: { userId: user },
      take: 10,
    });
    console.log(
      "🚀 ~ file: chatposts.service.ts:104 ~ ChatpostsService ~ findMyPosts ~ posts:",
      posts
    );
    return posts;
  }

  async findOneWithCount(id: string) {
    const post = await this.chatpostRepository.findOneOrFail({
      where: { chatPostId: id },
      relations: {
        chatPair: true,
        comments: { user: true },
        user: true,
        stars: true,
        categoryName: true,
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
      order: {
        chatPair: {
          order: "ASC",
        },
      },
    });
    return post;
  }

  async remove(id: Chatpost["chatPostId"]) {
    await this.chatpostRepository.update(id, { delYn: "Y" });
    return `This action marks a #${id} chatpost as deleted`;
  }

  async removeManyByIds(ids: Chatpost["chatPostId"][]) {
    await this.chatpostRepository.update(ids, { delYn: "Y" });
  }

  async findChatpostsUserLiked(user) {
    const posts = await this.chatpostRepository
      .createQueryBuilder("chatpost")
      .leftJoinAndSelect("chatpost.stars", "star")
      .where("star.user = :userId", { userId: user.id })
      .andWhere("star.value = :value", { value: "1" })
      .take(10)
      .getMany();
    console.log(
      "🚀 ~ file: chatposts.service.ts:157 ~ ChatpostsService ~ findChatpostsUserLiked ~ posts:",
      posts
    );
    return posts;
  }
}
