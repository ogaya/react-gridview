import {Record}from "immutable";
import ColumnHeaderModel from "./column-header";
import RowHeaderModel from "./row-header";

export default class GridView extends Record({
  columnHeader: new ColumnHeaderModel(),
  rowHeader: new RowHeaderModel()
}) {

  setColumnHeader(columnHeader){
    return this.set("columnHeader", columnHeader);
  }

  setRowHeader(rowHeader){
    return this.set("rowHeader", rowHeader);
  }

  getColumnNo(pointX){
    let sumWidth = this.rowHeader.width;
    if (pointX < sumWidth){
      return 0;
    }

    this.columnHeader.Items.map((item, index) => {
      if ((sumWidth < pointX) && (sumWidth < pointX)){
        return index;
      }

      sumWidth = sumWidth + item.width;
    });
    return -1;
  }

  getCellId(pointX, pointY){
    const columnNo = this.getColumnNo(pointX);
    const rowNo = this.getRowNo(pointY);
    return {"columnNo": columnNo, "rowNo": rowNo};
  }
}
