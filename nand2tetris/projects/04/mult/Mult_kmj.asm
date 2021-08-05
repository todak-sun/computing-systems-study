    @R0
    D=M

    @X
    M=D

    @R1
    D=M

    @Y
    M=D

    @R2
    M=0

(LOOP)
    @X
    D=M
    @END
    D;JLE

    @Y
    D=M 

    @R2
    D=D+M

    @R2
    M=D

    @X
    D=M

    @1
    D=D-A

    @X
    M=D

    @LOOP
    0;JMP
(END)
    // @END
    // 0;JMP