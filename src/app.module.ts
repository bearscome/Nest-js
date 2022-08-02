import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ApiController } from './api-controller/api-controller';

@Module({
  imports: [UsersModule],
  controllers: [ApiController, AppController],
  providers: [AppService],
})
export class AppModule {}


// 애플리케이션 루트 모듈