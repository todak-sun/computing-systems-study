const log = console.log;

const fs = require('fs');
const path = require('path');
const CodeWriter = require('./codeWriter');
const Parser = require('./parser');
const FileInfo = require('./fileInfo');
const constants = require('./constants');

const resourcePath = process.argv.slice(2)[0];
const fileNames = [];
let outputFile;

try {
  const stat = fs.statSync(resourcePath);
  const parsedPath = path.parse(resourcePath);
  outputFile = new FileInfo(stat, parsedPath);
} catch (e) {
  throw new Error(`File 또는 Directory가 아닙니다. - ${resourcePath}`);
}

if (outputFile.isDirectory()) {
  const names = fs.readdirSync(outputFile.getDir());
  if (!names.filter((name) => name.endsWith('.vm'))[0]) {
    throw new Error('vm 파일이 한 개도 존재하지 않습니다.');
  }
  names.map((name) => path.join(outputFile.getDir(), name)).forEach((name) => fileNames.push(name));
} else if (outputFile.isFile()) {
  if (!outputFile.getFullPath().endsWith('.vm')) {
    throw new Error('vm 파일이 아닙니다.');
  }
  fileNames.push(outputFile.getFullPath());
}

const cw = new CodeWriter(outputFile);

fileNames.forEach((fileName) => {
  cw.setFileName(path.parse(fileName).name);

  const parser = new Parser(fileName);
  while (parser.hasMoreCommands()) {
    const commandType = parser.commandType();
    log('command type ', commandType)
    if (constants.CALC_COMMAND_MAP_KEYS.includes(commandType)) {
      cw.writerArithmetic(commandType);
    } else {
      switch (commandType) {
        case constants.COMMAND_TYPE.push || constants.COMMAND_TYPE.pop:
          cw.writePushPop(commandType, parser.arg1(), +parser.arg2());
          break;
        case constants.COMMAND_TYPE['label']:
          break;
        case constants.COMMAND_TYPE['goto']:
          break;
        case constants.COMMAND_TYPE['if-goto']:
          break;
        case constants.COMMAND_TYPE['function']:
          break;
        case constants.COMMAND_TYPE['call']:
          break;
        case constants.COMMAND_TYPE['return']:
          break;
        default:
          break;
      }
    }
  }
  cw.close();
});
