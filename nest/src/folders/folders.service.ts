import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import { CreateFolderDto } from "./dto/create-folder.dto";
import { UpdateFolderDto } from "./dto/update-folder.dto";
import { Folder } from "./entities/folder.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Chatpost } from "src/chatposts/entities/chatpost.entity";

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,
    @Inject(forwardRef(() => UserService))
    private usersService: UserService
  ) {}

  // user register 전용 무소속 폴더 생성
  async createDefaultFolder(user: User): Promise<Folder> {
    const newFolder = this.foldersRepository.create({
      folderName: "무소속",
      user: user,
      order: 0,
    });
    await this.foldersRepository.save(newFolder);
    return newFolder;
  }

  async createFolder(createFolderDto: CreateFolderDto): Promise<Folder> {
    const { userId, folderName } = createFolderDto;

    // User entity를 찾는다.
    const ownUser = await this.usersService.findOneById(userId);
    if (!ownUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // 해당 folder가 생성되는 user의 folder중 최고 order+1 할당
    const highestOrderFolder = await this.foldersRepository
      .createQueryBuilder("folder")
      .where("folder.userId = :userId", { userId: userId })
      .orderBy("folder.order", "DESC")
      .getOne(); // 최고order의 Folder get

    // 없으면 0으로 할당, but 원래 0은 없으면 안됨(default 생성 및 보호)
    const order = highestOrderFolder ? highestOrderFolder.order + 1 : 0;

    const newFolder = this.foldersRepository.create({
      folderName,
      user: ownUser,
      order,
    });
    await this.foldersRepository.save(newFolder);
    return newFolder;
  }

  async findZeroFolderWithChatposts(user: User) {
    const zeroFolder = await this.foldersRepository.findOne({
      where: { userId: user.id, order: 0 },
      relations: ["chatposts"],
    });

    console.log("findZeroFolder - res", zeroFolder);
    return zeroFolder;
  }

  async findByUserId(userId: string): Promise<Folder[]> {
    return this.foldersRepository.find({
      where: { user: Equal(userId) },
      relations: ["chatposts"], // Folder 엔티티에서 chatposts 참조
    });
  }

  async updateFolderOrder(userId: string, folders: Folder[]): Promise<void> {
    const user = await this.usersService.findOneById(userId);
    if (user) {
      folders.forEach(async (folder) => {
        const existingFolder = await this.foldersRepository.findOneBy({
          folderId: folder.folderId,
        });
        if (existingFolder && existingFolder.user === user) {
          existingFolder.order = folder.order;
          await this.foldersRepository.save(existingFolder);
        }
      });
    }
  }

  async updatePostOrder(folderId: number, posts: Chatpost[]): Promise<void> {
    const folder = await this.foldersRepository.findOne({
      where: { folderId },
      relations: ["chatposts"],
    });
    if (folder) {
      posts.forEach(async (post) => {
        const existingPost = folder.chatposts.find(
          (p) => p.chatPostId === post.chatPostId
        );
        if (existingPost) {
          existingPost.order = post.order;
          await this.foldersRepository.save(folder); // 모든 게시물이 폴더에 연결되어 있으므로, 폴더를 저장하면 게시물의 순서 변경도 반영됩니다.
        }
      });
    }
  }

  findAll() {
    return `This action returns all folders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}
