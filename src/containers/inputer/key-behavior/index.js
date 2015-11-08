//import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";

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
  const sheet = props.sheet;

  let cellPoint = opeModel.selectItem && opeModel.selectItem.cellPoint;
  if(!cellPoint){
    return;
  }

  const cell = sheet.getCell(cellPoint);
  //let rect;

  if (cell.mergeRange){
    //rect = cellRangeToRect(sheet, cell.mergeRange, opeModel.scroll);
    cellPoint = cell.mergeRange.leftTopPoint;
  }
  // else {
  //   rect = targetToRect(sheet, cellPoint, opeModel.scroll);
  // }

  const input = opeModel.input
    .setIsInputing(true);
    //.setRect(rect)
    //.setTarget(cellPoint);
  const ope = opeModel
    .setInput(input)
    .setCopyingRange(null);

  //props.onOperationChange(ope);
  props.onStateChange(props.sheet, ope);
}

// キー入力処理
function inputKeyDown(e, inputer){

  const props = inputer.props;
  const keyPress = inputer._keyPress;

  // tabを押したとき、右に選択セルを移動させる
  if(e.keyCode === 9){
    return tabDown(e, props);
    //return false;
  }

  // 円ターキーを押したとき、洗濯セルを下へ移動させる
  if(e.keyCode === 13){
    return enterDown(e, props, keyPress, inputer);
  }

  if ((e.keyCode >= 37) && (e.keyCode <= 40) && (!props.opeModel.input.isInputing)){
    return arrowDown(e, props, keyPress, inputer);
  }

  // backspaceキー、deleteキー
  if((!props.opeModel.input.isInputing) &&
     ((e.keyCode === 8) || (e.keyCode === 46))){
    return deleteDown(e, props);
  }

  // ctrl + c
  if((!props.opeModel.input.isInputing) &&
     (keyPress.ctrl === true) && (e.keyCode === 67)){
    //return copyDown(e, props);
  }
  else if((!props.opeModel.input.isInputing) &&
          (keyPress.ctrl === true) && (e.keyCode === 86)){
    //return copyDown(e, props);
  }
  else{
    viewInputer(e, props);
  }



  return true;
}

export{
  inputKeyDown
};
