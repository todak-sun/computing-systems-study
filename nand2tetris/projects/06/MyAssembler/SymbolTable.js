const log = console.log;

class SymbolTable {
  #memo;
  #address;
  constructor() {
    this.#memo = {
      SP: 0,
      LCL: 1,
      ARG: 2,
      THIS: 3,
      THAT: 4,
      SCREEN: 16384,
      KBD: 24576,
    };
    new Array(16).fill("R").forEach((r, i) => (this.#memo[`${r}${i}`] = i));
    this.#address = 16;
  }

  /**
   * @description (symbol, address) 쌍을 테이블에 추가한다.
   * @param {String} symbol
   * @param {int} address
   * @returns {void}
   */
  addEntry(symbol, address) {
    this.#memo[symbol] = address;
    log("addEntry", symbol, this.#memo[symbol]);
  }

  /**
   * @description 기호 테이블이 주어진 symbol을 포함하는가?
   * @param {String} symbol
   * @returns {boolean}
   */
  contains(symbol) {
    // log(symbol, this.#memo[symbol], this.#memo);
    return this.#memo[symbol] !== undefined;
  }

  /**
   * @description symbol과 연결된 주소를 반환한다.
   * @param {String} symbol
   * @returns {int}
   */
  GetAddress(symbol) {
    if (this.contains(symbol)) {
      return this.#memo[symbol];
    } else {
      this.addEntry(symbol, this.#address++);
      return this.#memo[symbol];
    }
  }
}

module.exports = SymbolTable;
