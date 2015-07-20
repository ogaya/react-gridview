import {Record} from "immutable";
import {OBJECT_TYPE} from "../../gridview/object-type";

// セル選択モデル
class Range extends Record({
  target1: null,
  target2: null
}) {

  constructor(target1, target2) {
    super({
      target1: target1,
      target2: target2
    });
  }
}

function opeModelToRangeItem(opeModel){

  const opeItem = opeModel.opeItem;
  const hoverItem = opeModel.hoverItem;

  // 操作中オブジェクトがセルで無い場合、範囲選択しない
  if ((!opeItem) || (opeItem.objectType !== OBJECT_TYPE.CELL)){
    return opeModel.rangeItem;
  }

  // ホバーアイテムがセルで無い場合、前回の範囲選択情報のままとする。
  if ((!hoverItem) || (hoverItem.objectType !== OBJECT_TYPE.CELL)){
    return opeModel.rangeItem;
  }

  if((opeItem.target.columnNo === hoverItem.target.columnNo) &&
     (opeItem.target.rowNo === hoverItem.target.rowNo)){
    return null;
  }

  return new Range(opeItem.target, hoverItem.target);
}


export default {
  Range,
  opeModelToRangeItem
};
