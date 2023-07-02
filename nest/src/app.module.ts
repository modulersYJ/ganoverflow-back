import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { ChatbotModule } from "./chatbot/chatbot.module";

import { CommentsModule } from "./comments/comments.module";
import { CategoriesModule } from "./categories/categories.module";
import { FollowsModule } from "./follows/follows.module";
import { StarsModule } from "./stars/stars.module";
import { ChatpostsModule } from "./chatposts/chatposts.module";
import { FavoritecategoriesModule } from "./favoritecategories/favoritecategories.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FoldersModule } from "./folders/folders.module";
import { ChatPairsModule } from "./chat-pairs/chat-pairs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == "dev" ? ".env.dev" : ".env.prod",
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ChatbotModule,
    CommentsModule,
    CategoriesModule,
    FollowsModule,
    StarsModule,
    ChatpostsModule,
    FavoritecategoriesModule,
    FoldersModule,
    ChatPairsModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
