import { Module, forwardRef } from "@nestjs/common";
import { ChatpostsService } from "./chatposts.service";
import { ChatpostsController } from "./chatposts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chatpost } from "./entities/chatpost.entity";
import { ChatPairsModule } from "src/chat-pairs/chat-pairs.module";
import { User } from "src/user/entities/user.entity";
import { UserModule } from "src/user/user.module";
import { CommentsModule } from "src/comments/comments.module";
import { FoldersModule } from "src/folders/folders.module";
import { CategoriesModule } from "src/categories/categories.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([Chatpost, User]),
    ChatPairsModule,
    UserModule,
    FoldersModule,
    CategoriesModule,
    forwardRef(() => UserModule),
  ],
  controllers: [ChatpostsController],
  providers: [ChatpostsService],
  exports: [ChatpostsService],
})
export class ChatpostsModule {}
