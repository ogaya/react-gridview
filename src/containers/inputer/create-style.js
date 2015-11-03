import {targetToRect, cellRangeToRect} from "../../model/lib/target_to_rect";
import {OBJECT_TYPE} from "../../model/sheet/object-type";
function createInputStyle(viewModel, opeModel){


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

  const selectItem = opeModel.selectItem;
  if (!selectItem){
    return style;
  }
  if (selectItem.objectType !== OBJECT_TYPE.CELL){
    return style;
  }
  let cellPoint = selectItem.cellPoint;
  if(!cellPoint){
    return style;
  }

  const cell = viewModel.getCell(cellPoint);
  let rect;

  if (cell.mergeRange){
    rect = cellRangeToRect(viewModel, cell.mergeRange, opeModel.scroll);
    cellPoint = cell.mergeRange.leftTopPoint;
  }
  else {
    rect = targetToRect(viewModel, cellPoint, opeModel.scroll);
  }

  style.top = rect.top - 1;
  style.left = rect.left - 1;
  style.width = rect.width - 2;
  style.height = rect.height - 2;

  return style;
}

export{
  createInputStyle
};
