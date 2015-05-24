import {drawLine} from "./canvas-lib";

export default function drawGrid(context, width, height) {
  context.lineWidth = 0.5;
  context.strokeStyle = "#999";
  const rowHeight = 18;
  for (let i = 0; i < (height / rowHeight); i++) {
    drawLine(context, 0, i * rowHeight + 0.5, width, i * rowHeight + 0.5);
  }
  const columnWidth = 50;
  for (let i = 0; i < (width / columnWidth); i++) {
    drawLine(context, i * columnWidth + 0.5, 0, i * columnWidth + 0.5, height);
  }
}
