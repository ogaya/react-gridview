import {Record, Map, OrderedMap}from "immutable";
import ColumnHeaderItem from "./column-header-item";
import {HEADER_SIZE} from "./const";

const abc = ["A", "B", "C", "D", "E", "F",
  "G", "H", "I", "J", "K", "L", "M", "N", "O",
  "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const defCell = new ColumnHeaderItem();
const emptyCell = defCell.setBackground("#DDD");

const HEADER_HEIGHT = HEADER_SIZE.HEIGHT;

// JSONからテーブル情報を生成
function JsonToCell(json){
  let table = Map();

  if (!json){
    return table;
  }

  for(var key in json){
    const item = ColumnHeaderItem.fromJson(json[key]);
    table = table.set(Number(key), item);
  }

  return table;
}


export default class ColumnHeader extends Record({
  height: HEADER_HEIGHT,
  maxCount: 702,
  background: "#eaeaff",
  color: "#333",
  editItems: Map()
}) {

  // JSONから本クラスを生成
  static fromJson(json){
    let cHeader = new ColumnHeader();
    // アイテム情報を変換
    cHeader = cHeader.set("editItems", JsonToCell(json.editItems));
    return cHeader
      .setMaxCount(json.maxCount);
  }

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
      let sumWidth = HEADER_SIZE.WIDTH;
      for(let i = 0; i < this.maxCount; i++){
        const columnNo = i + 1;
        const value = ColumnHeader.getId(columnNo);

        const item = this.editItems.has(columnNo) ?
          this.editItems.get(columnNo) :
          emptyCell.setValue(value);

        map.set(columnNo, item.setLeft(sumWidth));
        sumWidth = sumWidth + item.width;
      }
    });

    return this._items;
  }

  get width(){
    return this.items.last().right;
  }
}

export{
  HEADER_HEIGHT
};
