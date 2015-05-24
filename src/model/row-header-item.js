import {Record} from "immutable";
import CellModel from "./cell";

export default class RowHeaderItem extends Record({
  cell: new CellModel(),
  height: 18
}) {

  setHeight(height) {
    return this.set("height", height);
  }
}
