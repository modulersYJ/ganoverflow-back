import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { FoldersService } from "./folders.service";
import { CreateFolderDto } from "./dto/create-folder.dto";
import { UpdateFolderDto } from "./dto/update-folder.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth("jwt")
@ApiTags("folders")
@Controller("folders")
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  create(@Body() createFolderDto: CreateFolderDto, @Req() req) {
    console.log("folder controller - createFolder", createFolderDto);
    if (req.user.id !== createFolderDto.userId) {
      throw new UnauthorizedException("user is not matched");
    }

    return this.foldersService.createFolder(createFolderDto);
  }

  @Get()
  findAll() {
    return this.foldersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.foldersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.update(+id, updateFolderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.foldersService.remove(+id);
  }
}
