import { Module } from "@nestjs/common";
import { ChatpostsService } from "./chatposts.service";
import { ChatpostsController } from "./chatposts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chatpost } from "./entities/chatpost.entity";
import { ChatPairsModule } from "src/chat-pairs/chat-pairs.module";
import { UserModule } from "src/user/user.module";
import { CommentsModule } from "src/comments/comments.module";
import { FoldersModule } from "src/folders/folders.module";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chatpost]),
    ChatPairsModule,
    UserModule,
    FoldersModule,
    CategoriesModule,
  ],
  controllers: [ChatpostsController],
  providers: [ChatpostsService],
  exports: [ChatpostsService],
})
export class ChatpostsModule {}
