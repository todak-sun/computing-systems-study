const log = console.log;
const Parser = require("./Parser");
const fs = require("fs");

class CodeWriter {
  /**
   * @type {string[]}
   */
  #translatedRows;
  /**
   * @type {string}
   */
  #outputPath;
  /**
   * @type {Parser}
   */
  #parser;
  /**
   * @description 출력 파일/스트림을 열어서 기록할 준비를 한다.
   * @param {string} file 출력 파일
   */
  constructor(file) {
    this.#outputPath = file;
    this.#translatedRows = [];
  }

  /**
   * @description 코드 작성기에게 새로운 VM 파일 번역이 시작되었음을 알린다.
   * @param {string} filename 파일 이름
   */
  setFileName(filename) {
    this.#parser = new Parser(filename);
    while (this.#parser.hasMoreCommands()) {
      log(this.#parser.commandType());
    }
  }

  /**
   *
   * @param {string} command
   * @description 주어진 산술 명령을 번역한 어셈블리 코드를 기록한다.
   */
  writerArithmetic(command) {}

  /**
   *
   * @param {string} command C_PUSH 또는 C_POP
   * @param {string} segment
   * @param {number} index
   * @description 주어진 command를 번역한 어셈블리 코드를 기록한다.
   */
  writePushPop(command, segment, index) {
    this.#translatedRows.push(`//COMMANT : ${[command, segment, index].join('')}`)
  }

  /**
   * @description 출력 파일을 닫는다.
   */
  close() {
    fs.writeFileSync(this.#outputPath, this.#translatedRows.join("\n"), {
      encoding: "utf-8",
    });
  }
}

module.exports = CodeWriter;
