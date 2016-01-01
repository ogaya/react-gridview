import {Record, List}from "immutable";
import InputModel from "./input";
import {CellPoint} from "../common";
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

export default class Operation extends Record({
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
    selectItem: any;
    opeItem: any;
    hoverItem: any;
    rangeItem: any;
    copyingRange: any;
    clipRanges: any;
    canvasRect: any;
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
    setInput(input): this {
        return <this>this.set("input", input);
    }

    setSelectItem(selectItem): this {
        return (<this>this.set("selectItem", selectItem));
    }

    setScroll(scroll): this {
        return <this>this.set("scroll", scroll);
    }

    editScroll(mutator): this {
        return <this>this.set("scroll", mutator(this.scroll));
    }

    setHoverItem(hoverItem): this {
        return <this>this.set("hoverItem", hoverItem);
    }

    setOpeItem(opeItem): this {
        return <this>this.set("opeItem", opeItem);
    }

    setRangeItem(rangeItem): this {
        return <this>this.set("rangeItem", rangeItem);
    }

    /**
     * 保持中の選択範囲を追加する
     * @param  {CellRange} rangeItem 選択範囲
     * @return {Operation} 更新した自身
     */
    pushClipRanges(rangeItem): this {
        return <this>this.set("clipRanges", this.clipRanges.push(rangeItem));
    }

    downSelect(): this {
        if (!this.selectItem) {
            return this;
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
    clearClipRanges(): this {
        return <this>this.set("clipRanges", this.clipRanges.clear());
    }

    setCanvasRect(canvasRect): this {
        return <this>this.set("canvasRect", canvasRect);
    }

    setCopyingRange(copyingRange): this {
        return <this>this.set("copyingRange", copyingRange);
    }

    resetRange(): this {
        const target = this.selectItem.cellPoint;
        const range = new CellRange(target, target);
        return this.setRangeItem(range);
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
