import {Record, List, Range}from "immutable";
import ColumnHeaderItem from "./column-header-item";

export default class ColumnHeader extends Record({
  background: "#DDD",
  height: 18,
  Items: List(Range(0, 5).map(() => {
    return new ColumnHeaderItem();
  }))
}) {

  get width(){
    let sumWidth = 0;
    this.Items.map((item) => {
      sumWidth = sumWidth + item.width;
    });
    return sumWidth;
  }
  //static get ACTIVE() {
  //  return 1;
  //}
  //withItems(mutator) {
  //  return this.set("items", mutator(this.items));
  //}
}
