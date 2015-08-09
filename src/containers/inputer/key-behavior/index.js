import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";

import {OBJECT_TYPE} from "../../../model/gridview/object-type";
import {SelectInfo} from "../../../model/lib/select";

import {tabDown} from "./tab";
import {enterDown} from "./enter";
import {arrowDown} from "./arrow";
import {deleteDown} from "./delete";

// テキスト入力エリアを表示させる
function viewInputer(e, props){

  // 機能キーは除外
  if (e.keyCode < 48){
    return;
  }

  // inputエリアを表示させる
  const opeModel = props.opeModel;
  const viewModel = props.viewModel;

  let cellPoint = opeModel.selectItem && opeModel.selectItem.cellPoint;
  if(!cellPoint){
    return;
  }

  const cell = viewModel.getCell(cellPoint);
  let rect;
  // if (rangeItem.equals(cell.mergeRange)){
  //   return;
  // }

  if (cell.mergeRange){
    rect = cellRangeToRect(viewModel, cell.mergeRange, opeModel.scroll);
    cellPoint = cell.mergeRange.leftTopPoint;
  }
  else {
    rect = targetToRect(viewModel, cellPoint, opeModel.scroll);
  }

  const input = opeModel.input
    .setIsInputing(true)
    .setRect(rect)
    .setTarget(cellPoint);
  const ope = opeModel.setInput(input);
  //props.onOperationChange(ope);
  props.onStateChange(props.viewModel, ope);
}




// キー入力処理
function inputKeyDown(e, props){

  // tabを押したとき、右に選択セルを移動させる
  if(e.keyCode === 9){
    return tabDown(e, props);
    //return false;
  }

  if(e.keyCode === 13){
    return enterDown(e, props);
  }

  if ((e.keyCode >= 37) && (e.keyCode <= 40) && (!props.opeModel.input.isInputing)){
    return arrowDown(e, props);
  }

  // backspaceキー、deleteキー
  if((e.keyCode === 8) || (e.keyCode === 46)){
    return deleteDown(e, props);
  }

  viewInputer(e, props);

  return true;
}

export{
  inputKeyDown
};
