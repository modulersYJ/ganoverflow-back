import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  chatPostId: number;

  @ApiProperty()
  content: string;
}
