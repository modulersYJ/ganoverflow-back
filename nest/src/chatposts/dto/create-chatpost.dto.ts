import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { CreateChatPairDto } from "src/chat-pairs/dto/create-chat-pair.dto";

export class CreateChatpostDto {
  @ApiProperty()
  @IsOptional()
  chatpostName: string;

  @ApiProperty({ type: [CreateChatPairDto] })
  @IsOptional()
  chatPair: CreateChatPairDto[];

  @ApiProperty()
  @IsOptional()
  categoryName: string;

  @ApiProperty()
  @IsOptional()
  tags: string[];
}
