import {Record, Set} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import {calc, isCalc} from "../../calc";
import {CellPoint, CellRange} from "../common";
import toMinJS from "../lib/to-min-js";
import {Sheet} from "./index";

function JsonToSet(json) {
    let result = <Set<string>>Set();

    if (!json) {
        return result;
    }
    for (var key in json) {
        result = result.add(json[key]);
    }
    return result;
}


export class Cell extends Record({
    columnNo: 0,
    rowNo: 0,
    text: "",
    verticalAlign: VERTICAL_ALIGN.MIDDLE,
    textAlign: TEXT_ALIGN.RIGHT,
    indent: 1,
    background: "",
    textColor: "",
    // このセルを参照しているセル
    childIds: Set(),
    // このセルが参照しているセル
    refs: Set(),
    calcValue: null,
    nodeName: "",
    mergeRange: null
}) {

    columnNo: number;
    rowNo: number;
    text: string;
    verticalAlign: VERTICAL_ALIGN;
    textAlign: TEXT_ALIGN;
    indent: number;
    background: any;
    textColor: any;
    // このセルを参照しているセル
    childIds: Set<string>;
    // このセルが参照しているセル
    refs: Set<string>;
    calcValue: any;
    nodeName: string;
    mergeRange: CellRange;

    static create(t?): Cell {
        const cell = new Cell();
        const target = t || {
            columnNo: 1,
            rowNo: 1
        };
        return <Cell>cell
            .set("columnNo", target.columnNo)
            .set("rowNo", target.rowNo);
    }

    static fromJS(json) {
        const cell = Cell.create();

        if (!json) {
            return cell;
        }
        return cell
            .setColumnNo(json.columnNo || cell.columnNo)
            .setRowNo(json.rowNo || cell.rowNo)
            .setBackground(json.background || cell.background)
            .setText(json.text || cell.text)
            .setVerticalAlign(json.verticalAlign || cell.verticalAlign)
            .setTextAlign(json.textAlign || cell.textAlign)
            .setIndent(json.indent || cell.indent)
            .setChildIds(JsonToSet(json.childIds))
            .setRefs(JsonToSet(json.refs))
            .setTextColor(json.textColor || cell.textColor);
    }

    toMinJS(cell?: Cell) {
        return toMinJS(this, cell, Cell);
    }

    toId() {
        const cellPoint = new CellPoint(this.columnNo, this.rowNo);
        return cellPoint.toId();
    }

    cellPoint() {
        return new CellPoint(this.columnNo, this.rowNo);
    }

    setColumnNo(columnNo: number) {
        return <Cell>this.set("columnNo", columnNo);
    }

    setRowNo(rowNo: number) {
        return <Cell>this.set("rowNo", rowNo);
    }

    setBackground(background) {
        return <Cell>this.set("background", background);
    }

    setText(value) {
        return <Cell>this.set("text", value);
    }
    setValue(value) {
        return <Cell>this.set("text", value);
    }

    solveCalc(sheet: Sheet) {

        const result = calc(this.text, sheet);
        if (result.isError) {
            return <Cell>this.set("calcValue", null);
        }
        return <Cell>this
            .set("refs", result.refs)
            .set("calcValue", result.value);
    }

    get value() {
        return isCalc(this.text) ? this.calcValue : this.text;
    }

    setRefs(refs) {
        return <Cell>this.set("refs", refs);
    }

    setVerticalAlign(verticalAlign) {
        return <Cell>this.set("verticalAlign", verticalAlign);
    }

    setTextAlign(textAlign) {
        return <Cell>this.set("textAlign", textAlign);
    }

    setIndent(indent) {
        return <Cell>this.set("indent", indent);
    }

    setTextColor(textColor) {
        return <Cell>this.set("textColor", textColor);
    }

    setMergeRange(mergeRange: CellRange) {
        return <Cell>this.set("mergeRange", mergeRange);
    }

    setChildIds(childIds: Set<string>) {
        return <Cell>this.set("childIds", childIds);
    }
    addChildId(childId: string) {
        return <Cell>this.set("childIds", this.childIds.add(childId));
    }

    deleteChildId(childId: string) {
        return <Cell>this.set("childIds", this.childIds.delete(childId));
    }

    setNodeName(nodeName: string) {
        return <Cell>this.set("nodeName", nodeName);
    }

    equals(cell:Cell) {
        const tmp = cell
            .set("columnNo", this.columnNo)
            .set("rowNo", this.rowNo)
            .set("childIds", this.childIds)
            .set("refs", this.refs);

        return JSON.stringify(this.toJS()) === JSON.stringify(tmp.toJS());
    }
}

export{
    Cell as default
}