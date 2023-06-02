import { PartialType } from '@nestjs/swagger';
import { CreateCommentlikeDto } from './create-commentlike.dto';

export class UpdateCommentlikeDto extends PartialType(CreateCommentlikeDto) {}
