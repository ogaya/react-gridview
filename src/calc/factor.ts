
import {isNumber, number} from "./number";
import {isId, id} from "./id";
import {isFunc, func} from "./func";
import {expr} from "./expr";

import {Solver} from "./solver";

// <factor> ::= <text>  | <number> | <id>  | <calc> | '(' <expr> ')'
const factor = function(solver:Solver){

  // エラーがある場合、処理を終了させる
  if (solver.isError){
    return solver;
  }

  // 関数の書式と一致する
  if (isFunc(solver.pointSubstr())){
    return func(solver);
  }

  // 数値の書式と一致する
  if (isNumber(solver.pointSubstr())){
    return number(solver);
  }

  // IDの書式と一致する
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

  return solver;
}

export{
  factor
};
