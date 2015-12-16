import {Record, Set} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import {calc, isCalc} from "../../calc";
import {CellPoint} from "../common";
import toMinJS from "../lib/to-min-js";

function JsonToSet(json){
  let result = Set();

  if (!json){
    return result;
  }
  for(var key in json){
    result = result.add(json[key]);
  }
  return result;
}

export default class Cell extends Record({
  columnNo: 0,
  rowNo: 0,
  text: "",
  verticalAlign: VERTICAL_ALIGN.CENTER,
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

  static create(t) {
    const cell = new Cell();
    const target = t || {
      columnNo: 1,
      rowNo: 1
    };
    return cell
      .set("columnNo", target.columnNo)
      .set("rowNo", target.rowNo);
  }

  static fromJS(json){
    const cell = Cell.create();

    if (!json){
      return cell;
    }
    return cell
      .set("columnNo", json.columnNo || cell.columnNo)
      .set("rowNo", json.rowNo || cell.rowNo)
      .setBackground(json.background || cell.background)
      .setText(json.text || cell.text)
      .setVerticalAlign(json.verticalAlign || cell.verticalAlign)
      .setTextAlign(json.textAlign || cell.textAlign)
      .setIndent(json.indent || cell.indent)
      .set("childIds", JsonToSet(json.childIds))
      .set("refs", JsonToSet(json.refs))
      .setTextColor(json.textColor || cell.textColor);
  }

  toMinJS(cell){
    return toMinJS(this, cell, Cell);
  }

  toId(){
    const cellPoint = new CellPoint(this.columnNo, this.rowNo);
    return cellPoint.toId();
  }

  cellPoint(){
    return new CellPoint(this.columnNo, this.rowNo);
  }

  // toJS(){
  //   return {
  //     value: this.value
  //   };
  // }

  setBackground(background) {
    return this.set("background", background);
  }

  setText(value) {
    return this.set("text", value);
  }
  setValue(value) {
    return this.set("text", value);
  }

  solveCalc(sheet){

    const result = calc(this.text, sheet);
    if (result.isError){
      return this.set("calcValue", null);
    }
    return this
      .set("refs", result.refs)
      .set("calcValue", result.value);
  }

  get value(){
    return isCalc(this.text) ? this.calcValue : this.text;
  }

  setVerticalAlign(verticalAlign){
    return this.set("verticalAlign", verticalAlign);
  }

  setTextAlign(textAlign){
    return this.set("textAlign", textAlign);
  }

  setIndent(indent){
    return this.set("indent", indent);
  }

  setTextColor(textColor){
    return this.set("textColor", textColor);
  }

  setMergeRange(mergeRange){
    return this.set("mergeRange", mergeRange);
  }

  addChildId(childId){
    return this.set("childIds", this.childIds.add(childId));
  }

  deleteChildId(childId){
    return this.set("childIds", this.childIds.delete(childId));
  }

  setNodeName(nodeName){
    return this.set("nodeName", nodeName);
  }

  equals(cell){
    const tmp = cell
      .set("columnNo", this.columnNo)
      .set("rowNo", this.rowNo)
      .set("childIds", this.childIds)
      .set("refs", this.refs);

    return JSON.stringify(this.toJS()) === JSON.stringify(tmp.toJS());
  }
}
