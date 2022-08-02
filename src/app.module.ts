import { Get, Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/usersService';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService]
})
export class AppModule {

}


// 애플리케이션 루트 모듈