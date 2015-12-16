import {Record} from "immutable";
import CellModel from "./cell";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import toMinJS from "../lib/to-min-js";

const emptyCell = new CellModel();
const defCell = emptyCell
  .setVerticalAlign(VERTICAL_ALIGN.MIDDLE)
  .setTextAlign(TEXT_ALIGN.CENTER);

export default class ColumnHeaderItem extends Record({
  cell: defCell,
  width: 80,
  left: 0
}) {

  static create(){
    return new ColumnHeaderItem();
  }

  // JSONから本クラスを生成
  static fromJS(json){
    //const item = new ColumnHeaderItem();
    return ColumnHeaderItem.create()
      .set("cell", CellModel.fromJS(json.cell))
      .setWidth(json.width);
  }

  toMinJS(columnHeaderItem){
    return toMinJS(this, columnHeaderItem, ColumnHeaderItem);
  }

  setWidth(width) {
    return this.set("width", width);
  }

  setValue(value) {
    const cell = this.cell.setValue(value);
    return this.set("cell", cell);
  }

  setLeft(left){
    return this.set("left", left);
  }

  get right(){
    return this.left + this.width;
  }

  setBackground(background) {
    const cell = this.cell.setBackground(background);
    return this.set("cell", cell);
  }
}
