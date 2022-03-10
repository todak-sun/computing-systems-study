export const KeywordTypes = [
  'class',
  'constructor',
  'function',
  'method',
  'field',
  'static',
  'var',
  'int',
  'char',
  'boolean',
  'void',
  'true',
  'false',
  'null',
  'this',
  'let',
  'do',
  'if',
  'else',
  'while',
  'return',
];

export const KeywordType = {
  CLASS: 'CLASS',
  CONSTRUCTOR: 'CONSTRUCTOR',
  FUNCTION: 'FUNCTION',
  METHOD: 'METHOD',
  FIELD: 'FIELD',
  STATIC: 'STATIC',
  VAR: 'VAR',
  INT: 'INT',
  CHAR: 'CHAR',
  BOOLEAN: 'BOOLEAN',
  VOID: 'VOID',
  TRUE: 'TRUE',
  FALSE: 'FALSE',
  NULL: 'NULL',
  THIS: 'THIS',
  LET: 'LET',
  DO: 'DO',
  IF: 'IF',
  ELSE: 'ELSE',
  WHILE: 'WHILE',
  RETURN: 'RETURN',
};

export const KeywordTypeMap: Record<string, KeywordType> = {
  class: KeywordType.CLASS,
  constructor: KeywordType.CONSTRUCTOR,
  function: KeywordType.FUNCTION,
  method: KeywordType.METHOD,
  field: KeywordType.FIELD,
  static: KeywordType.STATIC,
  var: KeywordType.VAR,
  int: KeywordType.INT,
  char: KeywordType.CHAR,
  boolean: KeywordType.BOOLEAN,
  void: KeywordType.VOID,
  true: KeywordType.TRUE,
  false: KeywordType.FALSE,
  null: KeywordType.NULL,
  this: KeywordType.THIS,
  let: KeywordType.LET,
  do: KeywordType.DO,
  if: KeywordType.IF,
  else: KeywordType.ELSE,
  while: KeywordType.WHILE,
  return: KeywordType.RETURN,
};

export type KeywordType = typeof KeywordType[keyof typeof KeywordType];
export type TokenType = typeof TOKEN_TYPE[number];

export const commentPattern = '/(^//.*)|(^/\\*.*)|^\\*.*/';
export const SymbolTypes = ['{', '}', '(', ')', ';', '.', '=', '>', '<', '[', ']', '+', '/', ','];
const TOKEN_TYPE = [`KEYWORD`, `SYMBOL`, `IDENTIFIER`, `INT_CONST`, `STRING_CONST`] as const;
