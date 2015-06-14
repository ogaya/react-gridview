
import {OBJECT_TYPE} from "../../gridview/object-type";

import {Rect, Target, RESIZER_BORDER_WIDTH} from "../../common";
import {SelectInfo} from "./item";

// 列情報取得処理
import {pointToColumnInfo} from "./scanColumn";
// 行情報取得処理
import {pointToRowInfo} from "./scanRow";

// 列ヘッダーのピックアップ
function pickColumnHeader(columnInfo, rowInfo){
  if (rowInfo.rowNo !== 0) {
    return null;
  }
  const target = new Target(columnInfo.columnNo, rowInfo.rowNo);
  if (columnInfo.isRightBorder) {
    const left = columnInfo.left + columnInfo.width - RESIZER_BORDER_WIDTH;
    const rect = new Rect(left, rowInfo.top, RESIZER_BORDER_WIDTH * 2, rowInfo.height);
    const objectType = OBJECT_TYPE.COLUMN_RESIZER;
    return new SelectInfo(objectType, target, rect);
  }
  else {
    const rect = new Rect(columnInfo.left, rowInfo.top, columnInfo.width, rowInfo.height);
    const objectType = OBJECT_TYPE.COLUMN_HEADER;
    return new SelectInfo(objectType, target, rect);
  }
}


function pointToGridViewItem(viewModel, opeModel, point){

  const columnInfo = pointToColumnInfo(viewModel, opeModel, point);
  const rowInfo = pointToRowInfo(viewModel, opeModel, point);

  const columnHeader = pickColumnHeader(columnInfo, rowInfo);
  if (columnHeader){
    return columnHeader;
  }

  return new SelectInfo();
}

export default{
  pointToGridViewItem
};
export {
  pickColumnHeader
};
