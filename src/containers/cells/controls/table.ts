import {CellPoint, BORDER_POSITION} from "../../../model/common";
import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";
import {Rect, Point} from "../../../model/common";
import {Canvas} from "../../../model/canvas";
import {ColumnHeaderItem} from "../../../model/sheet/column-header-item";
import {RowHeaderItem} from "../../../model/sheet/row-header-item";
import {Operation} from "../../../model/operation";
import {Sheet} from "../../../model/sheet";
import {Cell} from "../../../model/sheet/cell";

interface ITopLeft {
    cellPoint: CellPoint,
    canvasPoint: Point
}

/**
 * 左のセルラインを描画
 */
function drawBorderLeft(canvas: Canvas, sheet: Sheet,
    topLeft: ITopLeft, cellPoint: CellPoint, rect: Rect) {

    if (topLeft.cellPoint.columnNo === cellPoint.columnNo) {
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
    topLeft: ITopLeft, cellPoint: CellPoint, rect: Rect) {

    if (topLeft.cellPoint.rowNo === cellPoint.rowNo) {
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
    topLeft: ITopLeft, cellPoint: CellPoint, rect: Rect) {

    drawBorderTop(canvas, sheet, topLeft, cellPoint, rect);
    drawBorderLeft(canvas, sheet, topLeft, cellPoint, rect);
}

/**
 * 対象セルが描画可能か
 */
function CanCellView(cell: Cell, sheet: Sheet, topLeft: ITopLeft, cellPoint: CellPoint) {
    if (!cell.mergeRange) {
        return true;
    }
    if (cellPoint.equals(cell.mergeRange.leftTopPoint)) {
        return true;
    }

    if ((cellPoint.columnNo === topLeft.cellPoint.columnNo) &&
        (cellPoint.rowNo === cell.mergeRange.leftTopPoint.rowNo)) {
        return true;
    }

    if ((cellPoint.rowNo === topLeft.cellPoint.rowNo) &&
        (cellPoint.columnNo === cell.mergeRange.leftTopPoint.columnNo)) {
        return true;
    }

    if ((cellPoint.columnNo === topLeft.cellPoint.columnNo) &&
        (cellPoint.rowNo === topLeft.cellPoint.rowNo)) {
        return true;
    }
    return false;
}

/**
 * セルの描画
 */
function drawCell(canvas: Canvas, sheet: Sheet, topLeft: ITopLeft, cellPoint: CellPoint) {

    const cell = sheet.getCell(cellPoint);

    const cellRect = targetToRect(sheet, cellPoint, topLeft.cellPoint)
        .editTop((top) => { return top + topLeft.canvasPoint.y });
    let rect = cellRect;

    if (cell.mergeRange) {
        rect = cellRangeToRect(sheet, cell.mergeRange, topLeft.cellPoint)
            .editTop((top) => { return top + topLeft.canvasPoint.y });
    }

    // セルが描画可能か判定する
    const canCellView = CanCellView(cell, sheet, topLeft, cellPoint);
    const viewCell = (!cell.mergeRange) ?
        cell :
        sheet.getCell(cell.mergeRange.leftTopPoint);

    if ((viewCell.background) && (canCellView)) {
        canvas.context.fillStyle = viewCell.background;
        canvas.drawRectFill(rect);
    }

    drawBorder(canvas, sheet, topLeft, cellPoint, cellRect);

    if (!canCellView) {
        return;
    }
    if (!viewCell.value) {
        return;
    }

    canvas.context.fillStyle = (viewCell.textColor) ?
        viewCell.textColor :
        "#000";

    canvas.context.font = viewCell.font;
    canvas.drawText(viewCell.value, rect.reduce(2),
        viewCell.textAlign, viewCell.verticalAlign, viewCell.indent);
}

// 行内の列描画
function drawColumn(canvas: Canvas, sheet: Sheet,
    rowNo: number, rowHeaderItem: RowHeaderItem, topLeft: ITopLeft, limitRight:number) {

    sheet.columnHeader.items.skip(topLeft.cellPoint.columnNo - 1)
        .takeWhile((item, columnNo) => {
            const cellPoint = new CellPoint(columnNo, rowNo);
            drawCell(canvas, sheet, topLeft, cellPoint);
            return (item.right < limitRight);
        });
}

/**
 * ウィンドウ固定枠描画
 */
function drawFreezePane(canvas: Canvas, sheet: Sheet) {
    if ((!sheet.freezePane) || (!sheet.freezePane.firstPoint)) {
        return;
    }
    const freezePaneTopHeight = sheet.getFreezePaneTopHeight();
    const startRowNo = (sheet.freezePane.topLeft && sheet.freezePane.topLeft.rowNo) || 1;
    const topLeft = {
        cellPoint: sheet.freezePane.topLeft || CellPoint.create(1, 1),
        canvasPoint: Point.create(0, 0)
    };
    sheet.rowHeader.items
        .skip(startRowNo - 1)
        .takeWhile((item, rowNo) => {
            drawColumn(canvas, sheet, rowNo, item, topLeft, 0);
            return rowNo + 1 < sheet.freezePane.firstPoint.rowNo;
        })
}

// 行毎の描画
export default function drawTable(canvas: Canvas, sheet: Sheet, opeModel: Operation) {
    const freezePaneLeftWidth = sheet.getFreezePaneLeftWidth();
    const freezePaneTopHeight = sheet.getFreezePaneTopHeight();
    const topLeft = {
        cellPoint: opeModel.scroll,
        canvasPoint: Point.create(freezePaneLeftWidth, freezePaneTopHeight)
    };
    const top = sheet.columnHeader.height + freezePaneTopHeight;
    const limitBottom = sheet.rowHeader.items.get(opeModel.scroll.rowNo).top + 
        (canvas.height / sheet.scale);
    const limitRight = sheet.columnHeader.items.get(opeModel.scroll.columnNo).left + 
        (canvas.width / sheet.scale);
    sheet.rowHeader.items
        .skip(opeModel.scroll.rowNo - 1)
        .takeWhile((item, rowNo) => {
            drawColumn(canvas, sheet, rowNo, item, topLeft, limitRight);
            return (item.bottom < limitBottom);
        });

}
