import { ApiProperty } from "@nestjs/swagger";
import { CreateChatPairDto } from "src/chat-pairs/dto/create-chat-pair.dto";

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
