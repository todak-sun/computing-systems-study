const log = console.log;

const fs = require("fs");
const path = require("path");
const CodeWriter = require("./CodeWriter");

const resourcePath = process.argv.slice(2)[0];

const targetVMFileNames = [];

let stat;
try {
  stat = fs.statSync(resourcePath);
} catch (e) {
  throw new Error(`File 또는 Directory가 아닙니다. - ${resourcePath}`);
}

if (stat.isDirectory()) {
  const dirs = fs.readdirSync(resourcePath);
  const fileNames = dirs.filter((dirName) => dirName.endsWith(".vm"));
  if (!fileNames.length) {
    throw new Error(
      `해당 경로에 존재하는 vm 파일이 없습니다. - ${resourcePath}`
    );
  }
  fileNames.forEach((fileName) =>
    targetVMFileNames.push(path.join(resourcePath, fileName))
  );
} else if (stat.isFile()) {
  if (!resourcePath.endsWith(".vm")) {
    throw new Error(`vm 파일이 아닙니다. - ${resourcePath}`);
  }
  targetVMFileNames.push(resourcePath);
}

targetVMFileNames.forEach((fileName) => {
  const parsedPath = path.parse(fileName);
  const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.asm`);
  const codeWriter = new CodeWriter(outputPath);
  codeWriter.setFileName(fileName);
  codeWriter.close();
});
