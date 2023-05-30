import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger UI 위한 설정
  const config = new DocumentBuilder()
    .setTitle('Swagger UI - GanOverflow')
    .setDescription('Swagger UI of GanOverflow Backend (NestJS)')
    .setVersion('1.0.0')
    .addTag('swagger')
    .build();

  // config 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, config);

  //  SwaggerUI path 연결 (= .setup('swagger ui endpoint', app, swagger_document) )
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(3000);
}
bootstrap();
