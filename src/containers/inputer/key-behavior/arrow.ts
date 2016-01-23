
import {fitForTarget} from "../../../model/lib/fit-for-target";
import {OBJECT_TYPE}  from "../../../model/sheet/object-type";
import {SelectInfo}   from "../../../model/lib/select";
import {CellRange, fitRange}    from "../../../model/common";

/**
 * キーコード入力後のセル位置
 * @param  {number} keyCode
 * @param  {CellPoint} cellPoint
 * @return {CellPoint}
 */
function getNextCellPoint(keyCode, cellPoint) {
    switch (keyCode) {
        case 37:  // ← (左矢印)
            if (cellPoint.columnNo === 1) {
                return cellPoint;
            }
            return cellPoint.setColumnNo(cellPoint.columnNo - 1);
        case 38:  // ↑ (上矢印)
            if (cellPoint.rowNo === 1) {
                return cellPoint;
            }
            return cellPoint.setRowNo(cellPoint.rowNo - 1);
        case 39:  // → (右矢印)
            return cellPoint.setColumnNo(cellPoint.columnNo + 1);
        case 40:  // ↓ (下矢印)
            return cellPoint.setRowNo(cellPoint.rowNo + 1);
        default:
            return cellPoint;
    }
}

function arrowDownWithShift(e, props, inputer) {
    let opeModel = props.opeModel;

    // 選択ターゲットを取得
    const selectItem = opeModel.selectItem;

    if (!selectItem) {
        return true;
    }

    if (selectItem.objectType !== OBJECT_TYPE.CELL) {
        return true;
    }

    const controlCellPoint = inputer.state.controlCellPoint;

    // 選択セルを下へ移す
    const nextCellPoint = getNextCellPoint(e.keyCode, controlCellPoint || selectItem.cellPoint);

    inputer.setState({ controlCellPoint: nextCellPoint });

    const fitScroll = fitForTarget(props.sheet, opeModel, nextCellPoint);
    const range = fitRange(props.sheet, new CellRange(selectItem.cellPoint, nextCellPoint));

    // 新規操作オブジェクトを作る
    const newOpeModel = opeModel
        .resetRange()
        .setRangeItem(range)
        .setScroll(fitScroll);

    props.onStateChange(props.sheet, newOpeModel);
    return false;
}

export function arrowDown(e, props, keyPress, inputer) {

    if (keyPress.shift) {
        return arrowDownWithShift(e, props, inputer);
    }
    let opeModel = props.opeModel;

    // 選択ターゲットを取得
    const selectItem = opeModel.selectItem;

    if (!selectItem) {
        return true;
    }

    if (selectItem.objectType !== OBJECT_TYPE.CELL) {
        return true;
    }

    // 選択セルを下へ移す
    const target = getNextCellPoint(e.keyCode, selectItem.cellPoint);
    if (selectItem.cellPoint === target) {
        return true;
    }

    const fitScroll = fitForTarget(props.sheet, opeModel, target);
    const newSelectItem = new SelectInfo(selectItem.objectType, target, null, null);

    // 新規操作オブジェクトを作る
    const newOpeModel = opeModel
        .setSelectItem(newSelectItem)
        .resetRange()
        .setScroll(fitScroll);

    props.onStateChange(props.sheet, newOpeModel);
    return false;
}
