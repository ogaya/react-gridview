
import {OBJECT_TYPE} from "../../sheet/object-type";

// 列幅のリサイズ処理
function columnResize(sheet, opeModel) {
  const objectType = opeModel.opeItem && opeModel.opeItem.objectType;
  if (objectType !== OBJECT_TYPE.COLUMN_RESIZER) {
    return sheet;
  }

  const selectItem = opeModel.selectItem;
  if (!selectItem) {
    return sheet;
  }

  // 新しい幅を計算酢る
  const left = selectItem.rect.left;
  const right = opeModel.hoverItem.point.x;
  const width = ((right - left) < 3 ) ? 3 : right - left;

  // 列アイテムの更新
  const columnNo = selectItem.cellPoint.columnNo;
  const columnHeaderItem = sheet.columnHeader.items.get(columnNo);
  const newItem = columnHeaderItem.setWidth(width);
  const newColumnHeader = sheet.columnHeader.setItem(columnNo, newItem);

  return sheet.setColumnHeader(newColumnHeader);

}

function rowResize(sheet, opeModel){
  const objectType = opeModel.opeItem && opeModel.opeItem.objectType;
  if (objectType !== OBJECT_TYPE.ROW_RESIZER) {
    return sheet;
  }

  const selectItem = opeModel.selectItem;
  if (!selectItem) {
    return sheet;
  }

  // 新しい高さを算出する
  const top = selectItem.rect.top;
  const bottom = opeModel.hoverItem.point.y;
  const height = ((bottom - top) < 3) ? 3 : bottom - top;

  // 行アイテムの更新
  const rowNo = selectItem.cellPoint.rowNo;
  const rowHeaderItem = sheet.rowHeader.items.get(rowNo);
  const newItem = rowHeaderItem.setHeight(height);
  const newRowHeader = sheet.rowHeader.setItem(rowNo, newItem);

  return sheet.setRowHeader(newRowHeader);

}

function operationResult(sheet, opeModel){
  const cResizeModel = columnResize(sheet, opeModel);

  if (cResizeModel !== sheet){
    return cResizeModel;
  }

  const rResizeModel = rowResize(sheet, opeModel);

  if (rResizeModel !== sheet){
    return rResizeModel;
  }

  return sheet;
}

export{
  operationResult
};
