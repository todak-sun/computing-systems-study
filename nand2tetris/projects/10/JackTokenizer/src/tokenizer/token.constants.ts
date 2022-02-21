export const KeywordTypes = ['class', 'function', 'void', 'var', 'int', 'let', 'while'];
export const SymbolTypes = ['{', '}', '(', ')', ';', '.', '=', '&lt;', '[', ']', '+', '/'];


const TOKEN_TYPE = [`KEYWORD`, `SYMBOL`, `IDENTIFIER`, `INT_CONST`, `STRING_CONST`] as const;
export type TokenType = typeof TOKEN_TYPE[number];

const KEYWORD_TYPE = [
  `CLASS`,
  `METHOD`,
  `FUNCTION`,
  `CONSTRUCTOR`,
  `INT`,
  `BOOLEAN`,
  `CHAR`,
  `VOID`,
  `VAR`,
  `STATIC`,
  `FIELD`,
  `LET`,
  `DO`,
  `IF`,
  `ELSE`,
  `WHILE`,
  `RETURN`,
  `TRUE`,
  `FALSE`,
  `NULL`,
  `THIS`,
] as const;
export type KeywordType = typeof KEYWORD_TYPE[number];
