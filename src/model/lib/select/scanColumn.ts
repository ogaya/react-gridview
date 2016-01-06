import {Record} from "immutable";
import {RESIZER_BORDER_WIDTH, Point} from "../../common";
import {Sheet} from "../../sheet";
import {Operation} from "../../operation";

// 列情報
export class ColumnInfo extends Record({
    columnNo: -1,
    left: 0,
    width: 0,
    isRightBorder: false
}) {
    columnNo: number;
    left: number;
    width: number;
    isRightBorder: boolean;

    constructor(columnNo: number, left: number, width: number, isRightBorder: boolean) {
        super({
            columnNo: columnNo,
            left: left,
            width: width,
            isRightBorder: isRightBorder
        });
    }
}

const empty = new ColumnInfo(-1, 0, 0, false);


// 列情報取得
export function clientPointToColumnInfo(sheet: Sheet, opeModel: Operation, point: Point) {

    // ヘッダー内の場合
    if (point.x <= 0) {
        return empty;
    }

    let left = sheet.rowHeader.width;
    const offsetColumn = opeModel.scroll.columnNo;
    const offset = (offsetColumn || 1) - 1;
    if (point.x < left) {
        return new ColumnInfo(0, 0, sheet.rowHeader.width, false);
    }

    let columnNo = 0;
    const target = sheet.columnHeader.items.skip(offset).find((item, index) => {
        const nextLeft = left + item.width;
        columnNo = index;
        if ((left <= point.x) && (point.x < (nextLeft + RESIZER_BORDER_WIDTH))) {
            return true;
        }
        left = nextLeft;
        return false;
    });
    if (!target) {
        return empty;
    }
    const diffX = point.x - (left + target.width);
    const isRightBorder = Math.abs(diffX) < RESIZER_BORDER_WIDTH;
    return new ColumnInfo(columnNo, left, target.width, isRightBorder);
}
