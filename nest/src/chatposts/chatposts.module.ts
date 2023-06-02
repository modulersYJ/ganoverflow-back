import { Module } from '@nestjs/common';
import { ChatpostsService } from './chatposts.service';
import { ChatpostsController } from './chatposts.controller';

@Module({
  controllers: [ChatpostsController],
  providers: [ChatpostsService]
})
export class ChatpostsModule {}
