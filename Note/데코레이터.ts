
// 1. 데코레이터

import { BadRequestException } from "@nestjs/common";

// 타입스크립트의 데코레이터는 파이썬의 데코레이터나 자바의 어노테이션과 유사한 기능이다
// 클래스, 메서드, 접근자, 프로퍼티, 매개변수에 적용 가능하다.
// 각 요소의 선언부 앞에 @로 시작하는 데코레엍를 선언하면 데코레이터로 구현된 코드를 함께 실행한다.

`class CreateUserDto {
    @IsEmail()
    @kMaxLength(69)
    readonly email:string;

    @isString()
    @Matches((/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string
}`

// 사용자는 얼마든지 요청을 잘못 보낼 수 있기 때문에 데코레이터를 이용하여 애플리케이션이 허용하는 값으로 제대로 요청을 보냈는지 검사하고 있습니다.
// @email은 이메일 형식을 가진 문자열이여야하고, 그 길이는 최대 60자 이어여 합니다.`

function deco(target:any, propertyKey:string, descriptor:PropertyDescriptor) {
    console.log('데코레이터가 평가됨');
};

class TestClass {
    @deco
    test() {
        console.log("함수 호출")
    }
}

const t = new TestClass();
t.test();
// 데코레이터 평가 -> 함수 호출 순으로 실행

// 만약 데코레이터에 인자를 넘겨서 데코레이터의 ㄷ오작을 변경하고 싶다면,
// 데코레이터 팩토리에 리턴하는 함수를 만들면 된다

function deco2(value: string) {
    console.log('데코레이션 평가 시작');
    return function (target:any, propertyKey:string, descriptor:PropertyDescriptor) {
        console.log(value);
    };
};

class TestCalss2 {
    @deco2("Hello")
    test() {
        console.log("함수 호출")
    }
};
// 데코레이션 평가 시작 -> Hello -> 함수 호출 순으로 실행


// 2. 데코레이터 합성
// 만약 여러개의 데코레이터를 사용한다면 
`
@f
@g
test
여러 데코레이털르 사용할 때 다음 단까 수행됩니다.
 - 위에서 아래로 평가
 - 아래에서 위로 함수 호출
`
function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("first(): called");
    };
  }
  
  function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("second(): called");
    };
  }

class ExampleClasses {
    @first()
    @second()
    method() {
        console.log('method is called');
    }
}
// 아래 순으로 호출
// first(): factory evaluated
// second(): factory evaluated
// second(): called
// first(): called
// method is called



// 타입 스크립트가 지원하는 5가지 데코레이터
// 1. 클래스 데코레이터 (Class Decorator)
// 클래스 앞에 선언, 클래스 데코레이터는 클래스의 생성자에 적용되어 클래스 정의를 읽거나 수정할 수 있다.
// 선언파일과 선언 클래스(declare class) 내에서는 사용할 수 없다
function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      reportingURL = "http://www.example.com";
    };
  }

@reportableClassDecorator
class BugReport {
    type = "report";
    title: string;

    constructor(t:string) {
        this.title = t;
    }
};

const bug = new BugReport('Needs dark mode');
console.log(bug);
// (new (...arg:any[]): {}). 제네릭 타입 T를 가지는 생성자를 팩토리 메서스의 인자로 전달함
// 클래스 데코레이터는 생성자를 리턴하는 함수여야함
// 클래스 데코레이터가 적용되는 클래스에 새로운 reportingURL이라는 새로운 속성을 추가
// {type:"report", title:'Need darkMode', reportingURL: 'http//www.example.com'}


// 2. 메서드 데코레이터
// 메서드 데코레이턴느 메서드 바로 앞에 선언된다. 메소드의 속성 디스크립터에 적용되고 메서드의 정의를 읽거나 수정할 수 있다.
// 선언파일, 오버로드 메서드, 선언 클래스에 사용할 수 없다.

// 앞서 deco 메서드 데코레이터에서 보았던 것처럼 메서드 데코레이터는 다음 세개의 인수를 가진다.
// target: 정적 맴버가 속한 클래스의 생성자 함수이거나 인스턴스 맴벙 ㅔ대한 클래스의 프로토 타입
// propertyKey: 맴버의 이름
// descriptor: 맴버의 속성 디스크립터. PropertyDescriptor

function HandleError() {
    return function(target:any, propertyKey:string, descriptor: PropertyDescriptor) {
        // interface PropertyDescriptor {
        //     configurable?: boolean;  // 속성의 정의를 수정할 수 있는지 여부
        //     enumerable?: boolean;    // 열거형인지 여부
        //     value?: any;             // 속성 값
        //     writable?: boolean;      // 수정 가능 여부
        //     get?(): any;             // getter
        //     set?(v: any): void;      // setter
        //   }

        console.log({
            target, propertyKey, descriptor
        });

        // tartget: 출력결과는 {constructor: ƒ, greet: ƒ} 입니다. 데코레이터가 선언된 메서드 hello가 속해있는 클래스의 생성자와 프로토타입을 가지는 객체임을 알 수 있습니다.
        // propertyKey: 함수이름 hello가 출력됩니다.
        // descriptor: hello 함수가 처음 가지고 있던 디스크립터가 출력됩니다. 출력결과는 {value: ƒ, writable: true, enumerable: false, configurable: true} 입니다.



        const method = descriptor.value;
        descriptor.value = function() {
            try{
                method();
            } catch(err) {
                console.log(err);
            };
        };
    };
};

class Greeter {
    @HandleError()
    hello() {
        throw new Error('테스트 에러');
    }
};

