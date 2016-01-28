import {Record} from "immutable";
import {CellRange} from "./cell-range";
import {Sheet} from "../sheet";


/**
 * ウィンドウ固定枠
 */
export class FreezePane extends Record({
    topLeft: null,
    bottomRight: null
}) {
    // 左上の固定範囲
    topLeft: CellRange;
    // 右下の固定範囲
    bottomRight: CellRange;

    // コンストラクタ
    constructor(topLeft: CellRange, bottomRight: CellRange) {
        super({
            topLeft: topLeft,
            bottomRight: bottomRight
        });
    }

    public static create(topLeft: CellRange, bottomRight: CellRange) {
        return new FreezePane(topLeft, bottomRight);
    }

    public static fromJS(json) {
        if (!json) {
            return null;
        }

        return new FreezePane(
            CellRange.fromJS(json.topLeft),
            CellRange.fromJS(json.bottomRight)
        );
    }

    toMinJS() {
        let json: any = {};
        if ((this.topLeft === null) ||
            (this.bottomRight === null)) {
            return json;
        }

        if (this.topLeft !== null) {
            json.topLeft = this.topLeft.toJS();
        }
        if (this.bottomRight !== null) {
            json.bottomRight = this.bottomRight.toJS();
        }
        return json;
    }


    /**
     * 値の等価性判定
     */
    equals(freezePan: FreezePane) {
        if (!freezePan) {
            return false;
        }

        if (this.topLeft.equals(freezePan.topLeft)) {
            return false;
        }

        if (this.bottomRight.equals(freezePan.bottomRight)) {
            return false;
        }

        return true;
    }
}


/**
 * 固定枠（上側）の高さを取得
 */
export function getFreezePanTopHeight(freezePane:FreezePane, sheet:Sheet){
    if ((!freezePane) || (!freezePane.topLeft)){
        return 0;
    }
    const max = sheet.rowHeader.items.get(freezePane.topLeft.maxRowNo).bottom;
    if (freezePane.topLeft.minRowNo === 0){
        return max;
    }
    const min = sheet.rowHeader.items.get(freezePane.topLeft.minRowNo).bottom;
    return max - min;
}

/**
 * 固定枠（下側）の高さを取得
 */
export function getFreezePanBottomHeight(freezePane:FreezePane, sheet:Sheet){
    if ((!freezePane) || (!freezePane.bottomRight)){
        return 0;
    }
    const max = sheet.rowHeader.items.get(freezePane.bottomRight.maxRowNo).bottom;
    const min = sheet.rowHeader.items.get(freezePane.bottomRight.minRowNo).bottom;
    return max - min;
}

/**
 * 固定枠（左側）の幅を取得
 */
export function getFreezePanLeftWidth(freezePane:FreezePane, sheet:Sheet){
    if ((!freezePane) || (!freezePane.topLeft)){
        return 0;
    }
    const max = sheet.columnHeader.items.get(freezePane.topLeft.maxColumnNo).right;
    if (freezePane.topLeft.minColumnNo === 0){
        return max;
    }
    const min = sheet.columnHeader.items.get(freezePane.topLeft.minColumnNo).right;
    return max - min;
}

/**
 * 固定枠（右側）の幅を取得
 */
export function getFreezePanRightWidth(freezePane:FreezePane, sheet:Sheet){
    if ((!freezePane) || (!freezePane.bottomRight)){
        return 0;
    }
    const max = sheet.columnHeader.items.get(freezePane.bottomRight.maxColumnNo).right;
    const min = sheet.columnHeader.items.get(freezePane.bottomRight.minColumnNo).right;
    return max - min;
}
