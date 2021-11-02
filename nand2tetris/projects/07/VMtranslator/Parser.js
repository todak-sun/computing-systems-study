const fs = require("fs");

class Parser {
  #lines;

  /**
   * 입력 파일/스트림을 열고 분석할 준비를 한다.
   * @param {string} file 입력 파일
   */
  constructor(file) {
    const content = fs.readFileSync(file, { encoding: "utf-8" }).toString();
    this.#lines = content.split("\r\n");

    console.log(this.#lines);
  }

  /**
   * @returns {boolean}
   * @description 입력에 명령이 더 있는가?
   */
  hasMoreCommands() {}

  /**
   * @description 입력에서 다음 명령을 읽고 현재 명령으로 만든다. hasMoreCommands()가 참일 때만 호출되어야 한다. 초기에는 혀재 명령은 비어있다.
   * @returns {void}
   */
  advance() {}

  /**
   * @description 현재 VM 명령의 타입을 반환한다. 모든 산술 명령(arithmetic command)에 대해 C_ARITHMETIC이 반환된다.
   * @returns {string} COMMAND_TYPE
   */
  commandType() {}

  /**
   * @description 현재 명령의 첫 인수를 반환한다. C_ARITHMETIC의 경우에는 명령 그 자체(add, sub등)가 반환된다. 현재 명령이 C_RETURN이면 호출되면 안 된다.
   * @returns {string}
   */
  arg1() {}

  /**
   * @description 현재 명령의 두 번째 인수를 반환한다. 현재 명령이 C_PUSH, C_POP, C_FUNCTION 또는 C_CALL일 때만 호출되어야 한다.
   * @returns {number}
   */
  arg2() {}
}

module.exports = Parser;
