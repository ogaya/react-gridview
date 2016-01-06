import {OBJECT_TYPE} from "../../../model/sheet/object-type";

export function deleteDown(e, props) {
    const opeModel = props.opeModel;

    // 選択ターゲットを取得
    const selectItem = opeModel.selectItem;

    if (!selectItem) {
        return true;
    }

    if (selectItem.objectType !== OBJECT_TYPE.CELL) {
        return true;
    }

    // 選択セルの内容を削除する
    const target = selectItem.cellPoint;
    //const input = props.opeModel.input;

    //props.onValueChange(target, "");

    // 新規操作オブジェクトを作る
    const sheet = props.sheet
        .setValue(target, "")
        .setValueRanges(opeModel.rangeItems, "");

    props.onStateChange(sheet, opeModel);

    return false;
}
