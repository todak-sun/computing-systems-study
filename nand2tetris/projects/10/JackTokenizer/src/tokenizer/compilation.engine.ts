export class CompilationEngine {
  constructor() {
    //TODO: 인수로 입력 스트림/파일, 출력 스트림/파일을 받는다.
  }

  /**
   * @description 전체 클래스를 컴파일한다.
   */
  compileClass(): void {}

  /**
   * @description 정적 선언이나 필드 선언을 컴파일한다.
   */
  compileClassVarDec(): void {}

  /**
   * @description 전체 메서드, 함수, 또는 생성자를 컴파일한다.
   */
  compileSubroutine(): void {}

  /**
   * @description 매개변수 리스트를 컴파일한다.(빈 리스트일 수 있음). '()'는 포함하지 않는다.
   */
  compileParameterList(): void {}

  /**
   * @description var 선언을 컴파일한다.
   */
  compileVarDec(): void {}

  /**
   * @description 일련의 명령문을 컴파일한다. '{}'는 포함하지 않는다.
   */
  compileStatements(): void {}

  /**
   * @description do 문을 컴파일한다.
   */
  compileDo(): void {}

  /**
   * @description let 문을 컴파일한다.
   */
  compileLet(): void {}

  /**
   * @description while 문을 컴파일한다.
   */
  compileWhile(): void {}

  /**
   * @description return 문을 컴파일한다.
   */
  compileReturn(): void {}

  /**
   * @description if 문과, 뒤에 따라오는 else 절을 컴파일한다.
   */
  compileIf(): void {}

  /**
   * @description 하나의 표현식을 컴파일한다.
   */
  compileExpression(): void {}

  /**
   * @description 하나의 항목(term)을 컴파일한다. 이 루틴에서는 몇가지 가능한 구문 분석 규칙 중 하나를 선택해야하는 조금 어려운 문제가 생길 수 있다.
   *              구체적으로 현재 토큰이 식별자(identifier)라면, 변수, 배열, 원소, 서브루튼 호출 중 하나로 구분해야 한다.
   *              이때 바로 다음 토큰을 보면 '[', '(', '.'중 하나이므로 세 가지 중 하나로 결정 가능하다.
   *              그 외의 토큰은 다음ㅇ에 올 수 없으므로, 만약 다른 토큰이 나온다면 더 이상 진행해서는 안된다.
   */
  compileTerm(): void {}

  /**
   * @description 항목들이 쉼표로 분리된, 표현식 리스트를 컴파일한다(빈 리스트일 수 있음).
   */
  compileExpressionList(): void {}
}
