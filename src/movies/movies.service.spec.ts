import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

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

  // jest 값 비교
  // toBe: 정확한 값 일치 여부 확인
  // toEqual: 객체(object)의 값 일치 여부 확인
  // not: 불일치 여부 확인
  // toBeNull: null 여부 만 확인
  // toBeUndefined: undefined 여부 만 확인
  // toBeTruthy: true로 취급되는 구문을 확인
  // toBeGreaterThan: 큰 숫자 여부 확인
  // toBeGreaterThanOrEqual: 같거나 큰 숫자 여부 확인
  // toBeLessThan: 작은 숫자 여부 확인
  // toBeInstanceOf: toBeInstanceOf(Class) 를 사용 하여 객체가 클래스의 인스턴스인지 확인하십시오. 이 매처는 아래 instanceof 를 사용 합니다 .



  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe("getOne", () => {
    it("should return a moive", () => {
      service.create({
        title:"Test Movie",
        geners:["Test"],
        year:2000
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })

    it("should throw 404 err", () => {
      try {
        service.getOne(999)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual('movie is not Found 999')
      }
    })
  });

  describe('deleteOne', () => {
    it('delete a moive', () => {
      service.create({
        title:"Test Movie",
        geners:["Test"],
        year:2000
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    })

    it("should throw 404 err", () => {
      try {
        service.deleteOne(999)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  });

  describe("create", () => {
    it("should create a moive", () => {
      const beforeCreate = service.getAll().length
      service.create({
        title:"Test Movie",
        geners:["Test"],
        year:2000
      });
      const afterCreate = service.getAll().length;
      console.log({beforeCreate, afterCreate})
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  describe('update', () => {
    it("should update movie", () => {
      service.create({
        title:"Test Movie",
        geners:["Test"],
        year:2000
      });

      service.update(1, {title:"Updated Test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it("should throw a NotFoundException", () => {
      try {
        service.update(999, {})
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })
  });

  // describe: 설명하다 
  // expect: 예상하다
});
