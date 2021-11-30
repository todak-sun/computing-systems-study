const COMMAND_TYPE = {
  pop: "C_POP",
  push: "C_PUSH",
  label: "C_LABEL",
  goto: "C_GOTO",
  "if-goto": "C_IF",
  function: "C_FUNCTION",
  call: "C_CALL",
  return: "C_RETURN",
};

const CALC_COMMAND_MAP = {
  add: "add",
  sub: "sub",
  neg: "neg",
  eq: "eq",
  gt: "gt",
  lt: "lt",
  and: "and",
  or: "or",
  not: "not",
};

const SYMBOL_COMMAND_MAP = {
  local: "LCL",
  constant: "constant",
  argument: "ARG",
  this: "THIS",
  that: "THAT",
  temp: "R5",
  pointer: "R3",
};

const COMMAND_TYPE_KEYS = Object.keys(COMMAND_TYPE);
const CALC_COMMAND_MAP_KEYS = Object.keys(CALC_COMMAND_MAP);
const SYMBOL_COMMAND_MAP_KEYS = Object.keys(SYMBOL_COMMAND_MAP);

module.exports = {
  COMMAND_TYPE,
  COMMAND_TYPE_KEYS,
  CALC_COMMAND_MAP,
  CALC_COMMAND_MAP_KEYS,
  SYMBOL_COMMAND_MAP,
  SYMBOL_COMMAND_MAP_KEYS,
};
