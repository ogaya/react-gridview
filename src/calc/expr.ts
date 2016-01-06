
import {term} from "./term";

import SolverModel from "./solver";

// <expr>   ::= <term> [ ('+'|'-') <term> ]*
const expr = function(solver){

  if (solver.isError){
    return solver;
  }

  solver = term(solver);
  while (true) {
    let s = solver.pointSubstr(1);

    let exprSolver = SolverModel.createEmpty()
      .setView(solver.sheet)
      .setRefIds(solver.refIds)
      .setText(solver.addPointer().pointSubstr());
    if(s === "+"){

      solver = solver.addPointer();

      exprSolver = term(exprSolver);
      if((exprSolver.isError) || (isNaN(exprSolver.value))){
        return solver.setIsError(true);
      }

      solver = solver
        .setValue(solver.value + exprSolver.value)
        .setRefIds(exprSolver.refIds)
        .setIsError(solver.isError || exprSolver.isError)
        .setPointer(solver.pointer + exprSolver.pointer);
      continue;
    }
    else if(s === "-"){
      solver = solver.addPointer();

      exprSolver = term(exprSolver);
      if((exprSolver.isError) || (isNaN(exprSolver.value))){
        return solver.setIsError(true);
      }
      solver = solver
        .setValue(solver.value - exprSolver.value)
        .setRefIds(exprSolver.refIds)
        .setIsError(solver.isError || exprSolver.isError)
        .setPointer(solver.pointer + exprSolver.pointer);
      continue;
    }
    else{
      return solver;
    }
  }

  return solver;
};

export{
  expr
};
