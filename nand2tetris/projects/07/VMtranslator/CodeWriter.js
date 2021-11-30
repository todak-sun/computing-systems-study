const log = console.log;
const constants = require('./constants');
const fs = require('fs');
const path = require('path');

class CodeWriter {
  /** @type {string[]} */
  #translatedRows;
  /** @type {import("./fileInfo")} */
  #outputFile;
  /** @type {string} */
  #filename;
  /** @type {number} */
  #currentLine;

  /**
   * @description 출력 파일/스트림을 열어서 기록할 준비를 한다.
   * @param {import("./fileInfo")} outputFile 출력 파일
   */
  constructor(outputFile) {
    this.#outputFile = outputFile;
    this.#currentLine = 0;
    this.#translatedRows = ['//init'];
    this.#writeLine('@256');
    this.#writeLine('D=A');
    this.#writeLine('@SP');
    this.#writeLine('M=D');
  }

  /**
   * @description 코드 작성기에게 새로운 VM 파일 번역이 시작되었음을 알린다.
   * @param {string} filename 파일 이름
   */
  setFileName(filename) {
    this.#filename = filename;
  }

  /**
   *
   * @param {string} command
   * @description 주어진 산술 명령을 번역한 어셈블리 코드를 기록한다.
   */
  writerArithmetic(command) {
    this.#writeLine(`// ${command}`);

    if (['add', 'sub', 'and', 'or'].includes(command)) {
      this.#writeLine('@SP');
      this.#writeLine('AM=M-1');
      this.#writeLine('D=M');
      this.#writeLine('A=A-1');

      switch (command) {
        case 'add':
          this.#writeLine('M=D+M');
          break;
        case 'sub':
          this.#writeLine('M=M-D');
          break;
        case 'and':
          this.#writeLine('M=D&M');
          break;
        case 'or':
          this.#writeLine('M=D|M');
          break;
        default:
          break;
      }
    } else if (['eq', 'lt', 'gt']) {
      this.#writeLine('@SP');
      this.#writeLine('AM=M-1');
      this.#writeLine('D=M');
      this.#writeLine('A=A-1');
      this.#writeLine('D=D-M');
      this.#writeLine(`@`);
    }
  }

  /**
   *
   * @param {string} command C_PUSH 또는 C_POP
   * @param {string} segment
   * @param {number} index
   * @description 주어진 command를 번역한 어셈블리 코드를 기록한다.
   */
  writePushPop(command, segment, index) {
    this.#writeLine(`//COMMENT : ${[command, segment, index].join(' ')}`);
    if (command === constants.COMMAND_TYPE.push) {
      if (segment === 'pointer') {
        if (index == 0) {
          this.#writeLine(`@${constants.SYMBOL_COMMAND_MAP.this}`);
        } else if (index === 1) {
          this.#writeLine(`@${constants.SYMBOL_COMMAND_MAP.that}`);
        }
        this.#writeLine('D=M');
      } else if (segment === 'static') {
        this.#writeLine(`@${this.#filename}.${index}`);
        this.#writeLine('D=M');
      } else if (index == 0 && segment !== constants.SYMBOL_COMMAND_MAP.constant) {
        this.#writeLine(`@${constants.SYMBOL_COMMAND_MAP[segment]}`);
        this.#writeLine('A=M');
        this.#writeLine('D=M');
      } else if (index > 0 || segment === constants.SYMBOL_COMMAND_MAP.constant) {
        this.#writeLine(`@${index}`);
        this.#writeLine('D=A');
      }

      if (index > 0 && segment !== constants.SYMBOL_COMMAND_MAP.constant && segment !== 'pointer' && segment !== 'static') {
        this.#writeLine(`@${constants.SYMBOL_COMMAND_MAP[segment]}`);
        if (segment === 'temp') {
          this.#writeLine('A=D+A');
        } else {
          this.#writeLine('A=D+M');
        }
        this.#writeLine('D=M');
      }

      this.#writeLine('@SP');
      this.#writeLine('A=M');
      this.#writeLine('M=D');
      this.#writeLine('@SP');
      this.#writeLine('M=M+1');
    } else if (command == constants.COMMAND_TYPE.pop) {
      if (index === 0 || segment === 'pointer' || segment === 'static') {
        this.#writeLine('@SP');
        this.#writeLine('AM=M-1');
        this.#writeLine('D=M');
        if (segment === 'pointer' && index === 0) {
          this.#writeLine(`@${constants.SYMBOL_COMMAND_MAP.this}`);
        } else if (segment === 'pointer' && index === 1) {
          this.#writeLine(`@${constants.SYMBOL_COMMAND_MAP.that}`);
        } else if (segment === 'static') {
          this.#writeLine(`@${this.#filename}.${index}`);
        } else {
          this.#writeLine(`@${constants.SYMBOL_COMMAND_MAP[segment]}`);
        }
      } else if (index > 0) {
        this.#writeLine(`@${index}`);
        this.#writeLine('D=A');
        this.#writeLine(`@${constants.SYMBOL_COMMAND_MAP[segment]}`);

        if (segment === 'temp') {
          this.#writeLine('D=D+A');
        } else {
          this.#writeLine('D=D+M');
        }
        this.#writeLine('@R13');
        this.#writeLine('M=D');
        this.#writeLine('@SP');
        this.#writeLine('AM=M-1');
        this.#writeLine('D=M');
        this.#writeLine('@R13');
      }

      if (segment !== 'pointer' && segment !== 'static' && segment !== 'temp') {
        this.#writeLine('A=M');
      }
      this.#writeLine('M=D');
    }
  }

  /**
   * @description 출력 파일을 닫는다.
   */
  close() {
    const data = this.#translatedRows.join('\n');
    fs.writeFileSync(path.join(this.#outputFile.getDir(), `${this.#filename}.asm`), data, { encoding: 'utf-8' });

    log(data);
    // fs.writeFileSync(this.#outputPath, this.#translatedRows.join("\n"), {
    //   encoding: "utf-8",
    // });
  }

  #writeLine(line) {
    this.#translatedRows.push(line);
    this.#currentLine++;
  }
}

module.exports = CodeWriter;
