import {Record} from "immutable";
import Cell from "./cell";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import toMinJS from "../lib/to-min-js";

const emptyCell = new Cell();
const defCell = emptyCell
    .setVerticalAlign(VERTICAL_ALIGN.MIDDLE)
    .setTextAlign(TEXT_ALIGN.RIGHT);

export default class RowHeaderItem extends Record({
    cell: defCell,
    height: 21,
    top: 0
}) {
    cell: Cell;
    height: number;
    top: number;

    static create() {
        return new RowHeaderItem();
    }
    // JSONから本クラスを生成
    static fromJS(json) {
        return RowHeaderItem.create()
            .setCell(Cell.fromJS(json.cell))
            .setHeight(json.height);
    }

    toMinJS(rowHeaderItem) {
        return toMinJS(this, rowHeaderItem, RowHeaderItem);
    }

    setCell(cell: Cell): this {
        return <this>this.set("cell", cell);
    }

    setHeight(height): this {
        return <this>this.set("height", height);
    }

    setTop(top): this {
        return <this>this.set("top", top);
    }

    get bottom() {
        return this.top + this.height;
    }

    setValue(value): this {
        const cell = this.cell.setValue(value);
        return <this>this.set("cell", cell);
    }

    setBackground(background): this {
        const cell = this.cell.setBackground(background);
        return <this>this.set("cell", cell);
    }
}
