import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';


// Users 리소스에 대한 CRUD 요청 결과
`경로	http method	응답 상태 코드	body
/users	POST	201	This action adds a new user
/users	GET	200	This action returns all users
/users/1	GET	200	This action returns a #1 user
/users/1	PATCH	200	This action updates a #1 user
/users/1	DELETE	200	This action removes a #1 user`
// CLI로 자동 생성된 update는 PATCH 메서드를 사용하고 있습니다.
// http 메서드에서는 업데이트 동작을 기술하는 메서드가 2가지 있습니다.
// PUT은 리소스 전체를 교체할 때 쓰고, PATCH는 리소스의 일부를 업데이트 할 때 사용합니다.
// 하지만 실제 구현시에는 이를 엄격하게 지키지 않고 PUT을 보통 사용하지만, 만약 PATCH가 사용됐다면 이같은 뜻을 가진다고 생각하면 됩니다.


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Res() res) {
    const users = this.usersService.findAll()
    
    return this.usersService.findAll();

    // [
    // 각 요청의 성공 응답 코드는 POST일 경우에만 201이고, 나머지는 200이다.
    // 또한 응답 본문은 스트링 값을 가지고 있는데 이는 UsersController의 각 메서드가 리턴하는 값이다.
    // Nest는 응답을 어떤 방식으로 처리할 지 미리 정의해 두었습니다.
    // string, number, boolean과 같은 자바스크립트 원시 타입을 리턴할 경우 직렬화 없이 바로 보내지만,
    // 객체를 리턴한다면 직렬화를 통해 JSON으로 자동 변환해 줍니다.
    // 이 방법이 권장하는 방법이지만 라이브러리별 응답 객체를 직접 다룰 수도 있습니다.
    // 예를 들어 Express response object를 @Res 데코레이터를 이용하여 다룰 수 있습니다.


    // return res.status(200).send({name:'hi'})
    // ]
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // 만약 요청을 처리하는 도중 에러가 발생했거나 예외를 던져야 한다면?
    // 예를 들어 유저 정보 조회(GET /users/:id) 요청했는데, id는 1부터 시작하는 규직을 가지고 있다고 가정한다.
    // 만약 id가 1보다 작은 값이 전달될 경우 400 Bad Request 예외를 던져야 한다.

    if(+id < 1) {
      throw new BadRequestException('id는 0보다 큰 값이여야 합니다')
    }

    return this.usersService.findOne(+id);

  }

  @HttpCode(202)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // 앞서 Nest는 CRUD에 대해 성긍 응답으로 POST:201, 그외는 200을 가진다고 했다.
    // 먼역 이 상태코드를 다른 값으로 바꾸길 원한다면, 어떻게 해야하는가?
    // Nest는 이를 손쉽게 적용할 수 있는 또다른 데코레이터 @HttpCode를 마련했다.
    // @HttpCode(202)
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
