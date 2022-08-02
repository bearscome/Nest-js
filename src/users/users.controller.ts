import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, BadRequestException, Header, Redirect, Query } from '@nestjs/common';
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

// 3.1.6 리디렉션
// 응답 본문에 redirctUrl을 포함시켜 클라이언트가 스스로 패이지를 이동해도 되지만,
// @Redirct 데코레이터를 사용하면 쉽게 구현 가능
// 데코레이터의 두 번째 인자는 상태코드, 301 Moved Permanatly는 요청한 리소스가 헤더에 주어진 리소스로 완전히 이동했다는 뜻.
// 상태코드를 200과 같이 다른 것으로 응답 가능
// 하지만 301, 307, 308과 같이 Redirect로 정해진 응답코드가 아닐 경우 브라우저가 제대로 반응하지 않을 수도 있다.

// 3.1.7 라우트 파라미터
// 라우터 파라미터는 전 예전에 사용했음.
// 1번 유저의 정보를 가져오기 위해 http://localhost:3000/users/1로 요청 받음.
// 여기서 1에 해당하는 부분은 유저 아이디 인데 동적으로 구성됨
// 즉 경로를 구성하는 파라미터가 됨, 전달받은 파라미터는 함수인자에 @Param 데코러이터로 주입 받을 수 있음

// 라우터 파라미터를 받는 방법은 2개가 있음
//  - 먼저 여러개가 전달될 경우 객체로 한번에 받는 방법
//    -> 이 방법은 params의 타입이 any가 되어 권장되지 않음, 물론 라우트 파라미터는 타입이 항상 string이기 때문에 명시적으로 {[key:string]: string} 타입으로 지정해도 됨
//      @Delete(':userId/memo/:memoId')
//      deleteUserMemo(@Param() params: {[key: string]: string}) `userId: ${params.userId}, memoId: ${params.memoId}`
//  - 라우팅 파라미터를 따로 받는 것, REST API를 구성할 때 라우팅 파라미터 개수가 많아지지 않게 설계하는 것이 좋다
//    @Delete('userId//memo/:memoId') 
//    deleteUserMemo(@Param('userId) userId:string, @Param('memoId' memoId:string)) `userId: ${userId}, memoId: ${memoId}`


// 3.1.8 하위 도메인(Sub-Domain) 라우팅
// 서버에서 제공하는 기능을 API를 외부에 공개했다고 가정
// 현재 회사가 사용하고 있는 도메인은 example.com이고 API 요청은 api.example.com으로 받기로 함
// http://example.com || http//api.example.com으로 들어온 요청을 서로 다르게 처리하고 싶음
// 또한, 하위 도메인에서 처리하지 못하는 요청은 원래 도메인에서 처리되도록 하고 싶음
// 이런 경우 하위 도메인 라우팅 기법을 쓸수 있음
// api-controller
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

  @Header('Custom', 'Test Header')
  // 응답 값에 해더 커스톰 가능
  // @Redirect('http://google.com', 301)
  // Redirect('url', status)
  // 요청 처리 결과에 따라 동적으로 리다이렉트 하고자 한다면 응답을 다음 객체와 같이 리턴하면 된다. {"url":string, "statusCode":number}
  
  @Get('redirect/docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDos(@Query('version') version) {
    if(version && version === '5') {
      // users/redirect/docs?version=5₩₩₩₩₩₩₩₩₩₩₩₩₩₩₩
      return {url:'https://docs.nestjs.com/v5/', statusCode:302}
    } 

    return {url:'http://localhost:3000', statusCode:302}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // 만약 요청을 처리하는 도중 에러가 발생했거나 예외를 던져야 한다면?
    // 예를 들어 유저 정보 조회(GET /users/:id) 요청했는데, id는 1부터 시작하는 규직을 가지고 있다고 가정한다.
    // 만약 id가 1보다 작은 값이 전달될 경우 400 Bad Request 예외를 던져야 한다.

    console.log('Header 왜 적용 안돼?')

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
