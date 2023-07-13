import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { StarsService } from "./stars.service";
import { CreateStarDto } from "./dto/create-star.dto";
import { UpdateStarDto } from "./dto/update-star.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/user/user.service";
import { ChatpostsService } from "src/chatposts/chatposts.service";

@ApiTags("stars")
@ApiBearerAuth("jwt")
@Controller("stars")
export class StarsController {
  constructor(
    private readonly starsService: StarsService,
    private readonly userService: UserService,
    private readonly chatpostsService: ChatpostsService
  ) {}

  @Post()
  async create(@Body() createStarDto: CreateStarDto, @Req() req) {
    const user = await this.userService.findOneByUsername(req.user.username);

    const chatPost = await this.chatpostsService.findOne(
      createStarDto.chatPostId
    );

    return this.starsService.likeOrUpdate(createStarDto, chatPost, user);
  }

  @Get()
  findAll() {
    return this.starsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.starsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStarDto: UpdateStarDto) {
    return this.starsService.update(+id, updateStarDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.starsService.remove(+id);
  }
}
