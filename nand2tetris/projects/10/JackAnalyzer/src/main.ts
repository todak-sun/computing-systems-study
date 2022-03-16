import { CompilationEngine } from './tokenizer/compilation.engine';
import { JackAnalyzer } from './tokenizer/jack.analyzer';
import { XML, XMLReader } from './tokenizer/xml';
import { argumentParse, fileLoader } from './util';

async function appStart(args: string[]) {
  const targetPath = args[args.length - 1];
  const programArgs = argumentParse(args);

  // if (!targetPath) {
  //   console.error(`ERROR! target path required`);
  //   process.exit(1);
  // }

  let files: string[] = [];

  try {
    // files = await fileLoader(targetPath);
    // const jackAnalyzer = new JackAnalyzer(files);
    // const outputPaths: string[] = await jackAnalyzer.analyze();

    // const engine = new CompilationEngine(outputPaths);
    // console.log(outputPaths);

    await XMLReader.fromFile('../ArrayTest/MainT.test.xml');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

appStart(process.argv.slice(2));
