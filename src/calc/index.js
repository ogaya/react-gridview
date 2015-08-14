// <block>  ::=  '=' <expr>
// <expr>   ::= <term> [ ('+'|'-') <term> ]*
// <term>   ::= <factor> [ ('*'|'/') <factor> ]*
// <calc>   ::= [a-z]* '(' <factor> [ ',' <factor> ')'
// <factor> ::= <number> | '(' <expr> ')' | <calc>
// <id>     ::= [a-z]+ [0-9]+
//
// <number> :== [0-9]+
// <text>   ::= '"' [*]  '"'
