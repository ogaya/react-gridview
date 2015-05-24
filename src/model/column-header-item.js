import {Record} from "immutable";
import CellModel from "./cell";

export default class ColumnHeaderItem extends Record({
  cell: new CellModel(),
  width: 50
}) {

  setWidth(width) {
    return this.set("width", width);
  }
}
