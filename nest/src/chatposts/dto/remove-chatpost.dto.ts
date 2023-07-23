import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class RemoveChatpostDto {
  @ApiProperty()
  @IsOptional()
  userId: string;
}
