
function createInputStyle(opeModel){
  let style = {
    position: "absolute",
    resize: "none",
    overflow: "hidden",
    fontFamily: "arial"
  };
  const input = opeModel.input;

  // 入力中で無い場合
  if (!input.isInputing){
    style.left = -1000;
    style.top = -1000;
    style.width = 0;
    return style;
  }

  if (!input.rect){
    return style;
  }
  style.top = input.rect.top - 1;
  style.left = input.rect.left - 1;
  style.width = input.rect.width - 2;
  style.height = input.rect.height - 2;

  return style;
}

export{
  createInputStyle
};
