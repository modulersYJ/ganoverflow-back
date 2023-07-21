import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config"; // env관련 log 출력을 위한 ConfigService 로드!

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ["https://www.ganoverflow.com", "http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      credentials: true,
    },
  });

  app.use(cookieParser()); // 쿠키 파싱을 위한 미들웨어 추가

  // env ConfigService를 참고해, 환경에 따른 분기 로그출력 설정이에요
  const configService = app.get(ConfigService);
  const env = configService.get("NODE_ENV");
  if (env === "production") {
    Logger.log("서버가 프로덕션 환경에서 동작합니다.");
  } else if (env === "development") {
    Logger.log("서버가 개발 환경에서 동작합니다.");
  }

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
    new ValidationPipe({
      whitelist: true, // 데코레이터 안붙어있는거 = DTO에 없는 속성은 pipe를 타지도 않는다.
      forbidNonWhitelisted: true, // pipe를 안탄게 있으면 에러발생. 이상한 프로퍼티 보내면 에러뜸
      transform: true, // 아무렇게나 온 타입을 바꿔줌 ! (ex. string -> number) 미친거 아냐?
    })
  );

  await app.listen(3100);
}
bootstrap();
