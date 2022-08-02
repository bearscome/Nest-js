import { Controller, Get, HostParam } from '@nestjs/common';

// 앞서 우리는 요청패스를 @Param 데코레이터로 받아 동적으로 처리할 수 있습니다.
// 유사하게 @HostParam 데코레이터를 이용하면 서브도메인을 변수로 받을 수 있습니다.
// API 버저닝을 하는 방법이 여러가지 있지만 하위 도메인을 이용하는 방법을 많이 사용합니다.
// 다음과 같이 하위 도메인 라우팅으로 쉽게 API 버전별로 분리할 수 있습니다.

@Controller({host: ':hi.api.localhost'}) // 하위 도메인 요청 처리 설정
export class ApiController {
    // 앞서 우리는 요청 패스를 @Param 데코레이터로 받아 동적으로 처리할 수 있었음
    // 유사하게 @HostParam 데코레이터를 이용하면 서브 도메인을 변수로 받을 수 있다.
    // API 버저닝을 하는 ㅂ아법이 여러가지 있지만 하위 도메인을 이용하는 방법을 많이 사용한다.
    // 다음고 ㅏ같이 하위 도메인 라우팅으로 쉽게 API를 버전별로 분리할 수 있다.
    @Get() // 같은 루트 경로
    index(@HostParam('hi') version: string): string{
        console.warn(version)
        return `Hello, API ${version}`; // 다른 응답
    }
}
