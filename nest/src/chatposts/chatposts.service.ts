import { Injectable } from "@nestjs/common";
import { CreateChatpostDto } from "./dto/create-chatpost.dto";
import { UpdateChatpostDto } from "./dto/update-chatpost.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Chatpost } from "./entities/chatpost.entity";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class ChatpostsService {
  constructor(
    @InjectRepository(Chatpost)
    private chatpostRepository: Repository<Chatpost>,
    private usersService: UserService
  ) {}

  async create(createChatpostDto: CreateChatpostDto, user: User) {
    const chatpost = {
      userId: user,
      createdAt: new Date(),
      delYn: "N",
      folder: null,
      title: createChatpostDto.title,
    };

    const savedPost = await this.chatpostRepository.save(chatpost);
    return savedPost;
  }

  async findAll() {
    const posts = await this.chatpostRepository.find({
      relations: {
        chatPair: true,
        userId: true,
      },
    });
    return posts;
    // return `This action returns all chatposts`;
  }

  async findAllByUserId(user: User) {
    return this.chatpostRepository.find({ where: { userId: user } });
  }

  async findOne(id: string) {
    // return `This action returns a #${id} chatpost`;
    return this.chatpostRepository.findOneOrFail({
      where: { chatPostId: id },
      relations: {
        chatPair: true,
        comments: true,
      },
    });
  }

  update(id: number, updateChatpostDto: UpdateChatpostDto) {
    return `This action updates a #${id} chatpost`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatpost`;
  }
}
