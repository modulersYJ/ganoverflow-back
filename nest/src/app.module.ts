import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { ChatbotModule } from "./chatbot/chatbot.module";
import { ConversationsModule } from "./conversations/conversations.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from "joi";

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
    ConversationsModule,
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
