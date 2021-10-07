const interpreter = {
  dest: {
    0: "000",
    M: "001",
    D: "010",
    MD: "011",
    A: "100",
    AM: "101",
    AD: "110",
    AMD: "111",
  },
  jump: {
    JGT: "001",
    JEQ: "010",
    JGE: "011",
    JLT: "100",
    JNE: "101",
    JLE: "110",
    JMP: "111",
  },
  comp: {
    0: "0101010",
    1: "0111111",
    "-1": "0111010",
    D: "0001100",
    A: "0110000",
    M: "1110000", // a=1
    "!D": "0001101",
    "!A": "0110001",
    "!M": "1110001", // a=1
    "-D": "0001111",
    "-A": "0110011",
    "-M": "1110011", // a=1
    "D+1": "0011111",
    "A+1": "0110111",
    "M+1": "1110111", // a=1
    "D-1": "0001110",
    "A-1": "0110010",
    "M-1": "1110010", // a=1
    "D+A": "0000010",
    "D+M": "1000010", // a=1
    "D-A": "0010011",
    "D-M": "1010011", // a=1
    "A-D": "0000111",
    "M-D": "1000111", //a=1
    "D&A": "0000000",
    "D&M": "1000000", //a=1
    "D|A": "0010101",
    "D|M": "1010101", //a=1
  },
};

class Code {
  /**
   * @description dest 연상기호의 2진 코드를 반환한다.
   * @param {String} sign 연상기호
   * @returns {String} 3비트
   */
  dest(sign) {
    const binary = interpreter.dest[sign];
    if (!binary) {
      throw new Error(`존재하지 않는 기호 => ${sign}`);
    }
    return binary;
  }
  /**
   * @description comp 연상기호의 2진 코드를 반환한다.
   * @param {String} sign 연상기호
   * @returns {String} 7비트
   */
  comp(sign) {
    const binary = interpreter.comp["" + sign];
    if (!sign) {
      throw new Error(`존재하지 않는 기호 => ${sign}`);
    }
    return binary;
  }

  /**
   * @description jump 연상기호의 2진 코드를 반환한다.
   * @param {String} sign 연상기호
   * @returns {String} 3비트
   */
  jump(sign) {
    const binary = interpreter.jump[sign];
    return binary || "000";
  }
}

module.exports = Code;
