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

  toId(){
    return  this.columnNo + "-" + this.rowNo;
  }
}
