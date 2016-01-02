import {Record, Set} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import {calc, isCalc} from "../../calc";
import {CellPoint} from "../common";
import toMinJS from "../lib/to-min-js";

function JsonToSet(json) {
    let result = Set();

    if (!json) {
        return result;
    }
    for (var key in json) {
        result = result.add(json[key]);
    }
    return result;
}

export default class Cell extends Record({
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
    verticalAlign: any;
    textAlign: any;
    indent: number;
    background: any;
    textColor: any;
    // このセルを参照しているセル
    childIds: Set<string>;
    // このセルが参照しているセル
    refs: Set<string>;
    calcValue: any;
    nodeName: string;
    mergeRange: any;

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

    toMinJS(cell?:this) {
        return toMinJS(this, cell, Cell);
    }

    toId() {
        const cellPoint = new CellPoint(this.columnNo, this.rowNo);
        return cellPoint.toId();
    }

    cellPoint() {
        return new CellPoint(this.columnNo, this.rowNo);
    }

    setColumnNo(columnNo: number): this {
        return <this>this.set("columnNo", columnNo);
    }

    setRowNo(rowNo: number): this {
        return <this>this.set("rowNo", rowNo);
    }

    // toJS(){
    //   return {
    //     value: this.value
    //   };
    // }

    setBackground(background): this {
        return <this>this.set("background", background);
    }

    setText(value): this {
        return <this>this.set("text", value);
    }
    setValue(value):this {
        return <this>this.set("text", value);
    }

    solveCalc(sheet):this {

        const result = calc(this.text, sheet);
        if (result.isError) {
            return <this>this.set("calcValue", null);
        }
        return <this>this
            .set("refs", result.refs)
            .set("calcValue", result.value);
    }

    get value() {
        return isCalc(this.text) ? this.calcValue : this.text;
    }
    
    setRefs(refs) :this{
        return <this>this.set("refs", refs);
    }

    setVerticalAlign(verticalAlign): this {
        return <this>this.set("verticalAlign", verticalAlign);
    }

    setTextAlign(textAlign):this {
        return <this>this.set("textAlign", textAlign);
    }

    setIndent(indent):this {
        return <this>this.set("indent", indent);
    }

    setTextColor(textColor):this {
        return <this>this.set("textColor", textColor);
    }

    setMergeRange(mergeRange):this {
        return <this>this.set("mergeRange", mergeRange);
    }

    setChildIds(childIds): this{
        return <this>this.set("childIds", childIds);
    }
    addChildId(childId):this {
        return <this>this.set("childIds", this.childIds.add(childId));
    }

    deleteChildId(childId):this {
        return <this>this.set("childIds", this.childIds.delete(childId));
    }

    setNodeName(nodeName):this {
        return <this>this.set("nodeName", nodeName);
    }

    equals(cell) {
        const tmp = cell
            .set("columnNo", this.columnNo)
            .set("rowNo", this.rowNo)
            .set("childIds", this.childIds)
            .set("refs", this.refs);

        return JSON.stringify(this.toJS()) === JSON.stringify(tmp.toJS());
    }
}
