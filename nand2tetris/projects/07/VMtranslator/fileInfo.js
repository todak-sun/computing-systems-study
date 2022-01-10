const path = require('path');

const log = console.log;

class FileInfo {
  /**
   * @type {import("fs").Stats}
   */
  #stat;
  /**
   * @type {import("path/posix").ParsedPath}
   */
  #parsedPath;
  /**
   *
   * @param {import("fs").Stats} stat
   * @param {import("path/posix").ParsedPath} parsedPath
   */
  constructor(stat, parsedPath) {
    this.#stat = stat;
    this.#parsedPath = parsedPath;
  }

  isFile() {
    return this.#stat.isFile();
  }

  isDirectory() {
    return this.#stat.isDirectory();
  }

  getDir() {
    return path.join(this.#parsedPath.dir, this.#parsedPath.base);
  }

  getFullPathExcludeExt() {
    return path.join(this.#parsedPath.dir, this.#parsedPath.name);
  }

  getFullPath() {
    return path.join(this.#parsedPath.dir, `${this.#parsedPath.name}${this.#parsedPath.ext}`);
  }
}

module.exports = FileInfo;
