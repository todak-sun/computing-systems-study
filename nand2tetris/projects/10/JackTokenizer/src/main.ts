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
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  const root = new XML('tokens');

  root
    .appendChild(new XML(`keyword`).setTextContent(`if`))
    .appendChild(new XML(`symbol`).setTextContent(`(`).appendChild(new XML(`symbol`).setTextContent(`=`)))
    .appendChild(new XML(`identifier`).setTextContent(`x`));

  console.log(root.toXmlDocument());

  //   for (const file of files) {
  //     const sourceCode: string = await readFile(file);
  //     const tokenizer = new JackTokenizer(sourceCode);
  //   }
}

appStart(process.argv.slice(2));
