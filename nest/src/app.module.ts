import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { ChatbotModule } from "./chatbot/chatbot.module";
import { CommentsModule } from './comments/comments.module';
import { CommentLikeModule } from './comment-like/comment-like.module';
import { FollowModule } from './follow/follow.module';
import { CategoriesModule } from './categories/categories.module';
import { FollowsModule } from './follows/follows.module';
import { StarsModule } from './stars/stars.module';
import { ChatpostsModule } from './chatposts/chatposts.module';
import { CommentlikesModule } from './commentlikes/commentlikes.module';
import { FavoritecategoriesModule } from './favoritecategories/favoritecategories.module';

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
    CommentLikeModule,
    FollowModule,
    CategoriesModule,
    FollowsModule,
    StarsModule,
    ChatpostsModule,
    CommentlikesModule,
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
