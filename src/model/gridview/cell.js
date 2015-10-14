import {Record, Set} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import {calc, isCalc} from "../../calc";
import {CellPoint} from "../common";

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

  static createCell(target) {
    const cell = new Cell();
    return cell
      .set("columnNo", target.columnNo)
      .set("rowNo", target.rowNo);
  }

  static fromJson(json){
    let cell = new Cell();

    return cell
      .set("columnNo", json.columnNo)
      .set("rowNo", json.rowNo)
      .setBackground(json.background)
      .setValue(json.value)
      .setVerticalAlign(json.verticalAlign)
      .setTextAlign(json.textAlign)
      .setIndent(json.indent)
      .set("childIds", JsonToSet(json.childIds))
      .set("refs", JsonToSet(json.refs))
      .setTextColor(json.textColor);
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

  solveCalc(view){

    const result = calc(this.text, view);
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
