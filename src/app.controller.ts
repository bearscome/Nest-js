import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// @Controller('app')이 있으면  http://localhost:3000/app/hello 경로로 접근해야함
// prefix는 보통 컨트롤러가 맡은 리소스의 이름을 지정하는 경우가 많다.
// Nest는 라우팅 패스가 지정된 클래스나 함수의 일므은 무엇이 되든 전혀 상관하지 않는다.
// getHello 대신 returnHello라고 해도 된다. 
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // path
  getHello(): string {
    return this.appService.getHello();
  }

  // 와일드카드 사용
  // @Get('he*lo')
  // getHello():string {
  //   return this.appService.getHello();
  // }
  // 위 데코레이터는 helo, hello, he__lo와 같은 경로에서 요청을 받을 수 있다.
  // '*'외에 '?', '+', '()' 문자 역시 정규 표현식에서의 와일드 카드와 동일하게 동작한다.
  // 단 '-', '.'은 문자열로 취급한다. @Get('he.lo')는 hello로 요청할 수 없다.
  // 와일드 카드는 컨트롤러의 패스를 정할 때만 사용하는 것이 아닌 컴포넌트에서 이름을 정할 때 사용할 수 있다.
}

// 단일 경로가 있는 기본 컨트롤러
// -> 컨트롤러는 request, response 역활