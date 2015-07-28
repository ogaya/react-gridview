import {Rect} from "../../../model/common";

//const fontFamily =
//"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo,
//Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;;

export default function drawRowHeader(canvas, columnHeader, rowHeader, opeModel) {

  const context = canvas.context;
  //context.fillStyle = "#BEE";
  context.fillStyle = "#112";

  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(0, columnHeader.height, rowHeader.width, rowHeader.height);

  context.strokeStyle = "#999";
  let sumHeight = columnHeader.height;

  const rowNo = opeModel.scroll.rowNo;
  rowHeader.items.skip(rowNo - 1)
    .takeWhile((item) =>{
      const rect = new Rect(0, sumHeight, rowHeader.width, item.height);
      sumHeight = sumHeight + item.height;
      if (sumHeight > canvas.height) {
        return false;
      }
      canvas.drawLine(0, sumHeight, rowHeader.width, sumHeight);
      canvas.context.fillStyle = "#FFF";
      context.font = "11px 'Meiryo'";
      canvas.drawText(item.cell.value, rect.setWidth(rect.width - 5), item.cell.textAlign, item.cell.verticalAlign);
      return true;
    });
}
