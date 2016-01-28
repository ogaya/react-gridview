import {Set} from "immutable";

// <block>  ::=  '=' <expr>
// <expr>   ::= <term> [ ('+'|'-') <term> ]*
// <term>   ::= <factor> [ ('*'|'/') <factor> ]*
// <func>   ::= [[a-z]|[A-Z]|[0-9]]* '(' <param> ')'
// <factor> ::= <text>  | <func>  | <number> | <id> | '(' <expr> ')'
// <id>     ::= [A-Z]+ [0-9]+
//
// <number> :== [0-9]+[\.]?[0-9]*
// <text>   ::= '"' [*]  '"'
// <param>  ::= (<range>|<expr>) [,(<range>|<expr>)]*
// <range>  ::= [A-Z]+ [0-9]+ : [A-Z]+ [0-9]+


import {Solver} from "./solver";
import {expr} from "./expr";

import {Sheet} from "../model/sheet";
export interface ICalc{
    value: any;
    refs: Set<string>;
    isError: boolean;
};

export function isCalc(text:string) {
    const tmp = text + "";
    return (tmp.charAt(0) === "=");
};
export function calc(text:string, sheet?:Sheet):ICalc {
    if (!text) {
        return {
            value: text,
            refs: <Set<string>>Set(),
            isError: false
        };
    }
    text = text + "";
    if (isCalc(text) === false) {
        return {
            value: text,
            refs: <Set<string>>Set(),
            isError: false
        };
    }
    let solver = Solver.createEmpty()
        .setText(text.substr(1))
        .setView(sheet);

    solver = expr(solver);

    return {
        value: solver.value,
        refs: solver.refIds,
        isError: solver.isError
    };

};

// export {
// calc,
// isCalc
// };
