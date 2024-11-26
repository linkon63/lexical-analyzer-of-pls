const Tokens = {
    LETTER: 0,
    DIGIT: 1,
    UNKNOWN: 99,
    EOF: -1,
    INT_LIT: 1,
    IDENT: 2,
    ADD_OP: 3,
    SUB_OP: 4,
    MULT_OP: 5,
    DIV_OP: 6,
    LEFT_PAREN: 7,
    RIGHT_PAREN: 8,
};

const Operators: Record<string, number> = {
    "+": Tokens.ADD_OP,
    "-": Tokens.SUB_OP,
    "*": Tokens.MULT_OP,
    "/": Tokens.DIV_OP,
    "(": Tokens.LEFT_PAREN,
    ")": Tokens.RIGHT_PAREN,
};

let input = "(sum + 47) / total";
let lexeme = "";
let nextChar = "";
let charClass = Tokens.UNKNOWN;
let nextToken = Tokens.EOF;
let position = 0;

function extractChar(): void {
    nextChar = position < input.length ? input[position++] : "";
    charClass = /[a-zA-Z]/.test(nextChar)
        ? Tokens.LETTER
        : /[0-9]/.test(nextChar)
            ? Tokens.DIGIT
            : nextChar
                ? Tokens.UNKNOWN
                : Tokens.EOF;
}

function lookup(): void {
    nextToken = Operators[nextChar] ?? Tokens.EOF;
    lexeme = nextChar;
}

function analyzeLex(): void {
    lexeme = "";
    while (/\s/.test(nextChar)) extractChar(); // Skip whitespace

    if (charClass === Tokens.LETTER) {
        while (charClass === Tokens.LETTER || charClass === Tokens.DIGIT) {
            lexeme += nextChar;
            extractChar();
        }
        nextToken = Tokens.IDENT;
    } else if (charClass === Tokens.DIGIT) {
        while (charClass === Tokens.DIGIT) {
            lexeme += nextChar;
            extractChar();
        }
        nextToken = Tokens.INT_LIT;
    } else if (charClass === Tokens.UNKNOWN) {
        lookup();
        extractChar();
    } else if (charClass === Tokens.EOF) {
        lexeme = "EOF";
        nextToken = Tokens.EOF;
    }

    console.log(`Next token is: ${nextToken}, and Lexeme is: '${lexeme}'`);
}

function runLexicalAnalyzer(): void {
    extractChar(); // Start reading the first character
    do {
        analyzeLex();
    } while (nextToken !== Tokens.EOF);
}

runLexicalAnalyzer();
