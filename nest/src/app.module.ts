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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "118.67.134.211",
      port: 5432,
      username: "modulers",
      password: "inssafood",
      database: "ganoverflow",
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
