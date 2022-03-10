import { JackTokenizer } from './tokenizer/jack.tokenizer';
import { KeywordType } from './tokenizer/token.constants';
import { XML } from './tokenizer/xml';
import { argumentParse, fileLoader, readFile } from './util';
import * as fs from 'fs/promises';
import * as path from 'path';

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
      const tokenizer = new JackTokenizer(sourceCode);
      const tokens = new XML('tokens');
      while (tokenizer.hasMoreTokens()) {
        // 다음 토큰 가져오기
        tokenizer.advance();
        // 토큰타입 확인
        const tokenType = tokenizer.tokenType();
        if (tokenType === `KEYWORD`) {
          const keywordType: KeywordType = tokenizer.keyword();
          tokens.appendChild(new XML(`keyword`).setTextContent(keywordType.toLowerCase()));
        } else if (tokenType === `SYMBOL`) {
          const symbol: string = tokenizer.symbol();
          tokens.appendChild(new XML(`symbol`).setTextContent(symbol));
        } else if (tokenType === `IDENTIFIER`) {
          const identifier: string = tokenizer.identifier();
          tokens.appendChild(new XML(`identifier`).setTextContent(identifier));
        } else if (tokenType === `INT_CONST`) {
          const intValue: number = tokenizer.intVal();
          tokens.appendChild(new XML(`integerConstant`).setTextContent(intValue.toString()));
        } else if (tokenType === `STRING_CONST`) {
          const stringValue: string = tokenizer.stringVal();
          tokens.appendChild(new XML(`stringConstant`).setTextContent(stringValue));
        }
      }
      const { dir, name } = path.parse(file);
      const outPath = path.join(dir, `${name}T.test.xml`);
      await fs.writeFile(outPath, tokens.toXmlDocument(), { encoding: 'utf-8' });
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

appStart(process.argv.slice(2));
