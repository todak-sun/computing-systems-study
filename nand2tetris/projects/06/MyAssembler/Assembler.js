const log = console.log;

const Parser = require("./Parser");
const Code = require("./Code");
const COMMAND_TYPE = require("./CommandType");

const filePath = process.argv.slice(2)[0];

if (!filePath) {
  throw new Error("파일경로를 입력해주세요");
}

const parser = new Parser(filePath);

while (parser.hasMoreCommands()) {
  parser.advance();

  switch (parser.commandType()) {
    case COMMAND_TYPE.A:
      log(parser.symbol());
      break;
    case COMMAND_TYPE.C:
      break;
    case COMMAND_TYPE.L:
      break;
    default:
      break;
  }
}
