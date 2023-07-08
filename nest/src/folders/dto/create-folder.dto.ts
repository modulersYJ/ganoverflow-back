import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { CreateChatpostDto } from "src/chatposts/dto/create-chatpost.dto";

export class CreateFolderDto {
  @ApiProperty()
  folderName: string;

  @ApiProperty()
  userId: string;
}
