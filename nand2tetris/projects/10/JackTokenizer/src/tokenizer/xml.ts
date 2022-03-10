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
