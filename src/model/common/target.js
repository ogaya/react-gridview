import {Record} from "immutable";

// セル位置モデル
export class Target extends Record({
  columnNo: 0,
  rowNo: 0
}) {

  constructor(columnNo, rowNo) {
    super({
      columnNo: Number(columnNo),
      rowNo: Number(rowNo)
    });
  }

  setColumnNo(columnNo){
    return this.set("columnNo", columnNo);
  }

  setRowNo(rowNo){
    return this.set("rowNo", rowNo);
  }

  toId(){
    return  this.columnNo + "-" + this.rowNo;
  }
}
