import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


// 핵심기능 nestFactory을 사용하여 애플리케이션 인스턴스를 생성하는 애플리케이션의 항목 파일

// Http 통신 설정 파일 (기초되는 파일)