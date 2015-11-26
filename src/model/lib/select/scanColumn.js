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

// // 絶対座標の列情報を探す
// function pointToColumnNo(sheet, opeModel, point, firstIndex, lastIndex){
//
//   // if (!splitNum){
//   //   splitNum = 2;
//   // }
//
//   if (!firstIndex){
//     firstIndex = 1;
//   }
//
//   if (!lastIndex){
//     lastIndex = sheet.columnHeader.maxCount;
//   }
//
//   // 上限下限が逆転してしまったら、範囲外にはもう無い
//   if (firstIndex > lastIndex){
//     return 0;
//   }
//
//   // 一区画あたりのセル数（切り上げ）
//   const targetIndex = Math.ceil((firstIndex + lastIndex) / 2);
//   const target = sheet.columnHeader.items.get(targetIndex);
//
//   // ターゲットがもっと左側にある
//   if (point.x < target.left){
//     return pointToColumnNo(sheet, opeModel, point, firstIndex, targetIndex - 1);
//   }
//
//   // ターゲットがもっと右側にある
//   if (point.x > target.right){
//     return pointToColumnNo(sheet, opeModel, point, targetIndex + 1, lastIndex);
//   }
//
//   // 発見
//   return targetIndex;
// }

// 列情報取得
function clientPointToColumnInfo(sheet, opeModel, point){

  // ヘッダー内の場合
  if (point.x <= 0){
    return empty;
  }

  let left = sheet.rowHeader.width;
  const offsetColumn = opeModel.scroll.columnNo;
  const offset = (offsetColumn || 1) - 1;
  if (point.x < left){
    return new ColumnInfo(0, 0, sheet.rowHeader.width, false);
  }

  let columnNo = 0;
  const target = sheet.columnHeader.items.skip(offset).find((item, index) => {
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
  //pointToColumnNo,
  clientPointToColumnInfo
};
