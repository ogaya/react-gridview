
function createInputStyle(opeModel){
  let style = {
    position: "absolute"
  };
  const input = opeModel.input;

  // 入力中で無い場合
  if (!input.isInputing){
    style.left = -100;
    style.width = 0;
    return style;
  }

  if (!input.rect){
    return style;
  }
  style.top = input.rect.top;
  style.left = input.rect.left;
  style.width = input.rect.width;
  style.height = input.rect.height;

  return style;
}

export{
  createInputStyle
};
