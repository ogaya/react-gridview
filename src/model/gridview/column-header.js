import {Record, Map, OrderedMap}from "immutable";
import ColumnHeaderItem from "./column-header-item";

const abc = ["A", "B", "C", "D", "E", "F",
  "G", "H", "I", "J", "K", "L", "M", "N", "O",
  "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const defCell = new ColumnHeaderItem();
const emptyCell = defCell.setBackground("#DDD");

const HEADER_HEIGHT = 18;

export default class ColumnHeader extends Record({
  height: HEADER_HEIGHT,
  maxCount: 702,
  editItems: Map()
}) {
  get width(){
    let sumWidth = 0;
    this.items.map((item) => {
      sumWidth = sumWidth + item.width;
    });
    return sumWidth;
  }

  static getId(x) {
    const num = x - 1;
    const quotient = Math.floor(num / abc.length) - 1;
    const remainder = num % abc.length;
    const quotientStr = (quotient < 0) ? "" : abc[quotient];
    const remainderStr = abc[remainder];
    return quotientStr + remainderStr;
  }

  setItem(index, item){
    const editItems = this.editItems.set(index, item);
    return this.set("editItems", editItems);
  }

  setMaxCount(count){
    return this.set("maxCount", count);
  }

  get items(){
    if(this._items){
      return this._items;
    }
    this._items = OrderedMap().withMutations(map =>{
      for(let i = 0; i < this.maxCount; i++){
        const columnNo = i + 1;
        const value = ColumnHeader.getId(columnNo);
        if (this.editItems.has(columnNo)) {
          map.set(columnNo, this.editItems.get(columnNo));
          continue;
        }
        map.set(columnNo, emptyCell.setValue(value));
      }
    });

    return this._items;
  }
}

export{
  HEADER_HEIGHT
};
