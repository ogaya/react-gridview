import {Rect} from "../../../model/common";

function targetToTop(model, target, offset){

  if(!target.rowNo){
    return null;
  }
  if (target.rowNo < offset){
    return -1000;
  }
  let top = model.columnHeader.height;
  const items = model.rowHeader.items.skip(offset).toArray();

  for(let i = 0; i < (target.rowNo - 1 - offset); i++){
    top = top + items[i].height;
  }
  return top;
}

// ターゲットの左座標を求める
function targetToLeft(model, target, offset){

  if(!target.columnNo){
    return null;
  }

  if ( target.columnNo < offset){
    return -1000;
  }

  let left = model.rowHeader.width;
  const items = model.columnHeader.items.skip(offset).toArray();
  for(let i = 0; i < (target.columnNo - 1 - offset); i++){
    left = left + items[i].width;
  }

  return left;
}

// 対象セルの位置を取得する
export function targetToRect(model, target, scroll) {
  const offsetColumnNo = (scroll && scroll.columnNo) || 1;
  const offsetX = offsetColumnNo - 1;
  const offsetRowNo = (scroll && scroll.rowNo) || 1;
  const offsetY = offsetRowNo - 1;
  const top = targetToTop(model, target, offsetY);
  const left = targetToLeft(model, target, offsetX);
  const width = model.columnHeader.items.get(target.columnNo).width;
  const height = model.rowHeader.items.get(target.rowNo).height;

  return new Rect(left, top, width, height);
}
