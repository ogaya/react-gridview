// <id>     ::= [A-Z]+ [0-9]+

const isId = function(text){
  const idText = text.match(/^[A-Z]+[0-9]+/);
  return (idText !== null);
};

const id = function(solver){

  if (solver.isError){
    return solver;
  }

  const idText = solver.pointSubstr().match(/^[A-Z]+[0-9]+/)[0];
  const value = solver.view.getValueForId(idText);
  return solver
    .setValue(Number(value))
    .addRefId(idText)
    .addPointer(idText.length);
}

export{
  isId,
  id
};
