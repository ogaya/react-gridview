import {Rect} from "../../../model/common";

function targetToTop(model, target){

  if(!target.rowNo){
    return null;
  }

  let top = model.columnHeader.height;
  const items = model.rowHeader.items.toArray();

  for(let i = 0; i < (target.rowNo - 1); i++){
    top = top + items[i].height;
  }
  return top;
}

// ターゲットの左座標を求める
function targetToLeft(model, target){

  if(!target.columnNo){
    return null;
  }

  let left = model.rowHeader.width;
  const items = model.columnHeader.items.toArray();
  for(let i = 0; i < (target.columnNo - 1); i++){
    left = left + items[i].width;
  }

  return left;
}

export function targetToRect(model, target) {
  const top = targetToTop(model, target);
  const left = targetToLeft(model, target);
  const width = model.columnHeader.items.get(target.columnNo).width;
  const height = model.rowHeader.items.get(target.rowNo).height;

  return new Rect(left, top, width, height);
}
