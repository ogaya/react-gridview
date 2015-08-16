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


import SolverModel from "./solver";
import {expr} from "./expr";

const calc = function(text, view){
  if(!text){
    return {
      value: text,
      refs: Set(),
      isError: false
    };
  }
  text = text + "";
  if(text.charAt(0) !== "="){
    return {
      value: text,
      refs: Set(),
      isError: false
    };
  }
  let solver = SolverModel.createEmpty()
    .setText(text.substr(1))
    .setView(view);

  solver = expr(solver);
  return {
    value: solver.value,
    refs: solver.refIds,
    isError: solver.isError
  };

};

export{
  calc
};
