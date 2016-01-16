//import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";

import {tabDown} from "./tab";
import {enterDown} from "./enter";
import {arrowDown} from "./arrow";
import {deleteDown} from "./delete";

import {InputerProps} from "../index.tsx";

// キー入力処理
export function inputKeyDown(e:KeyboardEvent, inputer) {

    const props:InputerProps = inputer.props;
    const keyPress = inputer._keyPress;

    // tabを押したとき、右に選択セルを移動させる
    if (e.keyCode === 9) {
        return tabDown(e, props);
        //return false;
    }

    // エンターキーを押したとき、洗濯セルを下へ移動させる
    if (e.keyCode === 13) {
        return enterDown(e, props, keyPress, inputer);
    }

    if ((e.keyCode >= 37) && (e.keyCode <= 40) && (!props.opeModel.input.isInputing)) {
        return arrowDown(e, props, keyPress, inputer);
    }

    // backspaceキー、deleteキー
    if ((!props.opeModel.input.isInputing) &&
        ((e.keyCode === 8) || (e.keyCode === 46))) {
        return deleteDown(e, props);
    }

    return true;
}
