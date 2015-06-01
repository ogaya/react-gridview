import {Record} from "immutable";
import CellModel from "./cell";

export default class ColumnHeaderItem extends Record({
  cell: new CellModel(),
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
