import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
@Module({
  imports: [TypeOrmModule.forFeature([User])], // User Entity import 확인
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
