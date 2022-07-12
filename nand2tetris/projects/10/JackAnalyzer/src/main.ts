import { XML, XMLReader } from './tokenizer/xml';
import { argumentParse } from './util';

export class Queue<T> {
  private readonly arr: T[];
  constructor(itmes: T[] = []) {
    this.arr = [...itmes];
  }

  enqueue(item: T) {
    this.arr.push(item);
  }

  poll(): T {
    return this.arr.shift();
  }

  hasItem(): boolean {
    return Boolean(this.arr.length);
  }
}

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

    const xml = await XMLReader.fromFile('../ArrayTest/MainT.test.xml');

    if (xml.hasChildren()) {
      const queue: Queue<XML> = new Queue(xml.getChildren());

      while (queue.hasItem()) {
        const xml = queue.poll();
        const type = xml.getType();
        const content = xml.getTextContent();
        console.log({type, content})
        if (content === `class`) {
          const identifire = queue.poll();

          console.log({type, content, identifire: identifire.getTextContent()})

        }
      }
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

appStart(process.argv.slice(2));
