import {Rect} from "../../../model/common";

export default function drawColumnHeader(canvas, columnHeader, rowHeader) {
  const context = canvas.context;
  //const headerHaight = 18;
  //塗りスタイルに青色を指定する
  //context.fillStyle = "rgb(200, 200, 200)";
  context.fillStyle = "#BDD";
  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(rowHeader.width, 0, columnHeader.width, columnHeader.height);
  context.strokeStyle = "#999";
  context.lineWidth = 1;
  let sumWidth = rowHeader.width;
  const items = columnHeader.items.toArray();
  for (let key in items) {
    const item = items[key];

    const rect = new Rect(sumWidth, 0, item.width, columnHeader.height);
    sumWidth = sumWidth + item.width;
    if(sumWidth > canvas.width){
      break;
    }
    canvas.drawLine(sumWidth, 0, sumWidth, columnHeader.height);

    canvas.context.fillStyle = "#333";
    canvas.drawText(item.cell.value, rect, item.cell.textAlign, item.cell.verticalAlign);
  }
}
