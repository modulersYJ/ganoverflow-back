import { ApiProperty } from "@nestjs/swagger";
import { CreateChatPairDto } from "src/chat-pairs/dto/create-chat-pair.dto";

export class CreateChatpostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  chatPair: CreateChatPairDto[];
}
