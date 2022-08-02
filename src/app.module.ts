import { Get, Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: []
})
export class AppModule {

}


// 애플리케이션 루트 모듈