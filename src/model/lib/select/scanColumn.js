import {Record} from "immutable";
import {RESIZER_BORDER_WIDTH} from "../../common";

// 列情報
class ColumnInfo extends Record({
  columnNo: -1,
  left: 0,
  width: 0,
  isRightBorder: false
}) {

  constructor(columnNo, left, width, isRightBorder) {
    super({
      columnNo: columnNo,
      left: left,
      width: width,
      isRightBorder: isRightBorder
    });
  }
}

const empty = new ColumnInfo(-1, 0, 0, false);

// 列情報取得
function pointToColumnInfo(viewModel, opeModel, point){

  // ヘッダー内の場合
  if (point.x <= 0){
    return empty;
  }

  let left = viewModel.rowHeader.width;
  const offsetColumn = opeModel.scroll.columnNo;
  const offset = (offsetColumn || 1) - 1;
  if (point.x < left){
    return new ColumnInfo(0, 0, viewModel.rowHeader.width, false);
  }

  let columnNo = 0;
  const target = viewModel.columnHeader.items.skip(offset).find((item, index) => {
    const nextLeft = left + item.width;
    columnNo = index;
    if ((left <= point.x) && (point.x < (nextLeft + RESIZER_BORDER_WIDTH))){
      return true;
    }
    left = nextLeft;
    return false;
  });
  if (!target){
    return empty;
  }
  const diffX = point.x - (left + target.width);
  const isRightBorder = Math.abs(diffX) < RESIZER_BORDER_WIDTH;
  return new ColumnInfo(columnNo, left, target.width, isRightBorder);
}

export default {
  ColumnInfo,
  pointToColumnInfo
};
