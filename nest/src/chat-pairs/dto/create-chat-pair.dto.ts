import { ApiProperty } from "@nestjs/swagger";

export class CreateChatPairDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  isUser: boolean;

  @ApiProperty()
  isChecked: boolean;
}
