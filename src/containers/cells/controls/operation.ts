import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";
import {COLOR} from "../../../model/common";
import {OBJECT_TYPE, Sheet} from "../../../model/sheet";
import {Canvas} from "../../../model/canvas";
import {Operation} from "../../../model/operation";
//import {Rect} from "../../../model/common/rect";

// 列のリサイズ処理を描画
function drawColumnResize(canvas:Canvas, sheet:Sheet, opeModel:Operation) {
    if (!opeModel.opeItem) {
        return;
    }
    if (opeModel.opeItem.objectType !== OBJECT_TYPE.COLUMN_RESIZER) {
        return;
    }

    canvas.context.strokeStyle = COLOR.RESIZER;
    canvas.context.lineWidth = 5;
    const x = opeModel.hoverItem.point.x;
    canvas.drawLine(x, 0, x, canvas.height);
}

// 行のリサイズ描画
function drawRowResize(canvas:Canvas, sheet:Sheet, opeModel:Operation) {
    if (!opeModel.opeItem) {
        return;
    }
    if (opeModel.opeItem.objectType !== OBJECT_TYPE.ROW_RESIZER) {
        return;
    }

    canvas.context.strokeStyle = COLOR.RESIZER;
    canvas.context.lineWidth = 5;
    const y = opeModel.hoverItem.point.y;
    canvas.drawLine(0, y, canvas.width, y);
}

// 範囲選択の描画
function drawRange(canvas:Canvas, sheet:Sheet, opeModel:Operation) {
    const rangeItems = opeModel.rangeItems;
    if (!rangeItems) {
        return;
    }

    rangeItems.forEach((rangeItem) => {
        if ((rangeItem.cellPoint1.columnNo === rangeItem.cellPoint2.columnNo) &&
            (rangeItem.cellPoint1.rowNo === rangeItem.cellPoint2.rowNo)) {
            return;
        }

        const cellPoint = opeModel.selectItem && opeModel.selectItem.cellPoint;

        if (!cellPoint) {
            return;
        }
        const cell = sheet.getCell(cellPoint);

        if (rangeItem.equals(cell.mergeRange)) {
            return;
        }

        canvas.context.strokeStyle = "#35C";
        canvas.context.lineWidth = 1;

        const rect = cellRangeToRect(sheet, rangeItem, opeModel.scroll);

        canvas.context.fillStyle = "#35C";
        canvas.context.globalAlpha = 0.2;
        canvas.context.fillRect(rect.left, rect.top, rect.width, rect.height);
        canvas.context.globalAlpha = 1;
        canvas.drawRectLine(rect);
    });

}

/**
 * コピー範囲の描画
 * @param  {Object} canvas    canvasオブジェクト
 * @param  {View} sheet 表示情報
 * @param  {Operation} opeModel  捜査情報
 */
function drawCopy(canvas:Canvas, sheet:Sheet, opeModel:Operation) {
    const copyingRange = opeModel.copyingRange;

    if (!copyingRange) {
        return;
    }


    canvas.context.strokeStyle = "#35C";
    canvas.context.lineWidth = 2;

    const rect = cellRangeToRect(sheet, copyingRange, opeModel.scroll);

    canvas.context.globalAlpha = 1;
    canvas.drawRectDashedLine(rect, [8, 4]);
}

function drawSelectCell(canvas:Canvas, sheet:Sheet, opeModel:Operation) {
    // セル選択の描画
    const cellPoint = opeModel.selectItem && opeModel.selectItem.cellPoint;

    if (!cellPoint) {
        return;
    }

    const cell = sheet.getCell(cellPoint);
    canvas.context.strokeStyle = "#35C";
    canvas.context.lineWidth = 3;
    if (cell.mergeRange) {
        const rect = cellRangeToRect(sheet, cell.mergeRange, opeModel.scroll);
        canvas.drawRectLine(rect);
    }
    else {

        const rect = targetToRect(sheet, cellPoint, opeModel.scroll);
        canvas.drawRectLine(rect);
    }


}

// ユーザー操作の描画
export default function drawOperation(canvas:Canvas, sheet:Sheet, opeModel:Operation) {

    // リサイズ処理の描画
    drawColumnResize(canvas, sheet, opeModel);
    drawRowResize(canvas, sheet, opeModel);

    // 範囲選択の描画
    drawRange(canvas, sheet, opeModel);
    // 選択セルの描画
    drawSelectCell(canvas, sheet, opeModel);

    drawCopy(canvas, sheet, opeModel);

}
