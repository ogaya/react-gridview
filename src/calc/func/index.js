import {expr} from "../expr";
import SolverModel from "../solver";
import {funcList} from "./def-funcs";

import {CellPoint} from "../../model/common";
import {CellRange} from "../../model/common/cellrange";


// <func>   ::= [[a-z]|[A-Z]|[0-9]]* '(' <param> ')'
// <param>  ::= (<range>|<expr>) [,(<range>|<expr>)]*
// <range>  ::= [A-Z]+ [0-9]+ : [A-Z]+ [0-9]+
const isFunc = function(text){
  const funcText = text.match(/^([a-z]|[A-Z]|[0-9])+\(.*\)/);

  return (funcText !== null);
};

const isParams = function(text){
  const paramsText = text.match(/^[A-Z]+[0-9]+:[A-Z]+[0-9]+/);

  return (paramsText !== null);
};

// <param>  ::= (<range>|<expr>) [,(<range>|<expr>)]*
const params = function(solver, args){

  if (isParams(solver.pointSubstr())){
    const id1 = solver.pointSubstr().match(/^[A-Z]+[0-9]+/)[0];
    solver = solver.addPointer(id1.length + 1);
    const id2 = solver.pointSubstr().match(/^[A-Z]+[0-9]+/)[0];
    solver = solver.addPointer(id2.length);

    const cellRange = new CellRange(
      CellPoint.createForId(id1),
      CellPoint.createForId(id2));

    const cells = solver.sheet.getCells(cellRange);
    const values = cells
      .map((cell)=>{return cell.value;})
      .toArray();

    cells.forEach(cell=>{
      const cellPoint = new CellPoint(cell.columnNo, cell.rowNo);
      solver = solver.addRefId(cellPoint.toId());
    });
    args.push(values);

    return solver;
  }

  solver = expr(solver);
  args.push(solver.value);
  return solver;
};

const func = function(solver){
  if (solver.isError){
    return solver;
  }

  let args = [];
  const funcText = solver.pointSubstr().match(/^([a-z]|[A-Z]|[0-9])+/)[0];
  solver = solver.addPointer(funcText.length + 1);


  // 引数の取得
  let exprSolver = SolverModel.createEmpty()
    .setView(solver.sheet)
    .setRefIds(solver.refIds)
    .setText(solver.pointSubstr());

  // exprSolver = expr(exprSolver);
  // args.push(exprSolver.value);
  exprSolver = params(exprSolver, args);
  solver = solver
    .setRefIds(exprSolver.refIds)
    .setIsError(solver.isError || exprSolver.isError)
    .addPointer(exprSolver.pointer);

  // ２つ目以降の引数を取得
  while (true) {

    let s = solver.pointSubstr(1);
    let exprSolver = SolverModel.createEmpty()
      .setView(solver.sheet)
      .setRefIds(solver.refIds)
      .setText(solver.addPointer().pointSubstr());

    // 引数はカンマ区切りのみとする
    if(s === ","){
      // exprSolver = expr(exprSolver);
      // args.push(exprSolver.value);
      exprSolver = params(exprSolver, args);
      solver = solver
        .setRefIds(exprSolver.refIds)
        .setIsError(solver.isError || exprSolver.isError)
        .addPointer(exprSolver.pointer + 1);
    }
    else if (s !== ")"){
      solver = solver.setIsError(true);
      break;
    }
    else{
      solver = solver.addPointer(1);
      break;
    }
  }

  // 関数の実行
  if(funcList[funcText]){
    const func = funcList[funcText];
    return solver.setValue(func.apply(null, args));
  }
  return solver.setIsError(true);
}

export{
  isFunc,
  func
};
