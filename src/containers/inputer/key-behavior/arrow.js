import {targetToRect} from "../../../model/lib/target_to_rect";
import {fitForTarget} from "../../../model/lib/fit-for-target";
import {OBJECT_TYPE} from "../../../model/gridview/object-type";
import {SelectInfo} from "../../../model/lib/select";


// キーコード入力後のセル位置
function nextRect(keyCode, target){
  switch (keyCode) {
    case 37:  // ← (左矢印)
      if (target.columnNo === 1){
        return target;
      }
      return target.setColumnNo(target.columnNo - 1);
    case 38:  // ↑ (上矢印)
      if (target.rowNo === 1){
        return target;
      }
      return target.setRowNo(target.rowNo - 1);
    case 39:  // → (右矢印)
      return target.setColumnNo(target.columnNo + 1);
    case 40:  // ↓ (下矢印)
      return target.setRowNo(target.rowNo + 1);
    default:
      return target;
  }
}

function arrowDown(e, props){
  let opeModel = props.opeModel;

  // 選択ターゲットを取得
  const selectItem = opeModel.selectItem;

  if (!selectItem){
    return true;
  }

  if(selectItem.objectType !== OBJECT_TYPE.CELL){
    return true;
  }

  // 選択セルを下へ移す
  const target = nextRect(e.keyCode, selectItem.target);
  if (selectItem.target === target){
    return true;
  }

  const fitScroll = fitForTarget(props.viewModel,opeModel , target);
  const newSelectItem = new SelectInfo(selectItem.objectType, target, null, null);

  // 入力状態を解除する
  //const input = opeModel.input.setIsInputing(false);

  // 新規操作オブジェクトを作る
  const newOpeModel = opeModel
    .setSelectItem(newSelectItem)
    .setScroll(fitScroll);

  props.onStateChange(props.viewModel, newOpeModel);
  return false;
}

export{
  arrowDown
};
