import {drawLine} from "./canvas-lib";

export default function drawColumnHeader(
  context, width, height, columnHeader, rowHeader) {
  //const headerHaight = 18;
  //塗りスタイルに青色を指定する
  //context.fillStyle = "rgb(200, 200, 200)";
  context.fillStyle = columnHeader.background;
  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(0, 0, rowHeader.width, columnHeader.height);
  context.strokeStyle = "#999";

  drawLine(context, 0, 0, rowHeader.width, columnHeader.height);
}
