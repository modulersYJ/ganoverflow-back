import { Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { InjectEntityManager, TypeOrmModule } from "@nestjs/typeorm";
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
import { ChatPairsModule } from "./chat-pairs/chat-pairs.module";
import { EntityManager } from "typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV == "development"
          ? ".env.development"
          : ".env.production",
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        logging: ["query", "error"],
      }),
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
    ChatPairsModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
// export class AppModule {}
export class AppModule implements OnModuleInit {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager
  ) {}

  async onModuleInit() {
    await this.entityManager.query(`
    DROP VIEW IF EXISTS CategoryTopTags;

    CREATE OR REPLACE VIEW CategoryTopTags AS
    SELECT ROW_NUMBER() OVER (ORDER BY "categoryName") AS id, "categoryName", tag, frequency
    FROM (
        SELECT
            c."categoryName",
            unnest(string_to_array(cp.tags, ',')) as tag,
            COUNT(*) as frequency,
            ROW_NUMBER() OVER (PARTITION BY c."categoryName" ORDER BY COUNT(*) DESC) as rn      
        FROM Chatpost cp
        JOIN Category c ON cp."categoryCategoryName" = c."categoryName"
        GROUP BY c."categoryName", tag
    ) t
    WHERE rn <= 5;
    `);
  }
}
