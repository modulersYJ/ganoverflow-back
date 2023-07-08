import { IsArray, IsInt } from "class-validator";

export class UpdateFolderOrderDto {
  @IsArray()
  @IsInt({ each: true })
  folders: number[];
}
