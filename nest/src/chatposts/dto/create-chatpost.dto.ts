import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { CreateChatPairDto } from "src/chat-pairs/dto/create-chat-pair.dto";

export class CreateChatpostDto {
  @ApiProperty()
  @IsOptional()
  title: string;

  @ApiProperty({ type: [CreateChatPairDto] })
  @IsOptional()
  chatPair: CreateChatPairDto[];
}
