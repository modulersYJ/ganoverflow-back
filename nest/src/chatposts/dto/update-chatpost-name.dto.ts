import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Chatpost } from "../entities/chatpost.entity";
import { User } from "src/user/entities/user.entity";
import { IFolder } from "src/user/entities/IFolders";

export class UpdateChatpostNameDto {
  @ApiProperty()
  @IsOptional()
  chatpostName: Chatpost["chatpostName"];

  @IsNotEmpty()
  userId: User["id"];

  @IsNotEmpty()
  folderId: IFolder["folderId"];
}
