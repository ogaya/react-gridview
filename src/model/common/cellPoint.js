import {Record} from "immutable";

// セル位置モデル
export class CellPoint extends Record({
  columnNo: 0,
  rowNo: 0
}) {

  // コンストラクタ
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

  // ID化
  toId(){
    return  this.columnNo + "-" + this.rowNo;
  }

  equals(cellPoint){
    if (!cellPoint){
      return false;
    }
    
    if (cellPoint.columnNo !== this.columnNo){
      return false;
    }

    if (cellPoint.rowNo !== this.rowNo){
      return false;
    }

    return true;
  }
}
