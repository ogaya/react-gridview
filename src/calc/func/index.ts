import {expr} from "../expr";
import {Solver} from "../solver";
import {funcList} from "./def-funcs";

import {CellPoint} from "../../model/common";
import {CellRange} from "../../model/common";


// <func>   ::= [[a-z]|[A-Z]|[0-9]]* '(' <param> ')'
// <param>  ::= (<range>|<expr>) [,(<range>|<expr>)]*
// <range>  ::= [A-Z]+ [0-9]+ : [A-Z]+ [0-9]+
const isFunc = function(text: string) {
    const funcText = text.match(/^([a-z]|[A-Z]|[0-9])+\(.*\)/);

    return (funcText !== null);
};

const isParams = function(text) {
    const paramsText = text.match(/^[A-Z]+[0-9]+:[A-Z]+[0-9]+/);

    return (paramsText !== null);
};

// <param>  ::= (<range>|<expr>) [,(<range>|<expr>)]*
const params = function(solver: Solver, args) {

    if (isParams(solver.pointSubstr())) {
        const id1 = solver.pointSubstr().match(/^[A-Z]+[0-9]+/)[0];
        solver = solver.addPointer(id1.length + 1);
        const id2 = solver.pointSubstr().match(/^[A-Z]+[0-9]+/)[0];
        solver = solver.addPointer(id2.length);
        
        const cellRange = new CellRange(
            CellPoint.fromId(id1),
            CellPoint.fromId(id2));

        const cells = solver.sheet.getCells(cellRange);
        const values = cells
            .map((v) => { return v.value; })
            .toArray();

        cells.forEach((v, k)=> {
            solver = solver.addRefId(k);
        });
        args.push(values);

        return solver;
    }

    solver = expr(solver);
    args.push(solver.value);
    return solver;
};

const func = function(solver: Solver) {
    if (solver.isError) {
        return solver;
    }

    let args = [];
    const funcText = solver.pointSubstr().match(/^([a-z]|[A-Z]|[0-9])+/)[0];
    solver = solver.addPointer(funcText.length + 1);


    // 引数の取得
    let exprSolver = Solver.createEmpty()
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
        let exprSolver = Solver.createEmpty()
            .setView(solver.sheet)
            .setRefIds(solver.refIds)
            .setText(solver.addPointer().pointSubstr());

        // 引数はカンマ区切りのみとする
        if (s === ",") {
            // exprSolver = expr(exprSolver);
            // args.push(exprSolver.value);
            exprSolver = params(exprSolver, args);
            solver = solver
                .setRefIds(exprSolver.refIds)
                .setIsError(solver.isError || exprSolver.isError)
                .addPointer(exprSolver.pointer + 1);
        }
        else if (s !== ")") {
            solver = solver.setIsError(true);
            break;
        }
        else {
            solver = solver.addPointer(1);
            break;
        }
    }

    // 関数の実行
    if (funcList[funcText]) {
        const func = funcList[funcText];
        return solver.setValue(func.apply(null, args));
    }
    return solver.setIsError(true);
}

export {
isFunc,
func
};
