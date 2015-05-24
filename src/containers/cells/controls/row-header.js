import {drawLine} from "./canvas-lib";

export default function drawRowHeader(
  context, width, height, columnHeader, rowHeader) {

  context.fillStyle = rowHeader.background;
  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(0, columnHeader.height, rowHeader.width, rowHeader.height);

  context.strokeStyle = "#999";
  let sumHeight = columnHeader.height;
  columnHeader.cells.map((cell) =>{

    sumHeight = sumHeight + cell.height;
    drawLine(context, 0, sumHeight + 0.5, rowHeader.width, sumHeight + 0.5);
  });
}
