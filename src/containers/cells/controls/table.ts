import {CellPoint, BORDER_POSITION} from "../../../model/common";
import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";
import {Rect} from "../../../model/common";
import {Canvas} from "../../../model/canvas";
import {ColumnHeaderItem} from "../../../model/sheet/column-header-item";
import {RowHeaderItem} from "../../../model/sheet/row-header-item";
import {Operation} from "../../../model/operation";
import {Sheet} from "../../../model/sheet";
import {Cell} from "../../../model/sheet/cell";

/**
 * 左のセルラインを描画
 */
function drawBorderLeft(canvas: Canvas, sheet: Sheet,
    opeModel: Operation, cellPoint: CellPoint, rect: Rect) {

    if (opeModel.scroll.columnNo === cellPoint.columnNo) {
        return;
    }

    const cell = sheet.getCell(cellPoint);
    const leftBorder = sheet.getBorder(cellPoint, BORDER_POSITION.LEFT);

    // 左部分は結合されている
    const isLeftMerge =
        (cell.mergeRange) &&
        (cell.mergeRange.minColumnNo !== cellPoint.columnNo);

    if (isLeftMerge) {
        return;
    }
    const lineLength = leftBorder.colors.length;
    const offset = Math.floor(lineLength * leftBorder.weight / 2);

    // 左のセルラインを描画
    const hasDashLeft = (leftBorder.dash) && (leftBorder.dash.length > 1);
    canvas.context.lineWidth = leftBorder.weight;
    for (let leftIndex in leftBorder.colors) {
        const offsetTLeft = leftBorder.weight * leftIndex - offset;
        //const offsetTLeft = leftBorder.weight * leftIndex;

        canvas.context.strokeStyle = leftBorder.colors[leftIndex];
        if (hasDashLeft) {
            canvas.drawDashedLine(rect.left + offsetTLeft, rect.top, rect.left + offsetTLeft, rect.bottom, leftBorder.dash);
        }
        else {
            canvas.drawLine(rect.left + offsetTLeft, rect.top, rect.left + offsetTLeft, rect.bottom);
        }
    }

}

function drawBorderTop(canvas: Canvas, sheet: Sheet,
    opeModel: Operation, cellPoint: CellPoint, rect: Rect) {

    if (opeModel.scroll.rowNo === cellPoint.rowNo) {
        return;
    }
    const cell = sheet.getCell(cellPoint);
    const topBorder = sheet.getBorder(cellPoint, BORDER_POSITION.TOP);

    canvas.context.strokeStyle = topBorder.colors[0];
    // 上部分は結合されている
    const isTopMerge =
        (cell.mergeRange) &&
        (cell.mergeRange.minRowNo !== cellPoint.rowNo);

    if (isTopMerge) {
        return;
    }

    const lineLength = topBorder.colors.length;
    const offset = Math.floor(lineLength * topBorder.weight / 2);

    const hasDashTop = (topBorder.dash) && (topBorder.dash.length > 1);
    canvas.context.lineWidth = topBorder.weight;
    // 上のセルラインを描画
    for (let topIndex in topBorder.colors) {
        const offsetTop = topBorder.weight * topIndex - offset;

        canvas.context.strokeStyle = topBorder.colors[topIndex];
        if (hasDashTop) {
            canvas.drawDashedLine(rect.left, rect.top + offsetTop, rect.right, rect.top + offsetTop, topBorder.dash);
        } else {
            canvas.drawLine(rect.left, rect.top + offsetTop, rect.right, rect.top + offsetTop);
        }
    }

}

// セル枠の描画
function drawBorder(canvas: Canvas, sheet: Sheet,
    opeModel: Operation, cellPoint: CellPoint, rect: Rect) {

    drawBorderTop(canvas, sheet, opeModel, cellPoint, rect);
    drawBorderLeft(canvas, sheet, opeModel, cellPoint, rect);
}

function CanCellView(cell: Cell, sheet: Sheet, opeModel: Operation, cellPoint: CellPoint) {
    if (!cell.mergeRange) {
        return true;
    }
    if (cellPoint.equals(cell.mergeRange.leftTopPoint)) {
        return true;
    }

    if ((cellPoint.columnNo === opeModel.scroll.columnNo) &&
        (cellPoint.rowNo === cell.mergeRange.leftTopPoint.rowNo)) {
        return true;
    }

    if ((cellPoint.rowNo === opeModel.scroll.rowNo) &&
        (cellPoint.columnNo === cell.mergeRange.leftTopPoint.columnNo)) {
        return true;
    }

    if ((cellPoint.columnNo === opeModel.scroll.columnNo) &&
        (cellPoint.rowNo === opeModel.scroll.rowNo)) {
        return true;
    }
    return false;
}

/**
 * セルの描画
 */
function drawCell(canvas: Canvas, sheet: Sheet, opeModel: Operation, cellPoint: CellPoint) {

    const cell = sheet.getCell(cellPoint);

    const cellRect = targetToRect(sheet, cellPoint, opeModel.scroll);
    let rect = cellRect;

    if (cell.mergeRange) {
        rect = cellRangeToRect(sheet, cell.mergeRange, opeModel.scroll);
    }

    // セルが描画可能か判定する
    const canCellView = CanCellView(cell, sheet, opeModel, cellPoint);
    const viewCell = (!cell.mergeRange) ?
        cell :
        sheet.getCell(cell.mergeRange.leftTopPoint);

    if ((viewCell.background) && (canCellView)) {
        canvas.context.fillStyle = viewCell.background;
        canvas.drawRectFill(rect);
    }

    drawBorder(canvas, sheet, opeModel, cellPoint, cellRect);

    if (!canCellView) {
        return;
    }
    if (!viewCell.value) {
        return;
    }

    canvas.context.fillStyle = (cell.textColor) ?
        cell.textColor :
        "#000";

    canvas.context.font = "10pt Arial";
    canvas.drawText(viewCell.value, rect.reduce(2), cell.textAlign, cell.verticalAlign, cell.indent);
}

// 行内の列描画
function drawColumn(canvas: Canvas, sheet: Sheet,
    rowNo: number, top: number, rowHeaderItem: RowHeaderItem, opeModel: Operation) {

    let left = sheet.rowHeader.width;
    sheet.columnHeader.items.skip(opeModel.scroll.columnNo - 1)
        .takeWhile((item, columnNo) => {
            const widthOver = (canvas.width < (left * sheet.scale));

            if (widthOver) {
                return false;
            }
            // const rect = new Rect(left, top, width, height);
            const cellPoint = new CellPoint(columnNo, rowNo);
            drawCell(canvas, sheet, opeModel, cellPoint);
            left = left + item.width;

            return true;
        });

}

// 行毎の描画
export default function drawTable(canvas: Canvas, sheet: Sheet, opeModel: Operation) {
    let top = sheet.columnHeader.height;
    sheet.rowHeader.items
        .skip(opeModel.scroll.rowNo - 1)
        .takeWhile((item, rowNo) => {
            drawColumn(canvas, sheet, rowNo, top, item, opeModel);
            top = top + item.height;
            return (canvas.height >= top * sheet.scale);
        });

}
