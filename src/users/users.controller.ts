import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import {UsersService} from './usersService'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService:UsersService) {
    
  }

  
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    console.log(userId);
    return;
  }

  @Get() 
  rootGet() {
    console.log('왜 리다이렉션 안하고 일로 와??')
    return '왜 리다이렉션 안하고 일로 와??'
  }

  @Delete(':id')
  remove(@Param('id') id:string) {
    return this.usersService.remove(+id);
  }
}