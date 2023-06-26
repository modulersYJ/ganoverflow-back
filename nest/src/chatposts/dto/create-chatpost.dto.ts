import { ApiProperty } from "@nestjs/swagger";

export class CreateChatpostDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  isUser: boolean;

  @ApiProperty()
  isChecked: boolean;
}
