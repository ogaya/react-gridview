
import {isNumber, number} from "./number";
import {isId, id} from "./id";
import {isFunc, func} from "./func";
import {expr} from "./expr";

// <factor> ::= <text>  | <number> | <id>  | <calc> | '(' <expr> ')'
const factor = function(solver){

  if (solver.isError){
    return solver;
  }

  if (isFunc(solver.pointSubstr())){
    return func(solver);
  }

  if (isNumber(solver.pointSubstr())){
    return number(solver);
  }

  if (isId(solver.pointSubstr())){
    return id(solver);
  }

  let s = solver.pointSubstr(1);
  if(s === "("){
    solver = solver.addPointer(1);
    solver = expr(solver);
    s = solver.pointSubstr(1);
    if (s !== ")"){
      solver = solver.setIsError(true);
    }
    else{
      solver = solver.addPointer(1);
    }

  }

  // const numberText = solver.text.match(/[0-9]+[\.]?[0-9]*/)[0];
  // if(isNaN(numberText) === false){
  //   solver = solver
  //     .setValue(Number(numberText))
  //     .setPointer(numberText.length);
  // }
  // else{
  //   selver = solver.setIsError(true);
  // }

  return solver;
}

export{
  factor
};
