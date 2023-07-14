import { Module } from "@nestjs/common";
import { StarsService } from "./stars.service";
import { StarsController } from "./stars.controller";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Star } from "./entities/star.entity";
import { ChatpostsModule } from "src/chatposts/chatposts.module";


@Module({
  imports: [TypeOrmModule.forFeature([Star]), UserModule, ChatpostsModule],
  controllers: [StarsController],
  providers: [StarsService],
})
export class StarsModule {}
