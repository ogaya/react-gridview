import {Record} from "immutable";
import Cell from "./cell";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import toMinJS from "../lib/to-min-js";

const emptyCell = new Cell();
const defCell = emptyCell
    .setVerticalAlign(VERTICAL_ALIGN.MIDDLE)
    .setTextAlign(TEXT_ALIGN.CENTER);

export const DEFAULT_WIDTH = 80;

export class ColumnHeaderItem extends Record({
    cell: defCell,
    width: DEFAULT_WIDTH,
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
            .setCell(Cell.fromJS(json.cell, defCell))
            .setWidth(json.width);
    }

    toMinJS(defaultItem?: ColumnHeaderItem):any {
        if (this.width === DEFAULT_WIDTH){
            return {};
        }
        return {
            width: this.width
        };
        //return toMinJS(this, defaultItem, ColumnHeaderItem);
    }

    setCell(cell: Cell) {
        return <ColumnHeaderItem>this.set("cell", cell);
    }

    setWidth(width: number) {
        return <ColumnHeaderItem>this.set("width", Math.round(width));
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