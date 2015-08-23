
import {Rect} from "../../common";

function targetToTop(model, target, offsetRowNo){
  if(!target){
    return null;
  }
  if(!target.rowNo){
    return null;
  }
  if (target.rowNo < offsetRowNo){
    return -1000;
  }
  // let top = model.columnHeader.height;
  // const items = model.rowHeader.items.skip(offset).toArray();
  //
  // for(let i = 0; i < (target.rowNo - 1 - offset); i++){
  //   top = top + items[i].height;
  // }

  const scrollTop = model.rowHeader.items.get(offsetRowNo).top;
  const rowTop = model.rowHeader.items.get(target.rowNo).top;
  const top = model.columnHeader.height + rowTop - scrollTop;
  return top;
}


function targetToBottom(model, target, offsetRowNo){
  if(!target){
    return null;
  }
  if(!target.rowNo){
    return null;
  }
  if (target.rowNo < offsetRowNo){
    return -1000;
  }

  const scrollTop = model.rowHeader.items.get(offsetRowNo).top;
  const item = model.rowHeader.items.get(target.rowNo);
  const rowTop = item.top;
  const top = model.columnHeader.height + rowTop - scrollTop;
  return top + item.height;
}

// ターゲットの左座標を求める
function targetToLeft(model, target, offsetColumnNo){
  if(!target){
    return null;
  }
  if(!target.columnNo){
    return null;
  }

  if ( target.columnNo < offsetColumnNo){
    return -1000;
  }

  const scrollLeft = model.columnHeader.items.get(offsetColumnNo).left;
  const rowLeft = model.columnHeader.items.get(target.columnNo).left;
  const left = model.rowHeader.width + rowLeft - scrollLeft;
  return left;
}

function targetToRight(model, target, offsetColumnNo){
  if(!target){
    return null;
  }
  if(!target.columnNo){
    return null;
  }

  if ( target.columnNo < offsetColumnNo){
    return -1000;
  }

  const scrollLeft = model.columnHeader.items.get(offsetColumnNo).left;
  const item = model.columnHeader.items.get(target.columnNo);
  const rowLeft = item.left;
  const left = model.rowHeader.width + rowLeft - scrollLeft;
  return left + item.width;
}


function cellRangeToRect(view, cellRange, scroll){
  const offsetColumnNo = (scroll && scroll.columnNo) || 1;
  const offsetRowNo = (scroll && scroll.rowNo) || 1;

  const left = targetToLeft(view, cellRange.leftTopPoint, offsetColumnNo);
  const top = targetToTop(view, cellRange.leftTopPoint, offsetRowNo);
  const right = targetToRight(view, cellRange.rightBottomPoint, offsetColumnNo);
  const bottom = targetToBottom(view, cellRange.rightBottomPoint, offsetRowNo);

  return Rect.forPoints(left, top, right, bottom);
}

// 対象セルの位置を取得する
function targetToRect(model, target, scroll) {
  const offsetColumnNo = (scroll && scroll.columnNo) || 1;
  //const offsetX = offsetColumnNo - 1;
  const offsetRowNo = (scroll && scroll.rowNo) || 1;
  //const offsetY = offsetRowNo - 1;
  const top = targetToTop(model, target, offsetRowNo);
  const left = targetToLeft(model, target, offsetColumnNo);
  const columnItem = model.columnHeader.items.get(target.columnNo);
  if (!columnItem){
    return new Rect(0, 0, 0, 0);
  }
  const width = columnItem.width;
  const rowItem = model.rowHeader.items.get(target.rowNo);
  if (!rowItem){
    return new Rect(0, 0, 0, 0);
  }
  const height = rowItem.height;

  return new Rect(left, top, width, height);
}


export {
  targetToRect,
  cellRangeToRect
};
