import {Range} from "immutable";

import {Sheet, BORDER_POSITION, CellPoint, CellRange, Border} from "react-gridview";

export function setTopBorder(view: Sheet, rangeItem: CellRange, border: Border) {

    const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    const right = Math.max(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
    Range(left, right + 1).forEach((columnNo) => {
        view = view.setBorder(new CellPoint(columnNo, top), BORDER_POSITION.TOP, border);
    });
    return view;
}


export function setBottomBorder(view: Sheet, rangeItem: CellRange, border: Border) {

    const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    const right = Math.max(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    const bottom = Math.max(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
    Range(left, right + 1).forEach((columnNo) => {
        view = view.setBorder(new CellPoint(columnNo, bottom), BORDER_POSITION.BOTTOM, border);
    });
    return view;
}

export function setLeftBorder(view: Sheet, rangeItem: CellRange, border: Border) {

    const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
    const bottom = Math.max(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
    Range(top, bottom + 1).forEach((rowNo) => {
        view = view.setBorder(new CellPoint(left, rowNo), BORDER_POSITION.LEFT, border);
    });
    return view;
}

export function setRightBorder(view: Sheet, rangeItem: CellRange, border: Border) {

    const right = Math.max(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
    const bottom = Math.max(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);
    Range(top, bottom + 1).forEach((rowNo) => {
        view = view.setBorder(new CellPoint(right, rowNo), BORDER_POSITION.RIGHT, border);
    });
    return view;
}

export function setCrossBorder(view: Sheet, rangeItem: CellRange, border: Border) {

    const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);

    view.getCells(rangeItem).forEach((v, k) => {
        const cellPoint = CellPoint.fromId(k);

        if (cellPoint.columnNo !== left) {
            view = view.setBorder(cellPoint, BORDER_POSITION.LEFT, border);
        }

        if (cellPoint.rowNo !== top) {
            view = view.setBorder(cellPoint, BORDER_POSITION.TOP, border);
        }
    });
    return view;
}

export function setCenterBorder(view: Sheet, rangeItem: CellRange, border: Border) {
    const left = Math.min(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    view.getCells(rangeItem).forEach((v, key) => {
        const cellPoint = CellPoint.fromId(key);

        if (cellPoint.columnNo !== left) {
            view = view.setBorder(cellPoint, BORDER_POSITION.LEFT, border);
        }
    });
    return view;
}


export function setMiddleBorder(view: Sheet, rangeItem: CellRange, border: Border) {
    const top = Math.min(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);

    view.getCells(rangeItem).forEach((v, k) => {
        const cellPoint = CellPoint.fromId(k);

        if (cellPoint.rowNo !== top) {
            view = view.setBorder(cellPoint, BORDER_POSITION.TOP, border);
        }
    });
    return view;
}


export function setFullBorder(view: Sheet, rangeItem: CellRange, border: Border) {

    const right = Math.max(rangeItem.cellPoint1.columnNo, rangeItem.cellPoint2.columnNo);
    const bottom = Math.max(rangeItem.cellPoint1.rowNo, rangeItem.cellPoint2.rowNo);

    view.getCells(rangeItem).forEach((v, k) => {
        const cellPoint = CellPoint.fromId(k);

        view = view
            .setBorder(cellPoint, BORDER_POSITION.TOP, border)
            .setBorder(cellPoint, BORDER_POSITION.LEFT, border);

        if (cellPoint.columnNo === right) {
            view = view.setBorder(cellPoint, BORDER_POSITION.RIGHT, border);
        }

        if (cellPoint.rowNo === bottom) {
            view = view.setBorder(cellPoint, BORDER_POSITION.BOTTOM, border);
        }
    });
    return view;
}

export function setGridBorder(view: Sheet, rangeItem: CellRange, border: Border) {

    view = setTopBorder(view, rangeItem, border);
    view = setRightBorder(view, rangeItem, border);
    view = setBottomBorder(view, rangeItem, border);
    view = setLeftBorder(view, rangeItem, border);

    return view;
}
