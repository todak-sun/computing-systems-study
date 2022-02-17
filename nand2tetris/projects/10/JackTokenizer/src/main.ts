import { JackTokenizer } from './tokenizer/jack.tokenizer';
import { XML } from './tokenizer/xml';
import { argumentParse, fileLoader, readFile } from './util';

async function appStart(args: string[]) {
  const targetPath = args[args.length - 1];
  const programArgs = argumentParse(args);

  if (!targetPath) {
    console.error(`ERROR! target path required`);
    process.exit(1);
  }

  let files: string[] = [];

  try {
    files = await fileLoader(targetPath);
    for (const file of files) {
      const sourceCode = await readFile(file);
      new JackTokenizer(sourceCode);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

appStart(process.argv.slice(2));
