import {Record, Map, Range}from "immutable";
import ColumnHeaderModel from "./column-header";
import RowHeaderModel from "./row-header";
import {CellPoint} from "../common";
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

    return this.setCell(target, nextCell);
    // const cell = this.onChangeCell(prevCell, nextCell);
    // if (cell === prevCell){
    //   return this;
    // }
    // const table = emptyCell.equals(cell) ?
    //   this.table.delete(target.toId()) :
    //   this.table.set(target.toId(), cell);
    // return this.set("table", table);
  }

  setCell(target, nextCell){
    const prevCell = this.getCell(target);
    const cell = this.onChangeCell(prevCell, nextCell);
    if (cell === prevCell){
      return this;
    }
    const table = emptyCell.equals(cell) ?
      this.table.delete(target.toId()) :
      this.table.set(target.toId(), cell);
    return this.set("table", table);
  }

  withCell(target, mutator){
    const prevCell = this.getCell(target);
    const nextCell = mutator(prevCell);
    return this.setCell(target, nextCell);
  }

  // 範囲内のセルを変更する
  withCells(range, mutator){
    if(!range){
      return this;
    }
    const left = Math.min(range.cellPoint1.columnNo, range.cellPoint2.columnNo);
    const right = Math.max(range.cellPoint1.columnNo, range.cellPoint2.columnNo);
    const top = Math.min(range.cellPoint1.rowNo, range.cellPoint2.rowNo);
    const bottom = Math.max(range.cellPoint1.rowNo, range.cellPoint2.rowNo);

    let model = this;
    Range(left, right + 1).forEach((columnNo)=>{
      Range(top, bottom + 1).forEach((rowNo)=>{
        const target = new CellPoint(columnNo, rowNo);
        const prevCell = this.getCell(target);
        const nextCell = mutator(prevCell);
        model = model.setCell(target, nextCell);
        //model = model.setValue(new CellPoint(columnNo, rowNo), value);
      })
    })

    return model;
  }

  // 範囲内のセルを取得する
  setValueRange(range, value){
    if(!range){
      return this;
    }
    const left = Math.min(range.cellPoint1.columnNo, range.cellPoint2.columnNo);
    const right = Math.max(range.cellPoint1.columnNo, range.cellPoint2.columnNo);
    const top = Math.min(range.cellPoint1.rowNo, range.cellPoint2.rowNo);
    const bottom = Math.max(range.cellPoint1.rowNo, range.cellPoint2.rowNo);

    let model = this;
    Range(left, right + 1).forEach((columnNo)=>{
      Range(top, bottom + 1).forEach((rowNo)=>{
        model = model.setValue(new CellPoint(columnNo, rowNo), value);
      })
    })

    return model;

  }


  // 絶対座標の列情報を探す(二分探索)
  pointToColumnNo(pointX, firstIndex, lastIndex){

    if ((!firstIndex) && (lastIndex !== 0)){
      firstIndex = 1;
    }

    if ((!lastIndex) && (lastIndex !== 0)){
      lastIndex = this.columnHeader.maxCount;
    }

    // 上限下限が逆転してしまったら、範囲外にはもう無い
    if (firstIndex > lastIndex){
      return 0;
    }

    // 一区画あたりのセル数（切り上げ）
    const targetIndex = Math.ceil((firstIndex + lastIndex) / 2);
    const target = this.columnHeader.items.get(targetIndex);

    // ターゲットがもっと左側にある
    if (pointX < target.left){
      return this.pointToColumnNo(pointX, firstIndex, targetIndex - 1);
    }

    // ターゲットがもっと右側にある
    if (pointX >= target.right){
      return this.pointToColumnNo(pointX, targetIndex + 1, lastIndex);
    }

    // 発見
    return targetIndex;
  }

  // Ｙ座標から、行番号を算出する
  pointToRowNo(pointY, firstIndex, lastIndex){

    if ((!firstIndex) && (lastIndex !== 0)){
      firstIndex = 1;
    }

    if ((!lastIndex) && (lastIndex !== 0)){
      lastIndex = this.rowHeader.maxCount;
    }

    // 左右が逆転してしまったら、範囲外にはもう無い
    if (firstIndex > lastIndex){
      return 0;
    }

    // 一区画あたりのセル数（切り上げ）
    const targetIndex = Math.ceil((firstIndex + lastIndex) / 2);
    const target = this.rowHeader.items.get(targetIndex);

    // ターゲットがもっと上側にある
    if (pointY < target.top){
      return this.pointToRowNo(pointY, firstIndex, targetIndex - 1);
    }

    // ターゲットがもっと下側にある
    if (pointY >= target.bottom){
      return this.pointToRowNo(pointY, targetIndex + 1, lastIndex);
    }

    // 発見
    return targetIndex;
  }

  // // Ｙ座標から、行番号を算出する
  // pointToRowNo(pointY, offsetRow){
  //   let sumHeight = this.columnHeader.height;
  //   const offset = (offsetRow || 1) - 1;
  //   if (pointY < sumHeight){
  //     return 0;
  //   }
  //
  //   let key = 0;
  //   const target = this.rowHeader.items.skip(offset).find((item, index) => {
  //     const nextHeight = sumHeight + item.height;
  //     key = index;
  //     if ((sumHeight <= pointY) && (pointY < nextHeight)){
  //       return true;
  //     }
  //     sumHeight = nextHeight;
  //     return false;
  //   });
  //   return (target) ? key : -1;
  // }

  // 座標からセル位置を取得する
  pointToTarget(pointX, pointY){

    //const offsetColumnNo = (scroll && scroll.columnNo) || 1;
    //const offsetRowNo = (scroll && scroll.rowNo) || 1;
    const columnNo = this.pointToColumnNo(pointX);
    const rowNo = this.pointToRowNo(pointY);

    return new CellPoint(columnNo, rowNo);
  }

}
