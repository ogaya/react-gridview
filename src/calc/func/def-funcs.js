const sum = function(){
  const args = Array.prototype.concat.apply([], arguments);
  let value = 0;
  for(var id in args){
    value = value + args[id];
  }

  return value;
};

const avg = function(){
  const args = Array.prototype.concat.apply([], arguments);
  const sumValue = sum.apply(null, args);

  return sumValue / args.length;
}


const funcList = {
  "SUM": sum,
  "AVG": avg
};
export{
  funcList
};
