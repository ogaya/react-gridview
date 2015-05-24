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
}
