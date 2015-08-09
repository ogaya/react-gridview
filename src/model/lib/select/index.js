
import {OBJECT_TYPE} from "../../gridview/object-type";

import {Rect, CellPoint, RESIZER_BORDER_WIDTH} from "../../common";
import {SelectInfo} from "./item";

// 列情報取得処理
import {clientPointToColumnInfo} from "./scanColumn";
// 行情報取得処理
import {pointToRowInfo} from "./scanRow";

// 列ヘッダーのピックアップ
function pickColumnHeader(columnInfo, rowInfo, point){
  if (rowInfo.rowNo !== 0) {
    return null;
  }
  const target = new CellPoint(columnInfo.columnNo, rowInfo.rowNo);
  const rect = new Rect(columnInfo.left, rowInfo.top, columnInfo.width, rowInfo.height);

  const objectType = (columnInfo.isRightBorder) ?
    OBJECT_TYPE.COLUMN_RESIZER : OBJECT_TYPE.COLUMN_HEADER;
  return new SelectInfo(objectType, target, rect, point);
}

function pickRowHeader(columnInfo, rowInfo, point){
  if (columnInfo.columnNo !== 0) {
    return null;
  }
  const target = new CellPoint(columnInfo.columnNo, rowInfo.rowNo);

  const rect = new Rect(columnInfo.left, rowInfo.top, columnInfo.width, rowInfo.height);
  const objectType = (rowInfo.isBottomBorder) ?
    OBJECT_TYPE.ROW_RESIZER : OBJECT_TYPE.ROW_HEADER;
  return new SelectInfo(objectType, target, rect, point);
}

function pickCell(columnInfo, rowInfo, point){
  if (rowInfo.rowNo <= 0) {
    return null;
  }
  if (columnInfo.rowNo <= 0) {
    return null;
  }
  const target = new CellPoint(columnInfo.columnNo, rowInfo.rowNo);
  const rect = new Rect(columnInfo.left, rowInfo.top, columnInfo.width, rowInfo.height);
  const objectType = OBJECT_TYPE.CELL;
  return new SelectInfo(objectType, target, rect, point);
}

function pointToGridViewItem(viewModel, opeModel, point, isDrag){

  const columnInfo = clientPointToColumnInfo(viewModel, opeModel, point);
  const rowInfo = pointToRowInfo(viewModel, opeModel, point);

  const isCellDrag = (
    (isDrag) &&
    (opeModel.opeItem) &&
    (opeModel.opeItem.objectType === OBJECT_TYPE.CELL));

  if (!isCellDrag){
    const columnHeader = pickColumnHeader(columnInfo, rowInfo, point);
    if (columnHeader){
      return columnHeader;
    }

    const rowHeader = pickRowHeader(columnInfo, rowInfo, point);
    if (rowHeader){
      return rowHeader;
    }
  }

  const cell = pickCell(columnInfo, rowInfo, point);
  if (cell){
    return cell;
  }
  return  new SelectInfo(OBJECT_TYPE.NONE, null, null, point);
}

export {
  pointToGridViewItem,
  pickColumnHeader,
  SelectInfo
};
