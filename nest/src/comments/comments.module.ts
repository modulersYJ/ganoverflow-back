import { Module, forwardRef } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { Comment } from "./entities/comment.entity";
import { ChatpostsModule } from "src/chatposts/chatposts.module";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    ChatpostsModule,
    forwardRef(() => UserModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
