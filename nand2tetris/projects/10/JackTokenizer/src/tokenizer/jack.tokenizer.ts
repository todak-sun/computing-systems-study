import { KeywordType, TokenType } from './constants';

export class JackTokenizer {
  // TODO: 생성자에 입력 파일 또는 스트림 받을 것.
  constructor() {}

  /**
   *
   * @returns
   * @description 입력에 토큰이 더 남았나?
   */
  hasMoreTokens(): boolean {
    return true; //TODO
  }

  /**
   * @description 입력에서 다음 토큰을 받아 현재 토큰을 만든다.
   *              이 메서드는 hasMoreTokens()가 참일 때만 호출된다.
   *              초기에는 현재 토큰은 설정되지 않는다.
   */
  advance(): void {}

  /**
   * @description 현재 토큰의 종류를 반환한다.
   */
  tokenType(): TokenType {
    return null;
  }

  /**
   *  @description 현재 토큰의 키워드를 반환한다.
   *               tokenType()이 KEYWORD일 때만 호출되어야 한다.
   */
  keyword(): KeywordType {
    return null;
  }

  /**
   * @description 현재 토큰의 문자를 반환한다. tokenType()이 SYMBOL일 때만 호출되어야 한다.
   */
  symbol(): string {
    return null;
  }

  /**
   * @description 현재 토큰의 식별자를 반환한다. tokenType()이 IDENTIFIER일 때만 호출되어야 한다.
   */
  identifier(): string {
    return null;
  }

  /**
   * @description 현재 토큰의 정수 값을 반환한다. tokenType()이 INT_CONST 일 때만 호출되어야 한다.
   */
  intVal(): number {
    return null;
  }

  /**
   * @description 현재 토큰의 문자열 값을, 따옴표 없는 상태로 반환한다. tokenType() 이 STRING_CONST일 때만 호출되어야 한다.
   */
  stringVal(): string {
    return null;
  }
}
