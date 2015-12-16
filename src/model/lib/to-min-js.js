const toMinJS = (src, base, Base) =>{
  const d = base || Base.create();
  let json = {};
  src.forEach((value, key) =>{
    const dValue = d.get(key);
    if ((value) && (value.toMinJS)){
      const minJS = value.toMinJS(dValue);
      if (Object.keys(minJS).length){
        json[key] = minJS;
      }
      return;
    }
    if (dValue !== value){
      json[key] = value;
    }
  });
  return json;
};

export{
  toMinJS as default
};
