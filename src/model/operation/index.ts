import {Record, List}from "immutable";
import {InputModel} from "./input";
import {CellPoint, Rect} from "../common";
import {OBJECT_TYPE} from "../sheet/object-type";
import {CellRange} from "../common";
import {SelectInfo} from "../lib/select";

/**
 * 選択中オブジェクトに対するカーソルを取得する
 * @param {OBJECT_TYPE} objectType 各エリアの種類
 * @return {string} カーソル名
 */
function objectCursor(objectType: OBJECT_TYPE) {
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

/**
 * 操作状態クラス
 */
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

    /**入力エリア */
    input: InputModel;
    /**選択エリア */
    selectItem: SelectInfo;
    /**操作中オブジェクト情報 */
    opeItem: SelectInfo;
    /**ホバー中オブジェクト情報 */
    hoverItem: SelectInfo;
    /**現在選択中範囲 */
    rangeItem: CellRange;
    /**コピー中範囲 */
    copyingRange: CellRange;
    /**複数範囲選択していた場合の範囲リスト */
    clipRanges: List<CellRange>;
    /**描画エリアの大きさ */
    canvasRect: Rect;
    /**スクロールポイント */
    scroll: CellPoint;

    /**
     * クラスのインスタンス作成する。
     * @return インスタンス
     */
    static create() {
        return new Operation();
    }

    /**
     * 選択範囲を取得する。
     * 複数選択している場合は、全ての範囲を返す。
     */
    get rangeItems() {
        if (!this.rangeItem) {
            return this.clipRanges;
        }
        return this.clipRanges.push(this.rangeItem);
    }

    /**
     * 入力状態を設定する。
     * @param {InputModel} input 入力状態
     * @return {Operation} 更新した自身
     */
    setInput(input: InputModel) {
        return <Operation>this.set("input", input);
    }

    /**
     * 選択オブジェクトを設定する。
     * @param {SelectInfo} selectItem 選択対象オブジェクト
     * @return {Operation} 更新した自身
     */
    setSelectItem(selectItem: SelectInfo) {
        return <Operation>this.set("selectItem", selectItem);
    }

    /**
     * スクロール状態を設定する。
     * @param {CellPoint} scroll スクロールポイント
     * @return {Operation} 更新した自身
     */
    setScroll(scroll: CellPoint) {
        return <Operation>this.set("scroll", scroll);
    }

    /**
     * スクロール状態を編集する。
     * @param {function} mutator 編集関数
     * @return {Operation} 更新した自身
     */
    editScroll(mutator: (scroll: CellPoint) => CellPoint) {
        return <Operation>this.set("scroll", mutator(this.scroll));
    }

    /**
     * ホバーオブジェクトを設定する。
     * @param {SelectInfo} hoverItem オバー対象オブジェクト
     * @return {Operation} 更新した自身
     */
    setHoverItem(hoverItem: SelectInfo) {
        return <Operation>this.set("hoverItem", hoverItem);
    }

    /**
     * 操作中オブジェクトを設定する。
     * @param {SelectInfo} opeItem 選択中オブジェクト
     * @return {Operation} 更新した自身
     */
    setOpeItem(opeItem: SelectInfo) {
        return <Operation>this.set("opeItem", opeItem);
    }

    /**
     * 選択中範囲を設定する。
     * @param {CellRange} rangeItem 選択範囲
     * @return {Operation} 更新した自身
     */
    setRangeItem(rangeItem: CellRange) {
        return <Operation>this.set("rangeItem", rangeItem);
    }

    /**
     * 保持中の選択範囲を追加する。
     * 現在の選択状態を消去せず、複数追加可能となる。
     * @param  {CellRange} rangeItem 選択範囲
     * @return {Operation} 更新した自身
     */
    pushClipRanges(rangeItem: CellRange) {
        return <Operation>this.set("clipRanges", this.clipRanges.push(rangeItem));
    }

    /**
     * 保持中の選択範囲を削除する。
     * @return {Operation} 更新した自身
     */
    clearClipRanges() {
        return <Operation>this.set("clipRanges", this.clipRanges.clear());
    }

    /**
     * 描画領域を設定する。
     * @param {Rect} canvasRect 描画領域サイズ
     * @return {Operation} 更新した自身
     */
    setCanvasRect(canvasRect: Rect) {
        return <Operation>this.set("canvasRect", canvasRect);
    }

    /**
     * コピー範囲を設定する。
     * @param {CellRange} copyingRange コピー範囲
     * @return {Operation} 更新した自身
     */
    setCopyingRange(copyingRange: CellRange) {
        return <Operation>this.set("copyingRange", copyingRange);
    }

    /**
     * 範囲選択を全て解除する。
     * @return {Operation} 更新した自身
     */
    resetRange() {
        const target = this.selectItem.cellPoint;
        const range = new CellRange(target, target);
        return <Operation>this.setRangeItem(range);
    }

    /**
     * 操作中のオブジェクトに対するカーソルを取得する。
     * @return {string} カーソル名
     */
    get opeCursor() {
        if (!this.opeItem) {
            return null;
        }
        const objectType = this.opeItem.objectType;
        return objectCursor(objectType);
    }

    /**
     * ホバーオブジェクトのカーソルを取得する。
     * 操作中のオブジェクトがある場合は、ホバーカーソルより優先させる。
     * @return {string} カーソル名
     */
    get hoverCursor() {

        const opeCursor = this.opeCursor;
        if (opeCursor) {
            return opeCursor;
        }

        if (!this.hoverItem) {
            return "default";
        }

        const objectType = this.hoverItem.objectType;
        return objectCursor(objectType);
    }
}

export {
Operation as default
}