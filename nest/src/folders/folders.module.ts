import { Module, forwardRef } from "@nestjs/common";
import { FoldersService } from "./folders.service";
import { FoldersController } from "./folders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Folder } from "./entities/folder.entity";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), forwardRef(() => UserModule)],
  controllers: [FoldersController],
  providers: [FoldersService],
  exports: [FoldersService],
})
export class FoldersModule {}
