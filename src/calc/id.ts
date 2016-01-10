
import {Solver} from "./solver";

// <id>     ::= [A-Z]+ [0-9]+

export function isId (text:string) {
    const idText = text.match(/^[A-Z]+[0-9]+/);
    return (idText !== null);
};

export function id(solver:Solver) {

    if (solver.isError) {
        return solver;
    }

    const idText = solver.pointSubstr().match(/^[A-Z]+[0-9]+/)[0];
    const value = solver.sheet.getValueForId(idText);
    return solver
        .setValue(Number(value))
        .addRefId(idText)
        .addPointer(idText.length);
};
