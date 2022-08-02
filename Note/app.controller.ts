import { Request } from 'express';
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// @Controller('app')이 있으면  http://localhost:3000/app/hello 경로로 접근해야함
// prefix는 보통 컨트롤러가 맡은 리소스의 이름을 지정하는 경우가 많다.
// Nest는 라우팅 패스가 지정된 클래스나 함수의 일므은 무엇이 되든 전혀 상관하지 않는다.
// getHello 대신 returnHello라고 해도 된다. 
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 와일드카드 사용
  // 라우팅 패스는 와일드카드를 이용하여 작성할 수 있습니다. 예를 들어 별표(*) 문자를 사용하면 문자열 가운데 어떤 문자가 와도 상관없이 라우팅 패스를 구성하겠다는 뜻 입니다.
  // @Get('he*lo')
  // getHello():string {
  //   return this.appService.getHello();
  // }
  // 위 데코레이터는 helo, hello, he__lo와 같은 경로에서 요청을 받을 수 있다.
  // '*'외에 '?', '+', '()' 문자 역시 정규 표현식에서의 와일드 카드와 동일하게 동작한다.
  // 단 '-', '.'은 문자열로 취급한다. @Get('he.lo')는 hello로 요청할 수 없다.
  // 와일드 카드는 컨트롤러의 패스를 정할 때만 사용하는 것이 아닌 컴포넌트에서 이름을 정할 때 사용할 수 있다.


  // 요청 객체
  // 클라이언트는 어떤 요청을 보내면서 종ㅈ오 서버가 원하는 정보를 함께 전송한다.
  // Nest는 요청과 함께 전달되는 데이터를 핸들러(요청을 처리할 구성요소, 컨트롤)가 다룰 수 있는 객체로 변환한다.
  // 이렇게 변환된 객체는 @Req() 데코레이터를 이용하여 다룰 수 있다.
  @Get() // path
  getHello(@Req() req:Request): string {
    console.log('REQ 입니까?',req);
    return this.appService.getHello();
  }
  // 요청 객체는 HTTP 요청이다.
  //  - 쿼리스트링, 파라미터, 헤더와 본문 외 많은 정보를 가지고 있다. Express 문서 참고
  //  - API를 작성할 때 요청 객체를 직접 다루는 경우는 드물다.
  //  - Nest는 @Query(), @param(key?: stirng), @Body 데코레이터를 이용해서 요청에 폼함된 쿼리 파라미터, 패스 파라미터, 본문을 쉽게 받을 수 있도록 해준다

  
  // @Get() // path
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}

// 단일 경로가 있는 기본 컨트롤러
// -> 컨트롤러는 request, response 역활