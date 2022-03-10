import { JackAnalyzer } from './tokenizer/jack.analyzer';
import { argumentParse, fileLoader } from './util';

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
    const jackAnalyzer = new JackAnalyzer(files);
    await jackAnalyzer.start();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

appStart(process.argv.slice(2));
