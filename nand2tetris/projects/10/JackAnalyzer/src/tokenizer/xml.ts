import { fileLoader, readFile } from '../util';

class Stack<T> {
  private readonly data: T[];

  constructor() {
    this.data = [];
  }

  push(item: T) {
    this.data.push(item);
  }

  pop() {
    return this.data.pop();
  }

  top() {
    return this.data[this.data.length - 1];
  }

  isEmpty() {
    return this.data.length === 0;
  }
}

export class XMLReader {
  static async fromFile(file: string) {
    // new XML()

    const xmlStack = new Stack<XML>();
    const tagStack = new Stack<string>();
    const content = await readFile(file);
    const chars = content.split('');

    const tagnames = [];
    const values = [];
    let isTag = false;

    while (chars.length) {
      let char = chars.shift();

      if (!isTag) {
        // 태그 토큰을 최초로 만난 상태
        if (char === '<') {
          isTag = true;
          let nextChar = chars.shift();
          if (nextChar !== '/') {
            tagnames.push(nextChar);
            const value = values.join('').trim();
            if (value.length) {
              xmlStack.top().setTextContent(value);
            }
            values.length = 0;
          }
        } else {
          values.push(char);
        }
      } else {
        // 태그토큰이 열려있지만 닫히지 않은 상태
        if (char === '>') {
          const tagname = tagnames.join('');
          if (!tagStack.isEmpty() && tagStack.top() === tagname) {
            xmlStack.push(new XML(tagStack.pop()));
          } else {
            tagStack.push(tagname);
          }
          tagnames.length = 0;
          isTag = false;
        } else {
          tagnames.push(char);
        }
      }
    }

    let parent: XML = undefined;
    while (!xmlStack.isEmpty()) {
      const xml = xmlStack.pop();
      if (!xml.hasTextContent()) {
        parent = xml;
      } else {
        parent.appendChild(xml);
      }
    }

    console.log(parent.toXmlDocument());
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

  hasTextContent(): boolean {
    return !!this.textContent;
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