const t3 = new Greeter();
t3.hello();



// 접근자 데코레이터
// 접근자 데코레이터는 접근자 바로 앞에 선언, 접근자의 속성 디스크립터에 적용되고 접근자의 정의를 읽거나 수정할 수 있음
// 선언파일, 선언클래스에 사용할 수 없음, 접근자 데코레이터가 반환하는 값은 해당 맴버의 디스크립터임

function Enumerable(enumerable: boolean) {
    return function (target:any, propertyKey:string, descriptor:PropertyDescriptor) {
        descriptor.enumerable = enumerable;
    }
}

class Person {
    constructor(private name:string) {

    };

    @Enumerable(true)
    get getName() {
        return this.name;
    }

    @Enumerable(false)
    set setName(name:string) {
        this.name = name;
    }
}

const person = new Person("Dexter");
for(let key in person) {
    console.log(`${key} ${person[key]}`)
}
// 디스크립터의 enumerable 속성을 데코레이터의 인자로 결정합니다.
// name은 외부에서 접근하지 못하는 private 멤버입니다.
// 게터 getName 함수는 열거가 가능하도록 합니다.
// 세터 setName 함수는 열거가 불가능하도록 합니다.
// 결과를 출력하면 getName은 출력되지만 setName은 열거하지 못하게 되었기 때문에 for문에서 key로 받을 수가 없습니다.
// name: Dexter
// getName: Dexter



// 3. 속성 데코레이터
// 속성 데코레이터는 클래스의 속성 바로 앞에 선언됩니다. 선언 파일, 선언 클래스에서 사용하지 못합니다.
// 속성 데코레이터는 다음 두 개의 인수를 가지는 함수입니다.
//  - 정적 맴버가 속한 클랴스의 생성자 함수이거나 인ㅅ그턴스 맴버에 대한 클래스의 프로토 타입.
//  - 맴버의 이름
// 메서드 데코레이터나 접근자 데코레이터와 비교했을 때 세 번째 인자인 속성 디스크립터가 존재하지 않습니다.
// 공식 문서에 따르면 반환값도 무시되고, 이는 현재 프로토타입의 맴버를 정의할 때 인스턴스 속성을 설명하는 매커니즘이 없고,
// 속성의 초기화 과정을 관찰하거나 수정할 수 있는 방법이 없기 때문입니다.

function format(formatString: string) {
    return function(target:any, propertyKey:string):any {
        let value = target[propertyKey];

        function getter() {
            return `${formatString} ${value}`;
        };

        function setter(newVal:string) {
            value = newVal;
        };

        return {
            get:getter,
            set:setter,
            enumerable:true,
            configurable:true
        };
    };
};

class Greeter2 {
    @format('Hello')
    greeting:string;
};

const ttt = new Greeter2();
ttt.greeting = 'World';
console.log(ttt.greeting);

// 게터에서 데코레이터 인자로 들어온 formatString을 원래의 속성과 조합한 스트링으로 바꿉니다.
// 데코레이터에 formatString을 전달합니다.
// 속성을 읽을 때 게터가 호출되면서 Hello World가 출력됩니다.


// 4. 매개변수 데코레이터
// 생성자 또는 메서드의 파라미터에 선언되어 적용
// 선언 파일, 선언 클래스에서 사용 불가
// 매개변수 데코레이터는 호출 될 때 3가지의 인자와 함께 호출
//  - 정적 맴버가 속한 클래스의 생성자 함수이거나 인스턴스 맴버에 대한 클래스의 프로토타입
//  - 맴버의 이름
//  - 매개변수가 함수에서 몇 번째 위치에 선언되었는 지를 나타내는 인덱스
// 파라미터가 제대로 된 값으로 전달되었는지 검사하는 데코레이터, 매개변수 데코레이터는 단독으로 사용하는 것보다 함수 데코레이터와 함께 사용하는게 좋음
// NestJS에서 API 요청 파라미터에 대해 유효성 검사를 할 때 이와 같은 데코레이터를 많이 사용합니다.

function MinLength(min:number) {
    return function(tartget:any, propertyKey:string, paramsterIndex:number) {
        tartget.validator = {
            minLength:function(args: string[]) {
                return args[paramsterIndex].length > min;
            }
        };
    };
};

function Validate(target:any, propertyKey:string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function(...args) {
        Object.keys(target.validators).forEach(key => {
            if(!target.validators[key](args)) {
                throw new BadRequestException();
            }
        })
        method.apply(this, args);
    };
};


class USer {
    private name: string;

    @Validate
    setName(@MinLength(3) name:string) {
        this.name = name;
    };
}

const tttt = new USer();
tttt.setName('dexter');
console.log('-------------');
tttt.setName('de');

////////\

// 데코레이터	역할	호출시 전달되는 인자	선언 불가능한 위치
// 클래스 데코레이터	클래스의 정의를 읽거나 수정	(constructor)	d.ts 파일, declare 클래스
// 메서드 데코레이터	메서드의 정의를 읽거나 수정	(target, propertyKey, propertyDescriptor)	d.ts 파일, declare 클래스, 오버로드 메서드
// 접근자 데코레이터	접근자의 정의를 읽거나 수정	(target, propertyKey, propertyDescriptor)	d.ts 파일, declare 클래스
// 속성 데코레이터	속성의 정의를 읽음	(target, propertyKey)	d.ts 파일, declare 클래스
// 매개변수 데코레이터	매개변수의 정의를 읽음	(target, propertyKey, parameterIndex)	d.ts 파일, declare 클래스




