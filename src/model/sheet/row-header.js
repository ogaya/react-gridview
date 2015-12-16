import {Record, Map, OrderedMap}from "immutable";
import RowHeaderItem from "./row-header-item";

const defCell = new RowHeaderItem();
const emptyCell = defCell.setBackground("#DDD");
import {HEADER_SIZE} from "./const";


// JSONからテーブル情報を生成
function JsonToCell(json){
  let table = Map();

  if (!json){
    return table;
  }

  for(var key in json){
    const item = RowHeaderItem.fromJS(json[key]);
    table = table.set(Number(key), item);
  }

  return table;
}



const HEADER_WIDTH = 50;
export default class RowHeader extends Record({
  _width: HEADER_WIDTH,
  maxCount: 1000,
  background: "#eaeaff",
  color: "#333",
  isVisible: true,
  editItems: Map()
}) {

  static create(){
    return new RowHeader();
  }

  // JSONから本クラスを生成
  static fromJS(json){
    const rowHeader = RowHeader.create();
    if (!json){
      return rowHeader;
    }
    return rowHeader
      .setMaxCount(json.maxCount || rowHeader.maxCount)
      .setBackground(json.background || rowHeader.background)
      .setVisible(json.isVisible || rowHeader.isVisible)
      .set("editItems", JsonToCell(json.items) || rowHeader.editItems)
      .setMaxCount(json.maxCount || rowHeader.maxCount);
  }


  toJS(){
    return {
      width: this._width,
      maxCount: this.maxCount,
      background: this.background,
      isVisible: this.isVisible,
      items: this.items.toJS()
    };
  }

  toMinJS(){
    const empty = RowHeader.create();
    const mapJS = (items) =>{
      let mapJson = {};
      items.forEach((item, key) =>{
        const minJS = item.toMinJS(defCell);
        if (Object.keys(minJS).length){
          mapJson[key] = minJS;
        }
      });
      return mapJson;
    };

    let json = {};
    this.forEach((value, key) =>{
      const dValue = empty.get(key);
      if ((value) && (value.toMinJS)){
        const minJS = value.toMinJS(dValue);
        if (Object.keys(minJS).length){
          json[key] = minJS;
        }
        return;
      }
      if (key === "editItems"){
        const mapValue = mapJS(value);
        if (Object.keys(mapValue).length){
          json.items = mapValue;
        }
        return;
      }
      if (dValue !== value){
        json[key] = value;
      }
    });
    return json;
  }

  setBackground(background){
    return this.set("background", background);
  }

  setWidth(width){
    return this.set("_width", width);
  }

  get width(){
    if (!this.isVisible){
      return 0;
    }

    return this._width;
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

  setVisible(visible){
    return this.set("isVisible", visible);
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
    let sumHeight = HEADER_SIZE.HEIGHT;
    this._items = OrderedMap().withMutations(map =>{
      for(let i = 0; i < this.maxCount; i++){
        const rowNo = i + 1;
        const item = this._rowNoToItem(rowNo);
        map.set(rowNo, item.setTop(sumHeight));
        sumHeight = sumHeight + item.height;
      }
    });
    return this._items;
  }
}

export{
  HEADER_WIDTH
};
