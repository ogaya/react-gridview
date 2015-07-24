import {Record} from "immutable";
import CellModel from "./cell";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
const emptyCell = new CellModel();
const defCell = emptyCell
  .setVerticalAlign(VERTICAL_ALIGN.MIDDLE)
  .setTextAlign(TEXT_ALIGN.RIGHT);


export default class RowHeaderItem extends Record({
  cell: defCell,
  height: 18
}) {

    // JSONから本クラスを生成
    static fromJson(json){
      const item = new RowHeaderItem();
      return item
        .set("cell", CellModel.fromJson(json.cell))
        .setHeight(json.height);
    }

  setHeight(height) {
    return this.set("height", height);
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
