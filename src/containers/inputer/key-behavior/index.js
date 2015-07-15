import {targetToRect} from "../../../model/lib/target_to_rect";

import {OBJECT_TYPE} from "../../../model/gridview/object-type";
import {SelectInfo} from "../../../model/lib/select";

import {tabDown} from "./tab";
import {enterDown} from "./enter";
import {arrowDown} from "./arrow";

// テキスト入力エリアを表示させる
function viewInputer(e, props){

  // 機能キーは除外
  if (e.keyCode < 48){
    return;
  }

  // inputエリアを表示させる
  const opeModel = props.opeModel;

  const target = opeModel.selectItem && opeModel.selectItem.target;
  if(!target){
    return;
  }

  const rect = targetToRect(props.viewModel, target, opeModel.scroll);
  const input = opeModel.input
    .setIsInputing(true)
    .setRect(rect)
    .setTarget(target);
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

  viewInputer(e, props);

  return true;
}

export{
  inputKeyDown
};
