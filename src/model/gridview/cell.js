import {Record, Set} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import {calc} from "../../calc";
import {CellPoint} from "../common";

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
      .setTextColor(json.textColor);
  }

  toId(){
    const cellPoint = new CellPoint(this.columnNo, this.rowNo);
    return cellPoint.toId();
  }

  // toJS(){
  //   return {
  //     value: this.value
  //   };
  // }

  setBackground(background) {
    return this.set("background", background);
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
    return this.calcValue || this.text;
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

  addRefs(ref){
    return this.set("refs", this.refs.add(ref));
  }

  deleteRefs(ref){
    return this.set("refs", this.refs.delete(ref));
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
