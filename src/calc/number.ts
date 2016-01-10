import {Solver} from "./solver";

// <number> :== [0-9]+[\.]?[0-9]*

export function isNumber(text:string) {
    const numberText = text.match(/^[0-9]+[\.]?[0-9]*/);
    return (numberText !== null);
};

export function number(solver:Solver) {

    if (solver.isError) {
        return solver;
    }
    

    const numberText = solver.pointSubstr().match(/^[0-9]+[\.]?[0-9]*/)[0];
    if (isNumber(numberText) === true) {
        solver = solver
            .setValue(Number(numberText))
            .addPointer(numberText.length);
    }
    else {
        solver = solver.setIsError(true);
    }

    return solver;
}
