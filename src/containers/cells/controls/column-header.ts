import {Rect} from "../../../model/common";
import {Canvas} from "../../../model/canvas";
import {ColumnHeader} from "../../../model/sheet/column-header";
import {RowHeader} from "../../../model/sheet/row-header";
import {Operation} from "../../../model/operation";

export default function drawColumnHeader(
    canvas:Canvas, columnHeader:ColumnHeader, rowHeader:RowHeader, opeModel:Operation) {

    if (!columnHeader.isVisible) {
        return;
    }

    const context = canvas.context;
    //塗りスタイルに青色を指定する
    context.fillStyle = columnHeader.background;
    //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
    context.fillRect(
        rowHeader.width, 0, 
        opeModel.canvasRect.width, columnHeader.height);
    context.strokeStyle = "#999";
    context.lineWidth = 1;
    
    canvas.drawLine(
        rowHeader.width, columnHeader.height, 
        opeModel.canvasRect.width, columnHeader.height);
    
    const columnNo = opeModel.scroll.columnNo;
    let sumWidth = rowHeader.width;
    canvas.drawLine(sumWidth, 0, sumWidth, columnHeader.height);
    
    let i = columnNo;
    while(sumWidth < canvas.width){
        const item = columnHeader.items.get(i);
        const rect = new Rect(sumWidth, 0, item.width, columnHeader.height);

        sumWidth = sumWidth + item.width;
        canvas.drawLine(sumWidth, 0, sumWidth, columnHeader.height);

        canvas.context.fillStyle = columnHeader.color;
        context.font = "11px arial";
        canvas.drawText(item.cell.value, rect, item.cell.textAlign, item.cell.verticalAlign);
        i = i + 1;
    }
}
