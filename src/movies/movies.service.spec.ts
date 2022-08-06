import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () => {
    expect(2+2).toEqual(4)
  })
  // it()
  // 테스트 클로저를 생성합니다.
  // it()대신 test()도 사용 가능

  // expect()
  // 값을 테스트할 때마다 expect 함수가 사용됩니다. expect하나만 콜하는 경우는 거의 없을 것입니다.

  // toBe()는 Object.is를 사용하여 정확한 동등성을 테스트합니다. 객체의 값을 확인하려면 대신 toEqual()을 사용하세요.

  // String
  // toMatch를 사용하여 정규 표현식에 대해 문자열을 확인할 수 있습니다.
  // ex) expect('Christoph').toMatch(/stop/);

  // Arrays and iterables
  // toContain()을 사용하여 배열 또는 이터러블에 특정 항목이 포함되어 있는지 확인할 수 있습니다.
  // ex) expect(shoppingList).toContain('milk');

  // Exceptions
  // 특정 함수가 호출될 때 오류가 발생하는지 테스트하려면 toThrow를 사용하십시오.
  // 예외를 발생시키는 함수는 래핑 함수 내에서 호출해야 합니다. 그렇지 않으면 toThrow 어설션이 실패합니다.
  // ex) expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  
});
