import {Record, List} from "immutable";
import {OBJECT_TYPE} from "../sheet/object-type";
import {CellPoint} from "./cell-point";

// セル選択モデル
class CellRange extends Record({
    cellPoint1: null,
    cellPoint2: null
}) {
    cellPoint1: CellPoint;
    cellPoint2: CellPoint;

    constructor(cellPoint1, cellPoint2) {
        super({
            cellPoint1: cellPoint1,
            cellPoint2: cellPoint2
        });
    }
    
    get minColumnNo(): number {
        return Math.min(this.cellPoint1.columnNo, this.cellPoint2.columnNo);
    }

    get minRowNo(): number {
        return Math.min(this.cellPoint1.rowNo, this.cellPoint2.rowNo);
    }

    get maxColumnNo(): number {
        return Math.max(this.cellPoint1.columnNo, this.cellPoint2.columnNo);
    }

    get maxRowNo(): number {
        return Math.max(this.cellPoint1.rowNo, this.cellPoint2.rowNo);
    }

    get leftTopPoint(): CellPoint {
        return new CellPoint(this.minColumnNo, this.minRowNo);
    }

    get rightBottomPoint(): CellPoint {
        return new CellPoint(this.maxColumnNo, this.maxRowNo);
    }

    merge(rangeItem): CellRange {
        const left = Math.min(this.minColumnNo, rangeItem.minColumnNo);
        const top = Math.min(this.minRowNo, rangeItem.minRowNo);
        const right = Math.max(this.maxColumnNo, rangeItem.maxColumnNo);
        const bottom = Math.max(this.maxRowNo, rangeItem.maxRowNo);

        const cellPoint1 = new CellPoint(left, top);
        const cellPoint2 = new CellPoint(right, bottom);

        return new CellRange(cellPoint1, cellPoint2);
    }

    cellPoints(): List<CellPoint> {
        const left = this.minColumnNo;
        const top = this.minRowNo;
        const right = this.maxColumnNo;
        //const bottom = this.maxRowNo;

        let points = List<CellPoint>();
        for (var column = left; column <= right; column++) {
            for (var row = top; row <= top; row++) {
                points = points.push(new CellPoint(column, row));
            }
        }

        return points;

    }

    equals(cellRange): boolean {
        if (!cellRange) {
            return false;
        }
        if (cellRange.minColumnNo !== this.minColumnNo) {
            return false;
        }

        if (cellRange.minRowNo !== this.minRowNo) {
            return false;
        }

        if (cellRange.maxColumnNo !== this.maxColumnNo) {
            return false;
        }

        if (cellRange.maxRowNo !== this.maxRowNo) {
            return false;
        }

        return true;
    }
}

/**
 * 列ヘッダーを選択したときの処理
 * @param  {[type]} sheet [description]
 * @param  {[type]} opeModel  [description]
 * @return {[type]}           [description]
 */
function pickRangeFromColumnHeader(sheet, opeModel) {

    const opeItem = opeModel.opeItem;
    const hoverItem = opeModel.hoverItem;


    if ((!opeItem) || (opeItem.objectType !== OBJECT_TYPE.COLUMN_HEADER)) {
        return null;
    }

    if (!hoverItem) {
        return new CellRange(
            new CellPoint(opeItem.cellPoint.columnNo, 1),
            new CellPoint(opeItem.cellPoint.columnNo, sheet.rowHeader.maxCount));
    }

    return new CellRange(
        new CellPoint(opeItem.cellPoint.columnNo, 1),
        new CellPoint(hoverItem.cellPoint.columnNo, sheet.rowHeader.maxCount));
}

function pickRangeFromRowHeader(sheet, opeModel) {

    const opeItem = opeModel.opeItem;
    const hoverItem = opeModel.hoverItem;


    if ((!opeItem) || (opeItem.objectType !== OBJECT_TYPE.ROW_HEADER)) {
        return null;
    }

    if (!hoverItem) {
        return new CellRange(
            new CellPoint(1, opeItem.cellPoint.rowNo),
            new CellPoint(sheet.columnHeader.maxCount, opeItem.cellPoint.rowNo));
    }

    return new CellRange(
        new CellPoint(1, opeItem.cellPoint.rowNo),
        new CellPoint(sheet.columnHeader.maxCount, hoverItem.cellPoint.rowNo));
}

