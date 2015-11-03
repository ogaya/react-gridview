
import {OBJECT_TYPE} from "../../sheet/object-type";

// 列幅のリサイズ処理
function columnResize(viewModel, opeModel) {
  const objectType = opeModel.opeItem && opeModel.opeItem.objectType;
  if (objectType !== OBJECT_TYPE.COLUMN_RESIZER) {
    return viewModel;
  }

  const selectItem = opeModel.selectItem;
  if (!selectItem) {
    return viewModel;
  }

  // 新しい幅を計算酢る
  const left = selectItem.rect.left;
  const right = opeModel.hoverItem.point.x;
  const width = ((right - left) < 3 ) ? 3 : right - left;

  // 列アイテムの更新
  const columnNo = selectItem.cellPoint.columnNo;
  const columnHeaderItem = viewModel.columnHeader.items.get(columnNo);
  const newItem = columnHeaderItem.setWidth(width);
  const newColumnHeader = viewModel.columnHeader.setItem(columnNo, newItem);

  return viewModel.setColumnHeader(newColumnHeader);

}

function rowResize(viewModel, opeModel){
  const objectType = opeModel.opeItem && opeModel.opeItem.objectType;
  if (objectType !== OBJECT_TYPE.ROW_RESIZER) {
    return viewModel;
  }

  const selectItem = opeModel.selectItem;
  if (!selectItem) {
    return viewModel;
  }

  // 新しい高さを算出する
  const top = selectItem.rect.top;
  const bottom = opeModel.hoverItem.point.y;
  const height = ((bottom - top) < 3) ? 3 : bottom - top;

  // 行アイテムの更新
  const rowNo = selectItem.cellPoint.rowNo;
  const rowHeaderItem = viewModel.rowHeader.items.get(rowNo);
  const newItem = rowHeaderItem.setHeight(height);
  const newRowHeader = viewModel.rowHeader.setItem(rowNo, newItem);

  return viewModel.setRowHeader(newRowHeader);

}

function operationResult(viewModel, opeModel){
  const cResizeModel = columnResize(viewModel, opeModel);

  if (cResizeModel !== viewModel){
    return cResizeModel;
  }

  const rResizeModel = rowResize(viewModel, opeModel);

  if (rResizeModel !== viewModel){
    return rResizeModel;
  }

  return viewModel;
}

export{
  operationResult
};
