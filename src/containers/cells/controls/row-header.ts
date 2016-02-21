import {Rect} from "../../../model/common";
import {Canvas} from "../../../model/canvas";
import {ColumnHeader} from "../../../model/sheet/column-header";
import {RowHeader} from "../../../model/sheet/row-header";
import {Operation} from "../../../model/operation";

//const fontFamily =
//"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo,
//Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;;

export default function drawRowHeader(
    canvas: Canvas, columnHeader: ColumnHeader, rowHeader: RowHeader, opeModel: Operation) {

    if (!rowHeader.isVisible) {
        return;
    }

    canvas.fillStyle = rowHeader.background;

    //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
    canvas.cacheFillRect(
        0, columnHeader.height,
        rowHeader.width, opeModel.canvasRect.height);

    canvas.strokeStyle = "#999";
    let sumHeight = columnHeader.height;

    const rowNo = opeModel.scroll.rowNo;

    canvas.cacheLine(0, sumHeight, rowHeader.width, sumHeight);
    canvas.cacheLine(
        rowHeader.width, columnHeader.height,
        rowHeader.width, opeModel.canvasRect.height);

    let i = rowNo;
    canvas.fillStyle = rowHeader.color;
    canvas.font = "11px arial";
    while ((sumHeight | 0) < (canvas.height | 0)) {
        const item = rowHeader.items.get(i);
        if (!item) {
            break;
        }
        const rect = new Rect(0, sumHeight, rowHeader.width, item.height);
        sumHeight = (sumHeight + item.height) | 0;
        canvas.cacheLine(0, sumHeight, rowHeader.width, sumHeight);
        canvas.cacheText(item.cell.value, rect.setWidth(rect.width - 5), item.cell.textAlign, item.cell.verticalAlign);
        i = i + 1;
    }
}
