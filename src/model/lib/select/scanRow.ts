import {Record} from "immutable";
import {RESIZER_BORDER_WIDTH, Point} from "../../common";

import {Sheet} from "../../sheet";
import {Operation} from "../../operation";

// 行情報
export class RowInfo extends Record({
    rowNo: -1,
    top: 0,
    height: 0,
    isBottomBorder: false
}) {

    rowNo: number;
    top: number;
    height: number;
    isBottomBorder: boolean;

    constructor(rowNo: number, top: number, height: number, isBottomBorder: boolean) {
        super({
            rowNo: rowNo,
            top: top,
            height: height,
            isBottomBorder: isBottomBorder
        });
    }
}

const empty = new RowInfo(-1, 0, 0, false);

// 行情報取得
export function clientPointToRowInfo(sheet: Sheet, opeModel: Operation, point: Point) {


    // ヘッダー内の場合
    // if (point.y <= 0){
    //   return empty;
    // }

    let top = sheet.columnHeader.height;
    const offsetRow = opeModel.scroll.rowNo;
    const offset = (offsetRow || 1) - 1;

    let rowNo = 0;
    let target;
    if (point.y < top) {

        return new RowInfo(0, 0, sheet.columnHeader.height, false);
    }
    else {
        target = sheet.rowHeader.items.skip(offset).find((item, index) => {
            const nextTop = top + item.height;
            rowNo = index;
            if ((top <= point.y) && (point.y < (nextTop + RESIZER_BORDER_WIDTH))) {
                return true;
            }
            top = nextTop;
            return false;
        });
    }

    if (!target) {
        return empty;
    }

    const diffY = point.y - (top + target.height);
    const isBottomBorder = Math.abs(diffY) < RESIZER_BORDER_WIDTH;
    return new RowInfo(rowNo, top, target.height, isBottomBorder);
}
export {
RowInfo as default
}