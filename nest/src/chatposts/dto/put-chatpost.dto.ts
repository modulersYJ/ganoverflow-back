import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { CreateChatpostDto } from "./create-chatpost.dto";

export class PutChatpostDto extends CreateChatpostDto {
  @ApiProperty()
  @IsOptional()
  folderId: number;
}
