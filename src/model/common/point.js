
import {Record} from "immutable";

// セル位置モデル
export class Point extends Record({
  x: 0,
  y: 0
}) {

  // static forMouseEvent(e){
  //   const rect = e.target.getBoundingClientRect();
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;
  //   // テーブル上の座標を取得
  //   return new Point(x, y);
  // }

  constructor(x, y) {
    super({
      x: Number(x),
      y: Number(y)
    });
  }
}
