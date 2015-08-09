import {targetToRect} from "../../../model/lib/target_to_rect";
import {OBJECT_TYPE} from "../../../model/gridview/object-type";
import {SelectInfo} from "../../../model/lib/select";

function deleteDown(e, props){
  const opeModel = props.opeModel;

  // 選択ターゲットを取得
  const selectItem = opeModel.selectItem;

  if (!selectItem){
    return true;
  }

  if(selectItem.objectType !== OBJECT_TYPE.CELL){
    return true;
  }

  // 選択セルの内容を削除する
  const target = selectItem.cellPoint;
  const input = props.opeModel.input;

  //props.onValueChange(target, "");

  // 新規操作オブジェクトを作る
  const viewModel = props.viewModel
    .setValue(target, "")
    .setValueRange(opeModel.rangeItem, "");

  props.onStateChange(viewModel, opeModel);

  return false;
}

export{
  deleteDown
};
