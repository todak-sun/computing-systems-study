import * as path from 'path';
import * as fs from 'fs/promises';
import { readFile } from '../util';
import { JackTokenizer } from './jack.tokenizer';
import { KeywordType } from './token.constants';
import { XML } from './xml';

export class JackAnalyzer {
  constructor(private readonly files: string[]) {}

  async analyze(): Promise<string[]> {
    const outputPathList: string[] = [];
    for (const file of this.files) {
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
      const outputPath = path.join(dir, `${name}T.test.xml`);
      await fs.writeFile(outputPath, tokens.toXmlDocument(), { encoding: 'utf-8' });
      outputPathList.push(outputPath)
    }
    return outputPathList;
  }
}
