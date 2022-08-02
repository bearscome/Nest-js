import { Controller, Get, Header, HttpCode, Post, Query, Redirect, Req, Param, HostParam, Body } from "@nestjs/common";
import { create } from "domain";
import { Observable } from "rxjs";
import { CreateCatDto } from "./create-cat.dto_single";

// @Controller("cats")
// export class CatsController {
//     @Post() // Post
//     @HttpCode(201) // 상태코드
//     @Header("Cache-Control", 'none') // 사용자 정의 응답 헤더를 지정하려면 @Header() 데코레이션 또는 라이브러리별 응답 객체를 사용하고 res,header() 직접 호출 가능
//     create(): string {
//         return "This aciton adds a new cat"
//     }

//     @Get() // 라우팅
//     @Redirect('https://google.com', 301) // 리다이렉션
//     // @Redirect는 url, status 코드 반환 -> 둘다 생략가능 -> "", 302 기본 값
//     // URL을 동적으로 결정해야 할 때는 객체로 반환하여 작업
//     // {"url":string, "statusCode": number}
//     @Get("docs")
//     @Redirect("https://google.com'", 302)
//     getDocs(@Query('version') version) {
//         // @Redicret() 데코레이션에 전달된 모든 인수를 재정의함
//         if(version && version === '5') {
//             return {url:"https://google.com'/v5"};
//         }
//     }

//     findAll(@Req() request:Request):string {
//         // findAll은 nest에 http 요청에 대한 특정 끝점에 대한 핸드러를 생성하도록 지시
//         return "This action returns all cats";
//     }
    
//     //경로 매개변수
//     //  정적경로가 사용 불가하기 때문에  id를 참조해야한다 Get /cats/1 
//     @Get(':id')
//     findOne(@Param() params):string {
//         console.log(params.id);
//         return `This action retunrs a#${params.id} cat`
//     }
// }


// /** 요청 객체 Json option
//     @Request(), @Req()	req
//     @Response(), @Res()*	res
//     @Next()	next
//     @Session()	req.session
//     @Param(key?: string)	req.params/req.params[key]
//     @Body(key?: string)	req.body/req.body[key]
//     @Query(key?: string)	req.query/req.query[key]
//     @Headers(name?: string)	req.headers/req.headers[name]
//     @Ip()	req.ip
//     @HostParam()	req.hosts
//  */

// /**
//  * nest는 HTTP 메소드에 대한 데코레이션 제공
//  * @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options()및 @Head(). 또한 @All()
//  * 
//  * 라우팅 와일드 카드
//  * @Get('ab*cd') -> abcd, ab_cd 등과 일치, ['-', '.']은 문자열 그대로 읽음
//  */







// // 하위 도메인 라우터
// // HTTP 호스트가 특정 값과 일치하도록 요규허눈 옵션을 사용할 수 있습니다.
// // hosts 옵션은 토큰을 사용하여 호스트의 해당 위치에서 동적 값을 캡처 할 수 없다.
// // @Controller() route와 동일하게 id를 사용하여 가능 ?
// @Controller({host:"admin.example.com"})
// export class AdminController{
//     @Get()
//     index(@HostParam('acoount') account:string) {
//         return  account;
//     }
// }

// // 비동기
// @Get()
// async findAll():Promise<any[]>{
//     return [];
// };

// async findAll2():Observable<any[]>{
//   // Rx JS관찰 기능 스트립을 반환하여 더 강력함 nest는 자동으로 아래 소스를 구독하고 마지막으로 방출된 값을 취한다.(스트림이 완료돠면)
//     return [];
// };


// @Post()
// async create(@Body() createCatDto: CreateCatDto) {
//     return 'This action adds a new cat';
// }