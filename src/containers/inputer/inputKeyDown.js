import {targetToRect} from "../../model/lib/target_to_rect";

import {OBJECT_TYPE} from "../../model/gridview/object-type";
import {SelectInfo} from "../../model/lib/select";

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

// セルの操作祖処理
function tabKeyDown(e, props){
  const opeModel = props.opeModel;

  // 選択ターゲットを取得
  const selectItem = opeModel.selectItem;

  if (!selectItem){
    return true;
  }

  if(selectItem.objectType !== OBJECT_TYPE.CELL){
    return true;
  }

  // 選択セルを右へ移す
  const target = selectItem.target.setColumnNo(selectItem.target.columnNo + 1);
  const rect = targetToRect(props.viewModel, target, opeModel.scroll);
  const newSelectItem = new SelectInfo(selectItem.objectType, target, null, rect);

  // 入力状態を解除する
  const input = opeModel.input.setIsInputing(false);

  // 新規操作オブジェクトを作る
  const newOpeModel = opeModel
    .setSelectItem(newSelectItem)
    .setInput(input);

  props.onStateChange(props.viewModel, newOpeModel);
  return false;
}

function enterKeyDown(e, props){
  const opeModel = props.opeModel;

  // 選択ターゲットを取得
  const selectItem = opeModel.selectItem;

  if (!selectItem){
    return true;
  }

  if(selectItem.objectType !== OBJECT_TYPE.CELL){
    return true;
  }

  // 選択セルを下へ移す
  const target = selectItem.target.setRowNo(selectItem.target.rowNo + 1);
  const rect = targetToRect(props.viewModel, target, opeModel.scroll);
  const newSelectItem = new SelectInfo(selectItem.objectType, target, null, rect);

  // 入力状態を解除する
  const input = opeModel.input.setIsInputing(false);

  // 新規操作オブジェクトを作る
  const newOpeModel = opeModel
    .setSelectItem(newSelectItem)
    .setInput(input);

  props.onStateChange(props.viewModel, newOpeModel);
  return false;
}

// キー入力処理
function inputKeyDown(e, props){

  // tabを押したとき、右に選択セルを移動させる
  if(e.keyCode === 9){
    return tabKeyDown(e, props);
    //return false;
  }

  if(e.keyCode === 13){
    return enterKeyDown(e, props);
  }

  viewInputer(e, props);

  return true;
}

export{
  inputKeyDown
};
