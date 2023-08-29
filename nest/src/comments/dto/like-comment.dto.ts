import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class LikeCommentDto {
  @ApiProperty()
  @IsOptional()
  didLike: boolean;
}
