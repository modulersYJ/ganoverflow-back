import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ChatpostsModule } from "src/chatposts/chatposts.module";
import { CommentsModule } from "src/comments/comments.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ChatpostsModule,
    forwardRef(() => CommentsModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
