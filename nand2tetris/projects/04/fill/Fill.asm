// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

(INPUT)
    @KBD
    D=M
    @PRESS
    D;JNE
    @UNPRESS
    0;JMP
(PRESS)
    @0
    D=A-1 
    @FILL
    M=D
(FILL_SCREEN)
    @8192 // 32 * 256
    D=A
    @REST
    M=D
    @SCREEN
    D=A
    @POS
    M=D // POS = SCREEN
    
(FILL_SCREEN_LOOP)
    @REST
    D=M
    @INPUT
    D;JLE

    @FILL
    D=M
    @POS
    A=M
    M=D
    
    @REST
    M=M-1
    @POS
    M=M+1

    @FILL_SCREEN_LOOP
    0;JMP
(UNPRESS)
    @0
    D=A
    @FILL
    M=D
    @FILL_SCREEN
    0;JMP