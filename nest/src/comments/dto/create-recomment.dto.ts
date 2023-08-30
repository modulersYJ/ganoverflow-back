import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateReCommentDto {
  @ApiProperty()
  @IsOptional()
  content: string;

  @ApiProperty()
  @IsOptional()
  parent: number;
}
