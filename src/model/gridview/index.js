import {Record, Map, Range}from "immutable";
import ColumnHeaderModel from "./column-header";
import RowHeaderModel from "./row-header";
import {Target} from "../common";
import CellModel from "./cell";
import {OBJECT_TYPE} from "./object-type";

const emptyCell = new CellModel();

export {
  OBJECT_TYPE
};

// JSONからテーブル情報を生成
function JsonToTable(json){
  let table = Map();

  if (!json){
    return table;
  }
  for(var key in json){
    const cell = CellModel.fromJson(json[key]);
    table = table.set(key, cell);
  }
  return table;
}

// 表示情報のモデル
export default class GridView extends Record({
  columnHeader: new ColumnHeaderModel(),
  rowHeader: new RowHeaderModel(),
  table: Map(),
  onChangeCell: (prevCell, nextCell) => {return nextCell;}
}) {

  // JSONから本クラスを生成
  static fromJson(json){
    const view = new GridView();
    // テーブル情報を変換
    return view
      .set("table", JsonToTable(json.table))
      .setColumnHeader(ColumnHeaderModel.fromJson(json.columnHeader))
      .setRowHeader(RowHeaderModel.fromJson(json.rowHeader));
  }

  // 本クラスをJSONへ変換
  toJson(){
    return this.toJS();
  }

  setColumnHeader(columnHeader){
    return this.set("columnHeader", columnHeader);
  }

  setRowHeader(rowHeader){
    return this.set("rowHeader", rowHeader);
  }

  getCell(target){
    if (this.table.has(target.toId()) === false){
      return CellModel.createCell(target);
    }

    return this.table.get(target.toId());
  }

  setOnChangeCell(onChangeCell){
    return this.set("onChangeCell", onChangeCell);
  }

  // 値のセット
  setValue(target, value){
    const prevCell = this.getCell(target);
    const nextCell = this.getCell(target).setValue(value);
    const cell = this.onChangeCell(prevCell, nextCell);
    if (cell === prevCell){
      return this;
    }
    const table = emptyCell.equal(cell) ?
      this.table.delete(target.toId()) :
      this.table.set(target.toId(), cell);
    return this.set("table", table);
  }

  // 範囲内のセルを取得する
  setValueRange(range, value){
    if(!range){
      return this;
    }
    const left = Math.min(range.target1.columnNo, range.target2.columnNo);
    const right = Math.max(range.target1.columnNo, range.target2.columnNo);
    const top = Math.min(range.target1.rowNo, range.target2.rowNo);
    const bottom = Math.max(range.target1.rowNo, range.target2.rowNo);

    let model = this;
    Range(left, right + 1).forEach((columnNo)=>{
      Range(top, bottom + 1).forEach((rowNo)=>{
        model = model.setValue(new Target(columnNo, rowNo), value);
      })
    })

    return model;

  }

  pointToColumnNo(pointX, offsetColumn){
    let sumWidth = this.rowHeader.width;
    const offset = (offsetColumn || 1) - 1;
    if (pointX < sumWidth){
      return 0;
    }

    let key = 0;
    const target = this.columnHeader.items.skip(offset).find((item, index) => {
      const nextWidth = sumWidth + item.width;
      key = index;
      if ((sumWidth <= pointX) && (pointX < nextWidth)){
        return true;
      }
      sumWidth = nextWidth;
      return false;
    });
    return (target) ? key : -1;
  }

  // Ｙ座標から、行番号を算出する
  pointToRowNo(pointY, offsetRow){
    let sumHeight = this.columnHeader.height;
    const offset = (offsetRow || 1) - 1;
    if (pointY < sumHeight){
      return 0;
    }

    let key = 0;
    const target = this.rowHeader.items.skip(offset).find((item, index) => {
      const nextHeight = sumHeight + item.height;
      key = index;
      if ((sumHeight <= pointY) && (pointY < nextHeight)){
        return true;
      }
      sumHeight = nextHeight;
      return false;
    });
    return (target) ? key : -1;
  }

  // 座標からセル位置を取得する
  pointToTarget(pointX, pointY, scroll){

    const offsetColumnNo = (scroll && scroll.columnNo) || 1;
    const offsetRowNo = (scroll && scroll.rowNo) || 1;
    const columnNo = this.pointToColumnNo(pointX, offsetColumnNo);
    const rowNo = this.pointToRowNo(pointY, offsetRowNo);

    return new Target(columnNo, rowNo);
  }

}
