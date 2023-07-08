import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateChatpostDto } from "./dto/create-chatpost.dto";
import { UpdateChatpostDto } from "./dto/update-chatpost.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Chatpost } from "./entities/chatpost.entity";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";
import { FoldersService } from "src/folders/folders.service";

@Injectable()
export class ChatpostsService {
  constructor(
    @InjectRepository(Chatpost)
    private chatpostRepository: Repository<Chatpost>,
    private usersService: UserService,
    private foldersService: FoldersService
  ) {}

  async create(createChatpostDto: CreateChatpostDto, user: User) {
    console.log("@@userId", user.id);
    const zeroOrderFolder =
      await this.foldersService.findZeroFolderWithChatposts(user);

    if (!zeroOrderFolder) {
      // zeroOrderFolder를 찾지 못한 경우 예외 처리
      throw new NotFoundException("Zero order folder not found");
    }

    if (!zeroOrderFolder.chatposts) {
      // zeroOrderFolder를 찾지 못한 경우 예외 처리
      throw new NotFoundException("ZeroOrderFolder Chatposts not found");
    }

    const highestOrderPost =
      zeroOrderFolder.chatposts.length > 0 // 무소속 폴더에 chatpost가 없을 시 0을 반환
        ? zeroOrderFolder.chatposts.reduce(
            (prev, current) => (current.order > prev ? current.order : prev),
            0
          )
        : 0;
    const order = highestOrderPost + 1;

    const chatpost = {
      userId: user,
      createdAt: new Date(),
      delYn: "N",
      folder: zeroOrderFolder,
      title: createChatpostDto.title,
      order: order,
    };

    const savedPost = await this.chatpostRepository.save(chatpost);
    return savedPost;
  }

  async findAll() {
    const posts = await this.chatpostRepository.find({
      relations: {
        chatPair: true,
      },
    });
    return posts;
    // return `This action returns all chatposts`;
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
