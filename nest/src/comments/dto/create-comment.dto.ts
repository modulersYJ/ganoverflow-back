import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateCommentDto {
  @ApiProperty()
  @IsOptional()
  content: string;
}
