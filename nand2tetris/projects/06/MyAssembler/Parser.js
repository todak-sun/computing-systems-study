const log = console.log;

const COMMAND_TYPE = require("./CommandType");
const fs = require("fs");

/**
 * @description 어셈블리 명령들을 부분들(필드와 기호)로 분해한다.
 */
class Parser {
  #commandLines;
  #currentCommand;

  constructor(filePath) {
    const content = fs.readFileSync(filePath, { encoding: "utf-8" }).toString();
    this.#commandLines = content
      .split("\n")
      .map((line) => {
        const commentIndex = line.indexOf("//");
        if (commentIndex != -1) {
          line = line.substring(0, commentIndex);
        }
        return line.trim();
      })
      .filter((line) => line);

    log(this.#commandLines);
  }

  /**
   * @description 입력에 명령이 더 있는지 확인
   * @returns {Boolean}
   */
  hasMoreCommands() {
    return !!this.#commandLines.length;
  }

  /**
   * @description 입력에서 다음 명령을 읽어서 현재 명령으로 만든다.
   * hasMoreCommands()가 참 일 때만 호출되어야 한다. 초기에는 현재 명령은 정해져 있지 않다.
   */
  advance() {
    this.#currentCommand = this.#commandLines.shift();
  }

  /**
   * @description 현재 명령의 타입을 반환한다.
   * @returns {String} A, C, L
   */
  commandType() {
    if (this.#currentCommand.includes("@")) {
      return COMMAND_TYPE.A;
    } else if (
      this.#currentCommand.includes("=") ||
      this.#currentCommand.includes(";")
    ) {
      return COMMAND_TYPE.C;
    } else if (
      this.#currentCommand.includes("(") &&
      this.#currentCommand.includes(")")
    ) {
      return COMMAND_TYPE.C;
    } else {
      throw new Error("존재하지 않는 commandType");
    }
  }

  /**
   * @description '@Xxx'나 (Xxx) 의 현재 명령에서 기호 또는 10진수 Xxx를 반환한다. commandType() 이 A_COMMAND나 L_COMMAND일 때만 호출 되어야 한다.
   * @returns {String} 현재 명령의 기호 또는 10진수 반환
   */
  symbol() {
    return this.#currentCommand.replace("@", "").replace("(", "").replace(")", "");
  }

  /**
   * @description 현재 C-명령(8종류)의 dest 연상 기호를 반환.
   * commandType()이 C_COMMAND일 때만 호출되어야 한다.
   */
  dest() {}

  /**
   * @description 현재 C-명령(28개 종류) 에서 comp 연상 기호를 반환한다.
   * commandType()이 C_COMMAND일 때만 호출되어야 한다.
   */
  comp() {}

  /**
   * @description 현재 C-명령(28개 종류) 에서 jump 연상기호를 반환한다.
   * commandType()이 C_COMMAND 일 때만 호출되어야 한다.
   */
  jump() {}
}

module.exports = Parser;
