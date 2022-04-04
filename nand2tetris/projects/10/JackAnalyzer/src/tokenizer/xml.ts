import { fileLoader, readFile } from '../util';

export class XMLReader {
  static async fromFile(file: string) {
    const content = await readFile(file);
    const chars = content.split('');

    const tagStack: string[] = [];

    let isTag: boolean = false;
    let isCloseTag: boolean = false;
    while (chars.length) {
      let char = chars.shift();
      if (char === `<`) {
        isTag = true;
        let isClose: boolean = false;
        let tagString: string = '';
        let valueString: string = '';

        while (!isClose) {
          char = chars.shift();
          if (char === `>`) {
            isClose = true;
          } else if (char === `/`) {
            isCloseTag = true;
          } else {
            tagString += char;
          }
        }

        if(!tagStack.length){
          tagStack.push(tagString);
        } else {
          let top:string  = tagStack[tagStack.length - 1]
          if(top === tagString) {

          }
        }
        
      }
    }
  }
}
export class XML {
  private parent: XML;
  private readonly children: XML[];
  private textContent: string;

  constructor(private readonly type: string) {
    this.children = [];
  }

  appendChild(xml: XML): XML {
    this.children.push(xml);
    xml.parent = this;
    return this;
  }

  setTextContent(textContent: string): XML {
    let value;
    if (textContent === '<') {
      value = '&lt;';
    } else if (textContent === '>') {
      value = '&gt;';
    } else if (textContent === '"') {
      value = '&quot;';
    } else if (textContent === '&') {
      value = '&amp;';
    } else {
      value = textContent;
    }
    this.textContent = ` ${value} `;

    return this;
  }

  hasChildren(): boolean {
    return !!this.children.length;
  }

  private getParentCount(): number {
    let count: number = 0;
    let xml: XML = this;
    while (xml.hasParent()) {
      ++count;
      xml = xml.parent;
    }
    return count;
  }

  private hasParent(): boolean {
    return !!this.parent;
  }

  toXmlDocument(): string {
    const tabCounts = this.getParentCount();
    const startTab = tabCounts ? new Array(tabCounts).fill('\t').join('') : '';
    const endTap = tabCounts && this.hasChildren() ? new Array(tabCounts).fill('\t').join('') : '';
    const indent = this.hasParent() ? '\n' : '';
    const newLine = this.hasChildren() ? '\n' : '';
    const childrenText: string = this.hasChildren()
      ? `${this.children.map((child) => `${child.toXmlDocument()}`).join('')}`
      : `${this.textContent}`;

    return `${indent}${startTab}<${this.type}>${childrenText}${newLine}${endTap}</${this.type}>`;
  }
}
