const log = console.log;
const { ADDRESS_DICT } = require('./constants');
const fs = require('fs');
const path = require('path');

class CodeWriter {
  /**@type {number} */
  #boolCount = 0;
  /** @type {string[]} */
  #translatedRows = [];
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
  }

  /**
   * @description 코드 작성기에게 새로운 VM 파일 번역이 시작되었음을 알린다.
   * @param {string} filename 파일 이름
   */
  setFileName(filename) {
    this.#filename = filename;
  }

  write(line) {
    this.#writeLine(line);
  }

  /**
   *
   * @param {string} command
   * @description 주어진 산술 명령을 번역한 어셈블리 코드를 기록한다.
   */
  writerArithmetic(command) {
    if (!['neg', 'not'].includes(command)) {
      this.#popStackToD();
    }
    this.#decrementSP();
    this.#setAtoStack();

    if (command === 'add') {
      this.#writeLine('M=M+D');
    } else if (command === 'sub') {
      this.#writeLine('M=M-D');
    } else if (command === 'and') {
      this.#writeLine('M=M&D');
    } else if (command === 'or') {
      this.#writeLine('M=M|D');
    } else if (command === 'neg') {
      this.#writeLine('M=-M');
    } else if (command === 'not') {
      this.#writeLine('M=!M');
    } else if (['eq', 'gt', 'lt'].includes(command)) {
      this.#writeLine('D=M-D');
      this.#writeLine(`@BOOL${this.#boolCount}`);
      if (command === 'eq') {
        this.#writeLine('D;JEQ');
      } else if (command === 'gt') {
        this.#writeLine('D;JGT');
      } else if (command === 'lt') {
        this.#writeLine('D;JLT');
      }

      this.#setAtoStack();
      this.#writeLine('M=0');
      this.#writeLine(`@ENDBOOL${this.#boolCount}`);
      this.#writeLine(`0;JMP`);

      this.#writeLine(`(BOOL${this.#boolCount})`);
      this.#setAtoStack();
      this.#writeLine(`M=-1`);

      this.#writeLine(`(ENDBOOL${this.#boolCount})`);
      this.#boolCount += 1;
    } else {
      throw new Error(`command : ${command}`);
    }
    this.#incrementSP();
  }

  /**
   *
   * @param {string} command C_PUSH 또는 C_POP
   * @param {string} segment
   * @param {number} index
   * @description 주어진 command를 번역한 어셈블리 코드를 기록한다.
   */
  writePushPop(command, segment, index) {
    this.#resolveAddress(segment, index);
    if (command === 'C_PUSH') {
      if (segment === 'constant') {
        this.#writeLine('D=A');
      } else {
        this.#writeLine('D=M');
      }
      this.#pushDtoStack()
    } else if (command === 'C_POP') {
      this.#writeLine('D=A');
      this.#writeLine('@R13');
      this.#writeLine('M=D');
      this.#popStackToD();
      this.#writeLine('@R13');
      this.#writeLine('A=M');
      this.#writeLine('M=D');
    } else {
      throw new Error(`command : ${command}, segment : ${segment}, index: ${index}`);
    }
  }

  /**
   * @description 출력 파일을 닫는다.
   */
  close() {
    console.log(this.#translatedRows.join('\n'));
  }

  #resolveAddress(segment, index) {
    const address = ADDRESS_DICT[segment];
    if (segment === 'constant') {
      this.#writeLine(`@${index}`);
    } else if (segment === 'static') {
      this.#writeLine(`@${this.#filename}.${index}`);
    } else if (['pointer', 'temp'].includes(segment)) {
      this.#writeLine(`@R${address + index}`);
    } else if (['local', 'argument', 'this', 'that'].includes(segment)) {
      this.#writeLine(`@${address}`);
      this.#writeLine(`D=M`);
      this.#writeLine(`@${index}`);
      this.#writeLine(`A=D+A`);
    } else {
      throw new Error(`segment : ${segment}, index : ${index}`);
    }
  }

  #setAtoStack() {
    this.#writeLine('@SP');
    this.#writeLine('A=M');
  }

  #decrementSP() {
    this.#writeLine('@SP');
    this.#writeLine('M=M-1');
  }

  #incrementSP() {
    this.#writeLine('@SP');
    this.#writeLine('M=M+1');
  }

  #popStackToD() {
    this.#writeLine('@SP');
    this.#writeLine('M=M-1');
    this.#writeLine('A=M');
    this.#writeLine('D=M');
  }

  #pushDtoStack() {
    this.#writeLine('@SP');
    this.#writeLine('A=M');
    this.#writeLine('M=D');
    this.#writeLine('@SP');
    this.#writeLine('M=M+1');
  }

  #writeLine(line) {
    this.#translatedRows.push(line);
    this.#currentLine++;
  }
}

module.exports = CodeWriter;
