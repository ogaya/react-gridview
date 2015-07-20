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
  const target = selectItem.target;
  const input = props.opeModel.input;

  props.onValueChange(target, "");
  return false;
}

export{
  deleteDown
};
