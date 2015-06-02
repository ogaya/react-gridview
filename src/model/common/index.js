import {Record} from "immutable";
export class Rect extends Record({
  left: 0,
  top: 0,
  width: 0,
  height: 0
}) {

  constructor(left, top, width, height) {
    super({
      left: left,
      top: top,
      width: width,
      height: height
    });
  }

  get right(){
    return this.left + this.width;
  }

  get bottom(){
    return this.top + this.height;
  }
}

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
