// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
//
// This program only needs to handle arguments that satisfy
// R0 >= 0, R1 >= 0, and R0*R1 < 32768.


@R0
D=M
@X
M=D	// X = R0

@R1
D=M
@Y
M=D	// Y = R1

@0
D=A

@R2
M=D	// R2 = 0

(LOOP)
    @X
    D=M
    @END
    D;JLE // IF (X <= 0) goto END

    @Y
    D=M 

    @R2
    M=D+M // R2 = X + Y

    @1
    D=A 
    
    @X
    M=M-D // X = X - 1

    @LOOP
    0;JMP
(END)





