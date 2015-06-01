import {Record} from "immutable";
import CellModel from "./cell";

export default class RowHeaderItem extends Record({
  cell: new CellModel(),
  height: 18
}) {

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
