export class XML {
  private readonly children: XML[];
  private textContent: string;

  constructor(private readonly type: string) {
    this.children = [];
  }

  appendChild(xml: XML): XML {
    this.children.push(xml);
    return this;
  }

  setTextContent(textContent: string): XML {
    this.textContent = textContent;
    return this;
  }

  hasChildren(): boolean {
    return !!this.children.length;
  }

  toXmlDocument(): string {
    let inner: string;
    if (this.hasChildren()) {
      inner = `\n${this.children.map((child) => `\t${child.toXmlDocument()}`).join('\n')}\n`;
    } else {
      inner = ` ${this.textContent} `;
    }
    return `<${this.type}>${inner}</${this.type}>`;
  }
}
