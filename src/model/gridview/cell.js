import {Record} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";

export default class Cell extends Record({
  columnNo: 0,
  rowNo: 0,
  text: "",
  verticalAlign: VERTICAL_ALIGN.CENTER,
  textAlign: TEXT_ALIGN.RIGHT,
  indent: 1,
  background: "",
  textColor: "",
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
  get value(){
    return this.text;
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

  equals(cell){
    const tmp = cell
      .set("columnNo", this.columnNo)
      .set("rowNo", this.rowNo);

    return JSON.stringify(this.toJS()) === JSON.stringify(tmp.toJS());
  }
}
