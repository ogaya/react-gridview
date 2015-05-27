import {Record, List, Range}from "immutable";
import ColumnHeaderItem from "./column-header-item";

const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

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

  static getId(x) {
    const num = x - 1;
    const quotient = num / abc.length;
    const remainder = num % abc.length;
    const quotientStr = (quotient === 0) ? "" : abc[quotient];
    const remainderStr = abc[remainder];
    return quotientStr + remainderStr;
  }

  //withItems(mutator) {
  //  return this.set("items", mutator(this.items));
  //}
}
