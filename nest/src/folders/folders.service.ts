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
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
    @Inject(forwardRef(() => UserService))
    private usersService: UserService
  ) {}

  // user register 전용 무소속 폴더 생성
  async createDefaultFolder(user: User): Promise<Folder> {
    const newFolder = this.folderRepository.create({
      folderName: "무소속",
      userId: user,
      order: 0,
    });
    await this.folderRepository.save(newFolder);
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
    const highestOrderFolder = await this.folderRepository
      .createQueryBuilder("folder")
      .where("folder.userId = :userId", { userId: userId })
      .orderBy("folder.order", "DESC")
      .getOne(); // 최고order의 Folder get

    // 없으면 0으로 할당, but 원래 0은 없으면 안됨(default 생성 및 보호)
    const order = highestOrderFolder ? highestOrderFolder.order + 1 : 0;

    const newFolder = this.folderRepository.create({
      folderName,
      userId: ownUser,
      order,
    });
    await this.folderRepository.save(newFolder);
    return newFolder;
  }

  // chatPost에서 post 생성 시, default folder(무소속 폴더)에 넣기 위해 반환
  async findZeroOrderFolder(user: User) {
    return await this.folderRepository.findOne({
      where: { userId: user, order: 0 },
    });
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
