import {Record, List}from "immutable";
import {InputModel} from "./input";
import {CellPoint, Rect} from "../common";
import {OBJECT_TYPE} from "../sheet/object-type";
import {CellRange} from "../common";
import {SelectInfo} from "../lib/select";

function objectCursor(objectType) {
    switch (objectType) {
        case OBJECT_TYPE.CELL:
            return "pointer";
        case OBJECT_TYPE.COLUMN_RESIZER:
            return "col-resize";
        case OBJECT_TYPE.ROW_RESIZER:
            return "row-resize";
        case OBJECT_TYPE.COLUMN_HEADER:
            return "pointer";
        case OBJECT_TYPE.ROW_HEADER:
            return "pointer";
        default:
            return "default";
    }
}

export class Operation extends Record({
    input: new InputModel(),
    selectItem: null,
    opeItem: null,
    hoverItem: null,
    rangeItem: null,
    copyingRange: null,
    clipRanges: List(),
    canvasRect: null,
    scroll: new CellPoint(1, 1)
}) {

    input: InputModel;
    selectItem: SelectInfo;
    opeItem: SelectInfo;
    hoverItem: SelectInfo;
    rangeItem: CellRange;
    copyingRange: CellRange;
    clipRanges: List<CellRange>;
    canvasRect: Rect;
    scroll: CellPoint;

    static create() {
        return new Operation();
    }

    static createClass() {
        return new Operation();
    }

    get rangeItems() {
        if (!this.rangeItem) {
            return this.clipRanges;
        }
        return this.clipRanges.push(this.rangeItem);
    }

    /**
     * 入力状態設定
     * @param {InputModel} input 入力状態
     * @return {Operation}        更新した自身
     */
    setInput(input: InputModel) {
        return <Operation>this.set("input", input);
    }

    setSelectItem(selectItem: SelectInfo) {
        return <Operation>this.set("selectItem", selectItem);
    }

    setScroll(scroll: CellPoint) {
        return <Operation>this.set("scroll", scroll);
    }

    editScroll(mutator: (scroll: CellPoint) => CellPoint) {
        return <Operation>this.set("scroll", mutator(this.scroll));
    }

    setHoverItem(hoverItem: SelectInfo) {
        return <Operation>this.set("hoverItem", hoverItem);
    }

    setOpeItem(opeItem: SelectInfo) {
        return <Operation>this.set("opeItem", opeItem);
    }

    setRangeItem(rangeItem: CellRange) {
        return <Operation>this.set("rangeItem", rangeItem);
    }

    /**
     * 保持中の選択範囲を追加する
     * @param  {CellRange} rangeItem 選択範囲
     * @return {Operation} 更新した自身
     */
    pushClipRanges(rangeItem: CellRange) {
        return <Operation>this.set("clipRanges", this.clipRanges.push(rangeItem));
    }

    downSelect() {
        if (!this.selectItem) {
            return <Operation>this;
        }
        // 選択セルを下へ移す
        const target = this.selectItem.cellPoint.setRowNo(this.selectItem.cellPoint.rowNo + 1);

        const selectItem = new SelectInfo(this.selectItem.objectType, target, null, null);
        return this.setSelectItem(selectItem).resetRange();
    }

    /**
     * 保持中の選択範囲を削除する
     * @return {Operation} 更新した自身
     */
    clearClipRanges() {
        return <Operation>this.set("clipRanges", this.clipRanges.clear());
    }

    setCanvasRect(canvasRect: Rect) {
        return <Operation>this.set("canvasRect", canvasRect);
    }

    setCopyingRange(copyingRange: CellRange) {
        return <Operation>this.set("copyingRange", copyingRange);
    }

    resetRange() {
        const target = this.selectItem.cellPoint;
        const range = new CellRange(target, target);
        return <Operation>this.setRangeItem(range);
    }

    opeCursor() {
        if (!this.opeItem) {
            return null;
        }

        // マウスの下にあるオブジェクトのタイプ
        const objectType = this.opeItem.objectType;
        return objectCursor(objectType);
    }

    get HoverCursor() {

        // 操作中のオブジェクトに対するマウスカーソルを変更する
        const opeCursor = this.opeCursor();
        if (opeCursor) {
            return opeCursor;
        }

        if (!this.hoverItem) {
            return "default";
        }


        // マウスの下にあるオブジェクトのタイプ
        const objectType = this.hoverItem.objectType;

        return objectCursor(objectType);
    }
}

export {
Operation as default
}