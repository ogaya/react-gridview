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

  pointToColumnNo(pointX){
    let sumWidth = this.rowHeader.width;
    if (pointX < sumWidth){
      return 0;
    }

    let key = 0;
    const target = this.columnHeader.items.find((item, index) => {
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

  pointToRowNo(pointY){
    let sumHeight = this.columnHeader.height;
    if (pointY < sumHeight){
      return 0;
    }

    let key = 0;
    const target = this.rowHeader.items.find((item, index) => {
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

  pointToTarget(pointX, pointY){

    const columnNo = this.pointToColumnNo(pointX);
    const rowNo = this.pointToRowNo(pointY);

    return new Target(columnNo, rowNo);
  }

}
