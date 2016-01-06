
import {OBJECT_TYPE} from "../../sheet/object-type";

import {Rect, CellPoint, Point} from "../../common";
import {SelectInfo} from "./item";

// 列情報取得処理
import {clientPointToColumnInfo, ColumnInfo} from "./scanColumn";
// 行情報取得処理
import {clientPointToRowInfo, RowInfo} from "./scanRow";

import {Sheet} from "../../sheet";
import {Operation} from "../../operation";

/**
 * 列ヘッダーのピックアップ
 * @param  {ColumnInfo} columnInfo  列情報
 * @param  {RowInfo} rowInfo        行情報
 * @param  {Point} point            座標
 * @return {SelectInfo}       選択アイテムの情報
 */
export function pickColumnHeader(columnInfo: ColumnInfo, rowInfo: RowInfo, point: Point) {
    if (rowInfo.rowNo !== 0) {
        return null;
    }
    const target = new CellPoint(columnInfo.columnNo, rowInfo.rowNo);
    const rect = new Rect(columnInfo.left, rowInfo.top, columnInfo.width, rowInfo.height);

    const objectType = (columnInfo.isRightBorder) ?
        OBJECT_TYPE.COLUMN_RESIZER : OBJECT_TYPE.COLUMN_HEADER;
    return new SelectInfo(objectType, target, rect, point);
}

function pickRowHeader(columnInfo: ColumnInfo, rowInfo: RowInfo, point: Point) {
    if (columnInfo.columnNo !== 0) {
        return null;
    }
    const target = new CellPoint(columnInfo.columnNo, rowInfo.rowNo);

    const rect = new Rect(columnInfo.left, rowInfo.top, columnInfo.width, rowInfo.height);
    const objectType = (rowInfo.isBottomBorder) ?
        OBJECT_TYPE.ROW_RESIZER : OBJECT_TYPE.ROW_HEADER;
    return new SelectInfo(objectType, target, rect, point);
}

function pickCell(columnInfo: ColumnInfo, rowInfo: RowInfo, point: Point) {
    if (rowInfo.rowNo <= 0) {
        return null;
    }
    if (columnInfo.columnNo <= 0) {
        return null;
    }
    const target = new CellPoint(columnInfo.columnNo, rowInfo.rowNo);
    const rect = new Rect(columnInfo.left, rowInfo.top, columnInfo.width, rowInfo.height);
    const objectType = OBJECT_TYPE.CELL;
    return new SelectInfo(objectType, target, rect, point);
}

export function pointToGridViewItem(sheet: Sheet, opeModel: Operation, point: Point, isDrag: Boolean) {

    const columnInfo = clientPointToColumnInfo(sheet, opeModel, point);
    const rowInfo = clientPointToRowInfo(sheet, opeModel, point);

    const isCellDrag = (
        (isDrag) &&
        (opeModel.opeItem) &&
        (opeModel.opeItem.objectType === OBJECT_TYPE.CELL));

    if (!isCellDrag) {
        const columnHeader = pickColumnHeader(columnInfo, rowInfo, point);
        if (columnHeader) {
            return columnHeader;
        }

        const rowHeader = pickRowHeader(columnInfo, rowInfo, point);
        if (rowHeader) {
            return rowHeader;
        }
    }

    const cell = pickCell(columnInfo, rowInfo, point);
    if (cell) {
        return cell;
    }
    return new SelectInfo(OBJECT_TYPE.NONE, null, null, point);
}

export {
SelectInfo
};
