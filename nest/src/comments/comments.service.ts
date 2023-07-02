import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import { ChatpostsService } from "src/chatposts/chatposts.service";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly chatPostsService: ChatpostsService
  ) {}

  create(chatPost: Chatpost, user: User, createCommentDto: CreateCommentDto) {
    const commentToSave = {
      chatPostId: chatPost,
      ...createCommentDto,
      createdAt: new Date(),
      delYn: "N",
      user: user,
    };

    this.commentsRepository.save(commentToSave);
    return "This action adds a new comment";
  }

  async findCommentsByChatPostId(chatPostId: string) {
    // return `This action returns all comments`;
    const chatPost = await this.chatPostsService.findOne(chatPostId);
    return this.commentsRepository.find({
      where: {
        chatpostId: chatPost,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
