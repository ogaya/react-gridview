import {Record} from "immutable";
import CellModel from "./cell";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
const emptyCell = new CellModel();
const defCell = emptyCell
  .setVerticalAlign(VERTICAL_ALIGN.MIDDLE)
  .setTextAlign(TEXT_ALIGN.CENTER);


export default class ColumnHeaderItem extends Record({
  cell: defCell,
  width: 50
}) {

  setWidth(width) {
    return this.set("width", width);
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
