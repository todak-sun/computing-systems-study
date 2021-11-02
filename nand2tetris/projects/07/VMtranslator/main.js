const log = console.log;

const Parser = require("./Parser");
const CodeWriter = require("./CodeWriter");
const commandType = require("./commandType");

const resourcePath = process.argv.slice(2)[0];

log(resourcePath);

const parser = new Parser(resourcePath);

