
import {factor} from "./factor";
import {Solver} from "./solver";

// <term>   ::= <factor> [ ('*'|'/') <factor> ]*
const term = function(solver:Solver){
  if (solver.isError){
    return solver;
  }

  solver = factor(solver);

  while (true) {
    let tmp = solver.pointSubstr(1);
    let exprSolver = Solver.createEmpty()
      .setView(solver.sheet)
      .setRefIds(solver.refIds)
      .setText(solver.addPointer().pointSubstr());
    if(tmp === "*"){
      solver = solver.addPointer();
      exprSolver = factor(exprSolver);
      if((exprSolver.isError) || (isNaN(exprSolver.value))){
        return solver.setIsError(true);
      }

      solver = solver
        .setValue(solver.value * exprSolver.value)
        .setRefIds(exprSolver.refIds)
        .setIsError(solver.isError || exprSolver.isError)
        .setPointer(solver.pointer + exprSolver.pointer);
      continue;
    }
    else if(tmp === "/"){
      solver = solver.addPointer();
      exprSolver = factor(exprSolver);
      if((exprSolver.isError) || (isNaN(exprSolver.value))){
        return solver.setIsError(true);
      }
      solver = solver
        .setValue(solver.value / exprSolver.value)
        .setRefIds(exprSolver.refIds)
        .setIsError(solver.isError || exprSolver.isError)
        .setPointer(solver.pointer + exprSolver.pointer);
      continue;
    }
    else{
      return solver;
    }
  }
}

export{
  term
};
