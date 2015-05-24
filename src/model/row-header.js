import {Record, List, Range}from "immutable";
import CellModel from "./cell";

export default class ColumnHeader extends Record({
  background: "#DDD",
  width: 50,
  cells: List(Range(0, 5).map(() => {
    return new CellModel();
  }))
}) {

  setBackground(background){
    return this.set("background", background);
  }


  get height(){
    let sumHeight = 0;
    this.cells.map((cell) => {
      sumHeight = sumHeight + cell.height;
    });
    return sumHeight;
  }

}
