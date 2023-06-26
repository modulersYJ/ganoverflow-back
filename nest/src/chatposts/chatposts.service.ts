import { Injectable } from "@nestjs/common";
import { CreateChatpostDto } from "./dto/create-chatpost.dto";
import { UpdateChatpostDto } from "./dto/update-chatpost.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Chatpost } from "./entities/chatpost.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class ChatpostsService {
  constructor(
    @InjectRepository(Chatpost)
    private chatpostRepository: Repository<Chatpost>,
    private usersService: UserService
  ) {}

  async create(createChatpostDto: CreateChatpostDto[]) {
    const user = await this.usersService.findOneByUsername("test");

    const chatpost = {
      userId: user,
      createdAt: new Date(),
      delYn: "N",
      folder: null,
    };

    const savedPost = await this.chatpostRepository.save(chatpost);
    return savedPost;
  }

  findAll() {
    return `This action returns all chatposts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatpost`;
  }

  update(id: number, updateChatpostDto: UpdateChatpostDto) {
    return `This action updates a #${id} chatpost`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatpost`;
  }
}
