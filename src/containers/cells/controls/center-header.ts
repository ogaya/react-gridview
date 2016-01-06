import {Canvas} from "../../../model/canvas";
import {ColumnHeader} from "../../../model/sheet/column-header";
import {RowHeader} from "../../../model/sheet/row-header";

export default function drawColumnHeader(
    canvas:Canvas, columnHeader:ColumnHeader, rowHeader:RowHeader) {
    //const headerHaight = 18;
    //塗りスタイルに青色を指定する
    //context.fillStyle = "rgb(200, 200, 200)";
    canvas.context.fillStyle = columnHeader.background;
    //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
    canvas.context.fillRect(0, 0, rowHeader.width, columnHeader.height);
    canvas.context.strokeStyle = "#999";
    canvas.context.lineWidth = 1;

    canvas.drawLine(0, 0, rowHeader.width, columnHeader.height);
}
