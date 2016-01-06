import {Record} from "immutable";
import Cell from "./cell";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import toMinJS from "../lib/to-min-js";

const emptyCell = new Cell();
const defCell = emptyCell
    .setVerticalAlign(VERTICAL_ALIGN.MIDDLE)
    .setTextAlign(TEXT_ALIGN.CENTER);

export class ColumnHeaderItem extends Record({
    cell: defCell,
    width: 80,
    left: 0
}) {
    cell: Cell;
    width: number;
    left: number;

    static create() {
        return new ColumnHeaderItem();
    }

    // JSONから本クラスを生成
    static fromJS(json) {
        //const item = new ColumnHeaderItem();
        return ColumnHeaderItem.create()
            .setCell(Cell.fromJS(json.cell))
            .setWidth(json.width);
    }

    toMinJS(defaultItem?: ColumnHeaderItem) {
        return toMinJS(this, defaultItem, ColumnHeaderItem);
    }

    setCell(cell: Cell) {
        return <ColumnHeaderItem>this.set("cell", cell);
    }

    setWidth(width: number) {
        return <ColumnHeaderItem>this.set("width", width);
    }

    setValue(value) {
        const cell = this.cell.setValue(value);
        return this.setCell(cell);
    }

    setLeft(left: number) {
        return <ColumnHeaderItem>this.set("left", left);
    }

    get right() {
        return this.left + this.width;
    }

    setBackground(background) {
        const cell = this.cell.setBackground(background);
        return this.setCell(cell);
    }
}

export{
    ColumnHeaderItem as default
}