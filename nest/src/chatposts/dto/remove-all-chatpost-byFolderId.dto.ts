import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { IFolder } from "src/user/entities/IFolders";

export class RemoveAllByFolderIdDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: User["id"];

  @ApiProperty()
  @IsNotEmpty()
  folderId: IFolder["folderId"];
}
