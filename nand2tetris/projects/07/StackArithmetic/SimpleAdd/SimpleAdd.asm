//init
@256
D=A
@SP
M=D
//COMMENT : C_PUSH constant 7
@7
D=A
@SP
A=M
M=D
@SP
M=M+1
//COMMENT : C_PUSH constant 8
@8
D=A
@SP
A=M
M=D
@SP
M=M+1
// add
@SP
AM=M-1
D=M
A=A-1
M=D+M