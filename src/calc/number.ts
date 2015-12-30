// <number> :== [0-9]+[\.]?[0-9]*

export function isNumber(text) {
    const numberText = text.match(/^[0-9]+[\.]?[0-9]*/);
    return (numberText !== null);
};

export function number(solver) {

    if (solver.isError) {
        return solver;
    }

    const numberText = solver.pointSubstr().match(/^[0-9]+[\.]?[0-9]*/)[0];
    if (isNaN(numberText) === false) {
        solver = solver
            .setValue(Number(numberText))
            .addPointer(numberText.length);
    }
    else {
        solver = solver.setIsError(true);
    }

    return solver;
}

// export{
//   isNumber,
//   number
// };
