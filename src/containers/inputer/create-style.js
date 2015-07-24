
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
  style.top = input.rect.top - 1;
  style.left = input.rect.left - 1;
  style.width = input.rect.width;
  style.height = input.rect.height;

  return style;
}

export{
  createInputStyle
};
