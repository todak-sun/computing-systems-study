import { KeywordType, KeywordTypes, SymbolTypes, TokenType } from './token.constants';

export class JackTokenizer {
  private readonly tokens: string[];
  private currentToken: string;

  constructor(jackFileSourceCode: string) {
    this.tokens = this.preprocessSourceCode(jackFileSourceCode);
    console.log(this.tokens);
  }

  private preprocessSourceCode(sourceCode: string): string[] {
    return sourceCode
      .split('\r\n')
      .map((line) => line.replace(/\t/gi, ''))
      .filter((line) => !line.startsWith('//')) // //로 시작하는 주석 삭제
      .filter((line) => !(line.startsWith('/*') && line.endsWith('*/'))) // /** */ 형태의 주석 삭제
      .filter((line) => line) // 빈 줄 삭제;
      .filter((line) => line)
      .map((line) => line.replace(/\(|\)|\;|\./gi, (s) => ` ${s} `))
      .flat();
  }

  /**
   *
   * @returns
   * @description 입력에 토큰이 더 남았나?
   */
  hasMoreTokens(): boolean {
    return !!this.tokens.length;
  }

  /**
   * @description 입력에서 다음 토큰을 받아 현재 토큰을 만든다.
   *              이 메서드는 hasMoreTokens()가 참일 때만 호출된다.
   *              초기에는 현재 토큰은 설정되지 않는다.
   */
  advance(): void {
    this.currentToken = this.tokens.shift();
  }

  /**
   * @description 현재 토큰의 종류를 반환한다.
   */
  tokenType(): TokenType {
    if (KeywordTypes.includes(this.currentToken)) {
      return `KEYWORD`;
    } else if (SymbolTypes.includes(this.currentToken)) {
      return `SYMBOL`;
    } else if (!isNaN(parseInt(this.currentToken))) {
      return `INT_CONST`;
    } else if (this.currentToken.startsWith('') && this.currentToken.endsWith('')) {
      return `STRING_CONST`;
    } else {
      return `IDENTIFIER`;
    }
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
