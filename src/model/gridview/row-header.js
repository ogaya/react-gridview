import {Record, List, Range}from "immutable";
import RowHeaderItem from "./row-header-item";

export default class ColumnHeader extends Record({
  background: "#DDD",
  width: 50,
  items: List(Range(0, 5).map(() => {
    return new RowHeaderItem();
  }))
}) {

  setBackground(background){
    return this.set("background", background);
  }


  get height(){
    let sumHeight = 0;
    this.items.map((item) => {
      sumHeight = sumHeight + item.height;
    });
    return sumHeight;
  }

}
