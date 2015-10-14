import {Rect} from "../../../model/common";

export default function drawColumnHeader(canvas, columnHeader, rowHeader, opeModel) {
  const context = canvas.context;
  //const headerHaight = 18;
  //塗りスタイルに青色を指定する
  //context.fillStyle = "rgb(200, 200, 200)";
  context.fillStyle = columnHeader.background;
  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(rowHeader.width, 0, columnHeader.width, columnHeader.height);
  context.strokeStyle = "#999";
  context.lineWidth = 1;

  const columnNo = opeModel.scroll.columnNo;
  let sumWidth = rowHeader.width;
  canvas.drawLine(sumWidth, 0, sumWidth, columnHeader.height);
  columnHeader.items.skip(columnNo - 1)
    .takeWhile((item) =>{
      const rect = new Rect(sumWidth, 0, item.width, columnHeader.height);

      if(sumWidth > canvas.width){
        return false;
      }

      sumWidth = sumWidth + item.width;
      canvas.drawLine(sumWidth, 0, sumWidth, columnHeader.height);

      canvas.context.fillStyle = columnHeader.color;
      context.font = "11px arial";
      canvas.drawText(item.cell.value, rect, item.cell.textAlign, item.cell.verticalAlign);
      return true;
    });
}
