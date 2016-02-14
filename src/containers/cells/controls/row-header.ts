import {Rect} from "../../../model/common";
import {Canvas} from "../../../model/canvas";
import {ColumnHeader} from "../../../model/sheet/column-header";
import {RowHeader} from "../../../model/sheet/row-header";
import {Operation} from "../../../model/operation";

//const fontFamily =
//"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo,
//Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;;

export default function drawRowHeader(
    canvas:Canvas, columnHeader:ColumnHeader, rowHeader:RowHeader, opeModel:Operation) {

    if (!rowHeader.isVisible) {
        return;
    }

    const context = canvas.context;
    context.fillStyle = rowHeader.background;

    //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
    context.fillRect(
        0, columnHeader.height, 
        rowHeader.width, opeModel.canvasRect.height);

    context.strokeStyle = "#999";
    let sumHeight = columnHeader.height;

    const rowNo = opeModel.scroll.rowNo;

    canvas.drawLine(0, sumHeight, rowHeader.width, sumHeight);
    canvas.drawLine(
        rowHeader.width, columnHeader.height, 
        rowHeader.width, opeModel.canvasRect.height);
    
    let i = rowNo;
    while (sumHeight < canvas.height) {
        const item = rowHeader.items.get(i);
        const rect = new Rect(0, sumHeight, rowHeader.width, item.height);
        sumHeight = sumHeight + item.height;
        canvas.drawLine(0, sumHeight, rowHeader.width, sumHeight);
        canvas.context.fillStyle = rowHeader.color;
        context.font = "11px arial";
        canvas.drawText(item.cell.value, rect.setWidth(rect.width - 5), item.cell.textAlign, item.cell.verticalAlign);
        i = i + 1;
    }
}
