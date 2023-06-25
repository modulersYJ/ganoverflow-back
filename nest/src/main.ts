import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "@nestjs/common";

import dotenv = require("dotenv");
import path = require("path");
dotenv.config();

// 환경 별 .env 파일 동작 분기
if (process.env.NODE_ENV === "prod") {
  Logger.log("서버가 프로덕션 환경에서 동작합니다.");
  dotenv.config({ path: path.join(__dirname, "../.env.local") });
} else if (process.env.NODE_ENV === "dev") {
  Logger.log("서버가 개발 환경에서 동작합니다.");
  dotenv.config({ path: path.join(__dirname, "../.env.dev") });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        "https://www.ganoverflow.com", // for prod
        "http://localhost:3000", // for dev : 이경우 vercel배포된 클라이언트로는 https보장 안돼서 불가!, local next와 통신 가능
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    },
  });

  // console.log("주입된 환경 변수: " + process.env.DB_HOST);
  // console.log("주입된 환경 변수: " + process.env.DB_PORT);
  // console.log("주입된 환경 변수: " + process.env.DB_USERNAME);
  // console.log("주입된 환경 변수: " + process.env.DB_PASSWORD);

  // swagger UI 위한 설정
  const config = new DocumentBuilder()
    .setTitle("Swagger UI - GanOverflow")
    .setDescription("Swagger UI of GanOverflow Backend (NestJS)")
    .setVersion("1.0.0")
    .addTag("swagger")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token",
        in: "headers",
      },
      "jwt"
    )
    .build();
  // config 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, config);
  //  SwaggerUI path 연결 (= .setup('swagger ui endpoint', app, swagger_document) )
  SwaggerModule.setup("swagger-ui", app, document);

  // pipes = 컨트롤러로 들어오기 전에 처리하는 미들웨어
  app.useGlobalPipes(
    // 미들웨어랑 똑같다!
    new ValidationPipe({
      // 밸리데이션 미들웨어!
      whitelist: true, // 데코레이터 안붙어있는거 = DTO에 없는 속성은 pipe를 타지도 않는다.
      forbidNonWhitelisted: true, // pipe를 안탄게 있으면 에러발생. 이상한 프로퍼티 보내면 에러뜸
      transform: true, // 아무렇게나 온 타입을 바꿔줌 ! (ex. string -> number) 미친거 아냐?
    })
  );

  await app.listen(3100);
}
bootstrap();
