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
    topLeft: ITopLeft, cellPoint: CellPoint, rect: Rect, cell: Cell) {

    if (topLeft.cellPoint.columnNo === cellPoint.columnNo) {
        return;
    }

    //const cell = sheet.getCell(cellPoint);
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
    canvas.lineWidth = leftBorder.weight;
    for (let i = 0; i < (leftBorder.colors.length | 0); i = (i + 1) | 0) {
        const offsetTLeft = leftBorder.weight * i - offset;

        canvas.strokeStyle = leftBorder.colors[i];
        if (hasDashLeft) {
            canvas.cacheDashedLine(rect.left + offsetTLeft, rect.top, rect.left + offsetTLeft, rect.bottom, leftBorder.dash);
        }
        else {
            canvas.cacheLine(rect.left + offsetTLeft, rect.top, rect.left + offsetTLeft, rect.bottom);
        }
    }

}

function drawBorderTop(canvas: Canvas, sheet: Sheet,
    topLeft: ITopLeft, cellPoint: CellPoint, rect: Rect, cell: Cell) {

    if (topLeft.cellPoint.rowNo === cellPoint.rowNo) {
        return;
    }

    const topBorder = sheet.getBorder(cellPoint, BORDER_POSITION.TOP);
    canvas.strokeStyle = topBorder.colors[0];
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
    canvas.lineWidth = topBorder.weight;
    // 上のセルラインを描画
    for (let i = 0; i < (topBorder.colors.length); i = (i + 1) | 0) {
        const offsetTop = topBorder.weight * i - offset;

        canvas.strokeStyle = topBorder.colors[i];
        if (hasDashTop) {
            canvas.cacheDashedLine(rect.left, rect.top + offsetTop, rect.right, rect.top + offsetTop, topBorder.dash);
        } else {
            canvas.cacheLine(rect.left, rect.top + offsetTop, rect.right, rect.top + offsetTop);
        }
    }
}

// セル枠の描画
function drawBorder(canvas: Canvas, sheet: Sheet,
    topLeft: ITopLeft, cellPoint: CellPoint, rect: Rect, cell: Cell) {

    drawBorderTop(canvas, sheet, topLeft, cellPoint, rect, cell);
    drawBorderLeft(canvas, sheet, topLeft, cellPoint, rect, cell);
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
function drawCell(canvas: Canvas, sheet: Sheet,
    topLeft: ITopLeft, cellPoint: CellPoint, cellRect: Rect) {

    const cell = sheet.getCell(cellPoint);
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
        canvas.fillStyle = viewCell.background;
        canvas.cacheFillRect(rect.left, rect.top, rect.width, rect.height);
    }

    drawBorder(canvas, sheet, topLeft, cellPoint, cellRect, cell);

    if (!canCellView) {
        return;
    }
    if (!viewCell.value) {
        return;
    }

    canvas.fillStyle = (viewCell.textColor) ?
        viewCell.textColor :
        "#000";

    canvas.font = viewCell.font;
    canvas.cacheText(viewCell.value, rect.reduce(2),
        viewCell.textAlign, viewCell.verticalAlign, viewCell.indent);
}

// 行内の列描画
function drawColumn(canvas: Canvas, sheet: Sheet,
    rowNo: number, rowHeaderItem: RowHeaderItem, topLeft: ITopLeft,
    cellPoint:CellPoint, cellRect:Rect) {

    let i = (topLeft.cellPoint.columnNo) | 0;
    let left = (sheet.rowHeader.width) | 0;
    while (left < (canvas.width | 0)) {
        const item = sheet.columnHeader.items.get(i);
        if (!item) {
            break;
        }
        drawCell(canvas, sheet, topLeft, 
            cellPoint.setColumnNo(i),
            cellRect.setLeft(left).setWidth(item.width));
        left = (left + item.width) | 0;
        i = (i + 1) | 0;
    }
}


// 行毎の描画
export default function drawTable(canvas: Canvas, sheet: Sheet, opeModel: Operation) {

    const freezePaneLeftWidth = sheet.getFreezePaneLeftWidth();
    const freezePaneTopHeight = sheet.getFreezePaneTopHeight();
    const topLeft = {
        cellPoint: opeModel.scroll,
        canvasPoint: Point.create(freezePaneLeftWidth, freezePaneTopHeight)
    };
    let i = opeModel.scroll.rowNo;
    let bottom = 0;
    let top = (sheet.columnHeader.height) | 0;

    canvas.beginCache();
    const cellPoint = new CellPoint(0, 0);
    const cellRect = new Rect(0, 0, 0, 0);
    while (top < (canvas.height | 0)) {
        const item = sheet.rowHeader.items.get(i);
        if (!item) {
            break;
        }
        drawColumn(canvas, sheet, i, item, topLeft,
            cellPoint.setRowNo(i),
            cellRect.setTop(top).setHeight(item.height));
        top = (top + item.height) | 0;
        i = (i + 1) | 0;;
    }
    canvas.strockCache();
}
