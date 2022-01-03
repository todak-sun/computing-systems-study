exports.COMMAND_DICT = {
  add: 'C_ARITHMETIC',
  sub: 'C_ARITHMETIC',
  neg: 'C_ARITHMETIC',
  eq: 'C_ARITHMETIC',
  gt: 'C_ARITHMETIC',
  lt: 'C_ARITHMETIC',
  and: 'C_ARITHMETIC',
  or: 'C_ARITHMETIC',
  not: 'C_ARITHMETIC',
  push: 'C_PUSH',
  pop: 'C_POP',
  label: 'C_LABEL',
  goto: 'C_GOTO',
  'if-goto': 'C_IF',
  function: 'C_FUNCTION',
  return: 'C_RETURN',
  call: 'C_CALL',
};

exports.ADDRESS_DICT = {
  local: 'LCL', // Base R1
  argument: 'ARG', // Base R2
  this: 'THIS', // Base R3
  that: 'THAT', // Base R4
  pointer: 3, // Edit R3, R4
  temp: 5, // Edit R5-12
  // R13-15 are free
  static: 16, // Edit R16-255
};
