import {Record, Set} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import {calc, isCalc} from "../../calc";
import {CellPoint, CellRange} from "../common";
import toMinJS from "../lib/to-min-js";
import {Sheet} from "./index";

const jsonExclude = Set<string>([
    "calcValue",
    "childIds",
    "refs"
]);

export class Cell extends Record({
    text: "",
    verticalAlign: VERTICAL_ALIGN.MIDDLE,
    textAlign: TEXT_ALIGN.RIGHT,
    indent: 1,
    background: "",
    textColor: "",
    font: "10pt Arial",
    // このセルを参照しているセル
    childIds: Set(),
    // このセルが参照しているセル
    refs: Set(),
    calcValue: null,
    nodeName: "",
    mergeRange: null
}) {
    text: string;
    verticalAlign: VERTICAL_ALIGN;
    textAlign: TEXT_ALIGN;
    indent: number;
    background: any;
    textColor: any;
    font: string;
    // このセルを参照しているセル
    childIds: Set<string>;
    // このセルが参照しているセル
    refs: Set<string>;
    calcValue: any;
    nodeName: string;
    mergeRange: CellRange;

    static create() {
        return new Cell();
    }

    static fromJS(json, defaultCell?: Cell) {
        const cell = defaultCell || Cell.create();

        if (!json) {
            return cell;
        }
        return cell
            .setBackground(json.background || cell.background)
            .setText(json.text || cell.text)
            .setVerticalAlign(json.verticalAlign || cell.verticalAlign)
            .setTextAlign(json.textAlign || cell.textAlign)
            .setIndent(json.indent || cell.indent)
            .setTextColor(json.textColor || cell.textColor)
            .setMergeRange(CellRange.fromJS(json.mergeRange));
    }

    toMinJS(cell?: Cell) {
        return toMinJS(this, cell, Cell, jsonExclude);
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

    setVerticalAlign(verticalAlign: VERTICAL_ALIGN) {
        return <Cell>this.set("verticalAlign", verticalAlign);
    }

    setTextAlign(textAlign: TEXT_ALIGN) {
        return <Cell>this.set("textAlign", textAlign);
    }

    setIndent(indent: number) {
        return <Cell>this.set("indent", indent);
    }

    setTextColor(textColor) {
        return <Cell>this.set("textColor", textColor);
    }
    
    setFont(font: string){
        return <Cell>this.set("font", font);
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

    equals(cell: Cell) {
        const tmp = cell
            .set("childIds", this.childIds)
            .set("refs", this.refs);

        return JSON.stringify(this.toJS()) === JSON.stringify(tmp.toJS());
    }
}

export {
Cell as default
}