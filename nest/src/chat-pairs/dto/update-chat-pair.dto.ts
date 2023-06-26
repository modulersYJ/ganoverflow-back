import { PartialType } from '@nestjs/swagger';
import { CreateChatPairDto } from './create-chat-pair.dto';

export class UpdateChatPairDto extends PartialType(CreateChatPairDto) {}
