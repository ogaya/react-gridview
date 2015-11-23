import {targetToRect, cellRangeToRect} from "../../model/lib/target_to_rect";
import {OBJECT_TYPE} from "../../model/sheet/object-type";
function createInputStyle(sheet, opeModel){


  let style = {
    position: "absolute",
    resize: "none",
    overflow: "hidden",
    fontFamily: "arial"
  };
  const input = opeModel.input;

  // 入力中で無い場合
  if (!input.isInputing){
    // style.left = -1000;
    // style.top = -1000;
    style.width = 0;
    style.bottom = "1px";
    style.left = "1px";
    style.height = 0;
    style.fontSize = 0;
    //style.visibility = "hidden";
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

  const cell = sheet.getCell(cellPoint);
  let rect;

  if (cell.mergeRange){
    rect = cellRangeToRect(sheet, cell.mergeRange, opeModel.scroll);
    cellPoint = cell.mergeRange.leftTopPoint;
  }
  else {
    rect = targetToRect(sheet, cellPoint, opeModel.scroll);
  }

  style.top = rect.top * sheet.scale - 1;
  style.left = rect.left * sheet.scale - 1;
  style.width = rect.width * sheet.scale - 2;
  style.height = rect.height * sheet.scale - 2;

  style.fontSize = sheet.scale * 100 + "%";

  return style;
}

export{
  createInputStyle
};
