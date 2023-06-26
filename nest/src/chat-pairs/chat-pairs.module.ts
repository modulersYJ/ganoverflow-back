import { Module } from "@nestjs/common";
import { ChatPairsService } from "./chat-pairs.service";
import { ChatPairsController } from "./chat-pairs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatPair } from "./entities/chat-pair.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChatPair])],
  controllers: [ChatPairsController],
  providers: [ChatPairsService],
  exports: [ChatPairsService],
})
export class ChatPairsModule {}
