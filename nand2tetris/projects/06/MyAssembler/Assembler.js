const log = console.log;

const fs = require("fs");
const path = require("path");

const Parser = require("./Parser");
const Code = require("./Code");
const SymbolTable = require("./SymbolTable");
const COMMAND_TYPE = require("./CommandType");

const filePath = process.argv.slice(2)[0];

if (!filePath) {
  throw new Error("파일경로를 입력해주세요");
}

if (path.parse(filePath).ext !== ".asm") {
  throw new Error("어셈블리파일이 아닙니다.");
}

const parser = new Parser(filePath);
const code = new Code();
const symbolTable = new SymbolTable();

const binaries = [];

// SymbolTable 초기화
let lineNumber = 0;
while (parser.hasMoreCommands()) {
  parser.advance();
  switch (parser.commandType()) {
    case COMMAND_TYPE.L:
      symbolTable.addEntry(parser.symbol(), lineNumber);
    case COMMAND_TYPE.A:
    case COMMAND_TYPE.C:
      lineNumber++;
  }
}

parser.refresh();

while (parser.hasMoreCommands()) {
  parser.advance();
  let binary;
  let symbol;
  switch (parser.commandType()) {
    case COMMAND_TYPE.A:
      symbol = parser.symbol();
      if (isNaN(symbol)) {
        binary = toBinary16Length(symbolTable.GetAddress(symbol));
      } else {
        binary = toBinary16Length(symbol);
      }
      break;
    case COMMAND_TYPE.C:
      let line = "111";
      line += code.comp(parser.comp());
      line += code.dest(parser.dest());
      line += code.jump(parser.jump());
      binary = line;
      break;
    case COMMAND_TYPE.L:
      symbol = parser.symbol();
      binary = toBinary16Length(symbolTable.GetAddress(symbol));
      break;
    default:
      break;
  }
  binaries.push(binary);
}

const { name, dir } = path.parse(filePath);
fs.writeFileSync(`${dir}/${name}.hack`, binaries.join("\n"));

///////////////////////////////////////////////////

function toBinary16Length(memeory) {
  return padL(toBinary(memeory));
}

function toBinary(memory) {
  return (+memory).toString(2);
}

function padL(target, length = 16, alt = "0") {
  return new Array(length - ("" + target).length)
    .fill(alt)
    .join("")
    .concat(target);
}
