import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ChatpostsModule } from "src/chatposts/chatposts.module";
import { StarsModule } from "src/stars/stars.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ChatpostsModule,
    forwardRef(() => StarsModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
