import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/user/entities/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { hashTokenSync } from "src/UTILS/hash.util";
// import { FoldersService } from "src/folders/folders.service";
import { ChatpostsService } from "src/chatposts/chatposts.service";
import { Chatpost } from "src/chatposts/entities/chatpost.entity";
import {
  IChatpostBasicInfo,
  IFolder,
  IFolderForClient,
} from "./entities/IFolders";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly chatPostsService: ChatpostsService
  ) {}

  myPage(userId: string) {
    return `My page of ${userId} `;
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    // 패스워드 해싱
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const user = {
      ...registerUserDto,
      password: hashedPassword,
      // status: "N",
      provider: null,
      social_id: null,
      // 기본 폴더 생성
      folders: JSON.stringify([
        {
          folderId: 0,
          folderName: "default folder",
          chatpostIds: [],
        },
      ]),
    };
    const newUser = await this.usersRepository.save(user);

    // 사용자 저장 및 반환
    return newUser;
  }

  // 사용자 증명 검증
  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: loginUserDto.username },
    });

    if (
      !user ||
      !(await bcrypt.compare(loginUserDto.password, user.password))
    ) {
      throw new BadRequestException("Invalid username or password");
    }

    return user;
  }

  async setUserRefreshToken(refreshToken: string, userId: string) {
    const currentUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!currentUser) throw new NotFoundException("User not found");

    const currentRefreshToken = await this.getCurrentHashedRefreshToken(
      refreshToken
    );
    const currentRefreshTokenExp = await this.getCurrentRefreshTokenExp();

    await this.usersRepository.update(userId, {
      refreshToken: currentRefreshToken,
      refreshTokenExp: currentRefreshTokenExp,
    });
  }

  async getCurrentHashedRefreshToken(refreshToken: string) {
    // hashTokenSync 함수를 이용해 token 해싱 후 저장 (비교 시 같은 함수 이용 in AuthGuard, saltOrRound는 양측 모두 default 함수 정의인자 사용)
    const currentRefreshToken = hashTokenSync(refreshToken);
    return currentRefreshToken;
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date();

    const currentRefreshTokenExp = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
      //이 만료 시간은 refreshToken 자체의 만료 시간이 아니라, 해당 refreshToken가 사용자에게 할당되어 있는 기간임
      // 이 기간이 지나면 사용자는 새로운 refreshToken를 요청해야 함
    );
    return currentRefreshTokenExp;
  }

  async removeRefreshToken(userId: string): Promise<any> {
    const current = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!current) throw new NotFoundException("User not found");
    return await this.usersRepository.update(userId, {
      refreshToken: null,
      refreshTokenExp: null,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    console.log("@@@@@@@getUserIfRefreshTokenMatches", userId);
    const current = await this.usersRepository.findOne({
      where: { id: userId },
    });
    console.log("current", current);

    if (!current) throw new NotFoundException("User not found");

    // 해쉬된 refreshToken과 데이터베이스에 저장된 refreshToken을 비교하기
    const isMatch = bcrypt.compareSync(refreshToken, current.refreshToken);

    if (isMatch) {
      return current;
    }
  }

  //============Folders 관련===========
  // 사용자 폴더 목록 & 매치되는 chatpost기본정보 포함 반환
  async getFoldersWithPosts(user: User) {
    const resFolders = JSON.parse(user.folders);

    for (const folder of resFolders) {
      folder.chatposts = [] as IChatpostBasicInfo[]; // chatposts 폴더 초기화
      for (const postId of folder.chatpostIds) {
        // chatpostIds 각각 id에 해당하는 chatpost를 찾아 chatposts 배열에 추가
        const { chatPostId, chatpostName } =
          await this.chatPostsService.findOne(postId);

        folder.chatposts.push({
          chatPostId,
          chatpostName,
        } as IChatpostBasicInfo);
      }

      // 각 폴더에서 chatpostIds를 삭제
      delete folder.chatpostIds;
    }

    // 재구조화된 resFolders 반환
    return resFolders as IFolderForClient[];
  }

  // cli에서 드래그앤드롭에 의해 업데이트 & 폴더추가 경우 overwrite하는 용도 (순서, 소속)
  async overwriteFoldersWithPosts(
    user: User,
    folders: IFolderForClient[]
  ): Promise<IFolderForClient[]> {
    const newFolders = JSON.stringify(
      folders.map(
        (folder) =>
          ({
            folderId: folder.folderId,
            folderName: folder.folderName,
            chatpostIds: folder.chatposts.map(
              (chatpost: Chatpost) => chatpost.chatPostId
            ),
          } as IFolder)
      )
    );
    user.folders = newFolders;
    await this.usersRepository.save(user);
    const restructedFolders = await this.getFoldersWithPosts(user);

    return restructedFolders as IFolderForClient[];
  }

  // chatpost 서비스에서 chapost 추가 시...
  async pushChatpostIdToFolder(user: User, chatpost: Chatpost) {
    const folders = JSON.parse(user.folders);
    folders[0].chatpostIds.unshift(chatpost.chatPostId);
    const newFolders = JSON.stringify(folders);

    user.folders = newFolders;
    await this.usersRepository.save(user);
  }
  // chatpost 서비스에서 chatpost 제거 시...
  async removeChatpostIdFromFolder(user: User, chatpost: Chatpost) {
    const targetId = chatpost.chatPostId;

    const newFolders = JSON.stringify(
      JSON.parse(user.folders).map((folder: IFolder) => {
        folder.chatpostIds = folder.chatpostIds.filter((chatPostId) => {
          return chatPostId !== targetId;
        });
        return folder;
      })
    );

    user.folders = newFolders;
    await this.usersRepository.save(user);

    // 삭제 후, CLI-SERVER 정합성 유지를 위한 반환
    const restructedFolders = await this.restructFoldersForClient(newFolders);

    return restructedFolders;
  }

  // push, remove, overwrite의 처리결과를 client와의 정합성 유지를 위해 restruct 및 반환시켜주는 역할
  async restructFoldersForClient(folders: string) {
    const parsedFolders = JSON.parse(folders); // IFolder[] => IFolderClient[] 구조변형

    // map은 비동기 함수를 관리하지 못하므로 Promise.all을 사용해 비동기 함수 관리함!
    const restructedFolders = await Promise.all(
      parsedFolders.map(async (folder: any) => {
        folder.chatposts = [] as IChatpostBasicInfo[];

        folder.chatposts = await Promise.all(
          folder.chatpostIds.map(async (chatPostId: string) => {
            const { chatpostName } = await this.chatPostsService.findOne(
              chatPostId
            );

            return {
              chatPostId: chatPostId,
              chatpostName,
            } as IChatpostBasicInfo;
          })
        );
        delete folder.chatpostIds;
        return folder;
      })
    );

    return restructedFolders as IFolderForClient[];
  }
}
