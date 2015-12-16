import {Record} from "immutable";
import CellModel from "./cell";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import toMinJS from "../lib/to-min-js";

const emptyCell = new CellModel();
const defCell = emptyCell
  .setVerticalAlign(VERTICAL_ALIGN.MIDDLE)
  .setTextAlign(TEXT_ALIGN.RIGHT);


export default class RowHeaderItem extends Record({
  cell: defCell,
  height: 21,
  top: 0
}) {

  static create(){
    return new RowHeaderItem();
  }
  // JSONから本クラスを生成
  static fromJS(json){
    return RowHeaderItem.create()
      .set("cell", CellModel.fromJS(json.cell))
      .setHeight(json.height);
  }


  toMinJS(rowHeaderItem){
    return toMinJS(this, rowHeaderItem, RowHeaderItem);
  }

  setHeight(height) {
    return this.set("height", height);
  }

  setTop(top){
    return this.set("top", top);
  }

  get bottom(){
    return this.top + this.height;
  }

  setValue(value) {
    const cell = this.cell.setValue(value);
    return this.set("cell", cell);
  }

  setBackground(background) {
    const cell = this.cell.setBackground(background);
    return this.set("cell", cell);
  }
}
