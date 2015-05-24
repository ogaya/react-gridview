import {drawLine} from "./canvas-lib";

export default function drawColumnHeader(
  context, width, height, columnHeader, rowHeader) {
    console.log(context.width);
  //const headerHaight = 18;
  //塗りスタイルに青色を指定する
  //context.fillStyle = "rgb(200, 200, 200)";
  context.fillStyle = columnHeader.background;
  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(rowHeader.width, 0, columnHeader.width, columnHeader.height);
  context.strokeStyle = "#999";
  let sumWidth = rowHeader.width;
  columnHeader.cells.map((cell) =>{
    sumWidth = sumWidth + cell.width;
    drawLine(context, sumWidth + 0.5, 0, sumWidth + 0.5, columnHeader.height);
  });
}
