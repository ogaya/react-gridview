import {Record, Map}from "immutable";
import ColumnHeaderModel from "./column-header";
import RowHeaderModel from "./row-header";
import {Target} from "../common";
import CellModel from "./cell";

const emptyCell = new CellModel();

export default class GridView extends Record({
  columnHeader: new ColumnHeaderModel(),
  rowHeader: new RowHeaderModel(),
  table: Map()
}) {

  setColumnHeader(columnHeader){
    return this.set("columnHeader", columnHeader);
  }

  setRowHeader(rowHeader){
    return this.set("rowHeader", rowHeader);
  }

  getCell(target){
    if (this.table.has(target.toId()) === false){
      return emptyCell;
    }

    return this.table.get(target.toId());
  }

  setValue(target, value){
    const cell = this.getCell(target).setValue(value);
    const table = this.table.set(target.toId(), cell);
    return this.set("table", table);
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
