import { Injectable, NotFoundException } from "@nestjs/common";
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
      chatPost: chatPost,
      ...createCommentDto,
      createdAt: new Date(),
      delYn: "N",
      user: user,
    };

    this.commentsRepository.save(commentToSave);
    return "This action adds a new comment";
  }

  async findCommentsByChatPostId(chatPostId: string) {
    return this.commentsRepository.find({
      where: {
        chatPost: { chatPostId: chatPostId },
      },
    });
  }

  async like(commentId: number, user: User, didLike: boolean) {
    const comment = await this.commentsRepository.findOne({
      where: { commentId: commentId },
      relations: ["userLikes"],
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    if (didLike === true) {
      // true일 경우: N:M 테이블에 추가
      if (
        !comment.userLikes.some((originalUser) => originalUser.id === user.id)
      ) {
        comment.userLikes.push(user);
        await this.commentsRepository.save(comment);
      }
    } else {
      // false일 경우: N:M 테이블에서 삭제
      comment.userLikes = comment.userLikes.filter(
        (user) => user.id !== user.id
      );
      await this.commentsRepository.save(comment);
    }
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
