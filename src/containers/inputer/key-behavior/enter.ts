//import {targetToRect} from "../../../model/lib/target_to_rect";
import {fitForTarget} from "../../../model/lib/fit-for-target";
import {OBJECT_TYPE} from "../../../model/sheet/object-type";
import {SelectInfo} from "../../../model/lib/select";

export function enterDown(e, props, keyPress, inputer) {
    const opeModel = props.opeModel;

    // 選択ターゲットを取得
    const selectItem = opeModel.selectItem;

    if (!selectItem) {
        return true;
    }

    if (selectItem.objectType !== OBJECT_TYPE.CELL) {
        return true;
    }

    if ((props.opeModel.input.isInputing) &&
        (keyPress.alt)) {

        const text = props.opeModel.input.text + "\n";
        inputer.setState({ inputText: text });
        return false;
    }

    // 選択セルを下へ移す
    const target = selectItem.cellPoint.setRowNo(selectItem.cellPoint.rowNo + 1);
    //const rect = targetToRect(props.sheet, target, opeModel.scroll);
    const fitScroll = fitForTarget(props.sheet, opeModel, target);
    const newSelectItem = new SelectInfo(selectItem.objectType, target, null, null);

    // 入力状態を解除する
    const input = opeModel.input.setIsInputing(false);

    // 新規操作オブジェクトを作る
    const newOpeModel = opeModel
        .setSelectItem(newSelectItem)
        .resetRange()
        .setScroll(fitScroll)
        .setInput(input);

    props.onStateChange(props.sheet, newOpeModel);
    return false;
}
