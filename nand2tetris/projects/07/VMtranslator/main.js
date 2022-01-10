const log = console.log;

const fs = require('fs');
const path = require('path');
const CodeWriter = require('./codeWriter');
const Parser = require('./parser');
const FileInfo = require('./fileInfo');

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
  names
    .filter((name) => name.endsWith('.vm'))
    .map((name) => path.join(outputFile.getDir(), name))
    .forEach((name) => fileNames.push(name));
} else if (outputFile.isFile()) {
  if (!outputFile.getFullPath().endsWith('.vm')) {
    throw new Error('vm 파일이 아닙니다.');
  }
  fileNames.push(outputFile.getFullPath());
}

fileNames.forEach((file) => {
  const fileInfo = new FileInfo(fs.statSync(file), path.parse(file));
  const cw = new CodeWriter(fileInfo);
  const parser = new Parser(fileInfo.getFullPath());
  while (parser.hasMoreCommands()) {
    parser.advance();
    cw.write(`// ${parser.getCurrentInstruction().join(' ')}`);
    if (parser.commandType() === 'C_PUSH') {
      cw.writePushPop('C_PUSH', parser.arg1(), parser.arg2());
    } else if (parser.commandType() === 'C_POP') {
      cw.writePushPop('C_POP', parser.arg1(), parser.arg2());
    } else if (parser.commandType() === 'C_ARITHMETIC') {
      cw.writerArithmetic(parser.arg1());
    }
  }
  cw.close();
});
