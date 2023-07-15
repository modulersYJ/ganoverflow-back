import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateStarDto {
  @ApiProperty()
  @IsOptional()
  chatPostId: string;

  @ApiProperty()
  @IsOptional()
  like: -1 | 0 | 1;
}
