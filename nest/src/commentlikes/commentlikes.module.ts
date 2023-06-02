import { Module } from '@nestjs/common';
import { CommentlikesService } from './commentlikes.service';
import { CommentlikesController } from './commentlikes.controller';

@Module({
  controllers: [CommentlikesController],
  providers: [CommentlikesService]
})
export class CommentlikesModule {}
