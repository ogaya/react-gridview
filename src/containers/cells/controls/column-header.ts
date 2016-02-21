import {Rect} from "../../../model/common";
import {Canvas} from "../../../model/canvas";
import {ColumnHeader} from "../../../model/sheet/column-header";
import {RowHeader} from "../../../model/sheet/row-header";
import {Operation} from "../../../model/operation";

export default function drawColumnHeader(
    canvas: Canvas, columnHeader: ColumnHeader, rowHeader: RowHeader, opeModel: Operation) {

    if (!columnHeader.isVisible) {
        return;
    }

    //塗りスタイルに青色を指定する
    canvas.fillStyle = columnHeader.background;
    //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
    canvas.cacheFillRect(
        rowHeader.width, 0,
        opeModel.canvasRect.width, columnHeader.height);
    canvas.strokeStyle = "#999";
    canvas.lineWidth = 1;

    canvas.cacheLine(
        rowHeader.width, columnHeader.height,
        opeModel.canvasRect.width, columnHeader.height);

    const columnNo = opeModel.scroll.columnNo;
    let sumWidth = (rowHeader.width) | 0;
    canvas.cacheLine(sumWidth, 0, sumWidth, columnHeader.height);

    let i = columnNo;

    canvas.fillStyle = columnHeader.color;
    canvas.font = "11px arial";
    while ((sumWidth | 0) < (canvas.width | 0)) {
        const item = columnHeader.items.get(i);
        if (!item) {
            break;
        }
        const rect = new Rect(sumWidth, 0, item.width, columnHeader.height);

        sumWidth = (sumWidth + item.width) | 0;
        canvas.cacheLine(sumWidth, 0, sumWidth, columnHeader.height);
        canvas.cacheText(item.cell.value, rect, item.cell.textAlign, item.cell.verticalAlign);
        i = i + 1;
    }
}
