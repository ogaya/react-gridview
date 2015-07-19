import {Record, Map, OrderedMap}from "immutable";
import RowHeaderItem from "./row-header-item";

const defCell = new RowHeaderItem();
const emptyCell = defCell.setBackground("#DDD");


const HEADER_WIDTH = 50;
export default class RowHeader extends Record({
  width: HEADER_WIDTH,
  maxCount: 1000,
  editItems: Map()
}) {

  setBackground(background){
    return this.set("background", background);
  }

  setWidth(width){
    return this.set("width", width);
  }

  get height(){
    let sumHeight = 0;
    this.items.map((item) => {
      sumHeight = sumHeight + item.height;
    });
    return sumHeight;
  }

  setItem(index, item){
    const editItems = this.editItems.set(index, item);
    return this.set("editItems", editItems);
  }

  setMaxCount(count){
    return this.set("maxCount", count);
  }

  _rowNoToItem(rowNo){
    if (this.editItems.has(rowNo)) {
      return this.editItems.get(rowNo);
    }
    return emptyCell.setValue(rowNo);
  }

  get items(){
    if(this._items){
      return this._items;
    }
    this._items = OrderedMap().withMutations(map =>{
      for(let i = 0; i < this.maxCount; i++){
        const rowNo = i + 1;
        const item = this._rowNoToItem(rowNo);
        map.set(rowNo, item);
      }
    });
    return this._items;
  }

}

export{
  HEADER_WIDTH
};