function opeModelToRangeItem(opeModel) {

    const opeItem = opeModel.opeItem;
    const hoverItem = opeModel.hoverItem;

    // 操作中オブジェクトがセルで無い場合、範囲選択しない
    if ((!opeItem) || (opeItem.objectType !== OBJECT_TYPE.CELL)) {
        return opeModel.rangeItem;
    }

    // ホバーアイテムがセルで無い場合、前回の範囲選択情報のままとする。
    if ((!hoverItem) || (hoverItem.objectType !== OBJECT_TYPE.CELL)) {
        return new CellRange(opeItem.cellPoint, opeItem.cellPoint);
    }

    return new CellRange(opeItem.cellPoint, hoverItem.cellPoint);
}

// 範囲内に結合セルがある場合、選択範囲を広げる
function fitRange(sheet, rangeItem) {
    const left = rangeItem.minColumnNo;
    const top = rangeItem.minRowNo;
    const right = rangeItem.maxColumnNo;
    const bottom = rangeItem.maxRowNo;

    // 上下の結合を確認
    for (let columnNo = left; columnNo <= right; columnNo++) {
        const cellPoint = new CellPoint(columnNo, top);
        const cell = sheet.getCell(cellPoint);

        if (!cell.mergeRange) {
            continue;
        }

        const needExpansion = (cell.mergeRange.minRowNo !== top);

        if (needExpansion) {
            const expansionRange = rangeItem.merge(cell.mergeRange);
            return fitRange(sheet, expansionRange);
        }
    }

    for (let columnNo = left; columnNo <= right; columnNo++) {
        const cellPoint = new CellPoint(columnNo, bottom);
        const cell = sheet.getCell(cellPoint);

        if (!cell.mergeRange) {
            continue;
        }

        const needExpansion = (cell.mergeRange.maxRowNo !== bottom);

        if (needExpansion) {
            const expansionRange = rangeItem.merge(cell.mergeRange);
            return fitRange(sheet, expansionRange);
        }
    }

    for (let rowNo = top; rowNo <= bottom; rowNo++) {
        const cellPoint = new CellPoint(left, rowNo);
        const cell = sheet.getCell(cellPoint);

        if (!cell.mergeRange) {
            continue;
        }

        const needExpansion = (cell.mergeRange.minColumnNo !== left);

        if (needExpansion) {
            const expansionRange = rangeItem.merge(cell.mergeRange);
            return fitRange(sheet, expansionRange);
        }
    }


    for (let rowNo = top; rowNo <= bottom; rowNo++) {
        const cellPoint = new CellPoint(right, rowNo);
        const cell = sheet.getCell(cellPoint);

        if (!cell.mergeRange) {
            continue;
        }

        const needExpansion = (cell.mergeRange.maxColumnNo !== right);

        if (needExpansion) {
            const expansionRange = rangeItem.merge(cell.mergeRange);
            return fitRange(sheet, expansionRange);
        }
    }


    return rangeItem;
}

/**
 * 操作状況から選択範囲を取得する
 * @param  {[type]} sheet [description]
 * @param  {[type]} opeModel  [description]
 * @return {[type]}           [description]
 */
function modelToRangeItem(sheet, opeModel) {

    let opeRange = pickRangeFromColumnHeader(sheet, opeModel);
    if (opeRange) {
        return opeRange;
    }
    opeRange = pickRangeFromRowHeader(sheet, opeModel);

    if (opeRange) {
        return opeRange;
    }

    // マウスドラッグ操作した範囲を求める
    opeRange = opeModelToRangeItem(opeModel);

    if (!opeRange) {
        return opeRange;
    }

    return fitRange(sheet, opeRange);
}

export {
CellRange,
modelToRangeItem,
opeModelToRangeItem
};
