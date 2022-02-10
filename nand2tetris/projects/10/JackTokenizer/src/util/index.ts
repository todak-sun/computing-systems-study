import { Stats } from 'fs';
import * as fsAsync from 'fs/promises';
import * as path from 'path';

export const argumentParse = (args: string[]): Record<string, any> =>
  args.reduce((acc: Record<string, any>, curr: string) => {
    if (curr.includes('--')) {
      const [key, value] = curr.replace('--', '').split('=');
      acc[key] = value;
    }
    return acc;
  }, {});

export const fileLoader = async (targetPath: string): Promise<string[]> => {
  let ret: string[] = [];

  const stat: Stats = await fsAsync.stat(targetPath);
  if (stat.isDirectory()) {
    const children: string[] = await fsAsync.readdir(targetPath);
    const jackFiles: string[] = children.filter((fileName) => fileName.endsWith('.jack'));
    ret = [...jackFiles.map((fileName) => path.join(targetPath, fileName))];
  } else if (stat.isFile()) {
    ret = [targetPath];
  }

  return ret;
};

export const readFile = async (filePath: string): Promise<string> => fsAsync.readFile(filePath, { encoding: 'utf-8' });
