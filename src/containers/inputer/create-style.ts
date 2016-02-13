import {targetToRect, cellRangeToRect} from "../../model/lib/target_to_rect";
import {OBJECT_TYPE} from "../../model/sheet/object-type";
import {Sheet} from "../../model/sheet";
import {Operation} from "../../model/operation";

import {Rect} from "../../model/common";

function protrude(rect:Rect, other:Rect){
    if (!other){
        return true;
    }
    if (rect.left < 0){
        return true;
    }
    if (rect.top < 0){
        return true;
    }
    if (rect.right > other.width){
        return true;
    }
    if (rect.bottom > other.height){
        return true;
    }
    return false;
}

export function createInputStyle(sheet:Sheet, opeModel:Operation) {

    let style: any = {
        position: "absolute",
        resize: "none",
        overflow: "hidden",
        zIndex: 1,
        fontFamily: "arial",
        width: 0,
        bottom: 0,
        left: 0,
        height: 0,
        fontSize: 0
    };
    const input = opeModel.input;


    const selectItem = opeModel.selectItem;
    if (!selectItem) {
        return style;
    }
    if (selectItem.objectType !== OBJECT_TYPE.CELL) {
        return style;
    }
    let cellPoint = selectItem.cellPoint;
    if (!cellPoint) {
        return style;
    }

    const cell = sheet.getCell(cellPoint);
    let rect;

    if (cell.mergeRange) {
        rect = cellRangeToRect(sheet, cell.mergeRange, opeModel.scroll);
        cellPoint = cell.mergeRange.leftTopPoint;
    }
    else {
        rect = targetToRect(sheet, cellPoint, opeModel.scroll);
    }
    
    if (protrude(rect, opeModel.canvasRect)){
        return style;
    }
    
    if (!input.isInputing){
        style.top = rect.top * sheet.scale - 1;
        style.left = rect.left * sheet.scale - 1;
        return style;
    }
    style.zIndex = 3; 

    style.top = rect.top * sheet.scale - 1;
    style.left = rect.left * sheet.scale - 1;
    style.width = rect.width * sheet.scale + 2;
    style.height = rect.height * sheet.scale + 2;

    style.fontSize = sheet.scale * 100 + "%";
    style.padding = "1px";
    style.border = "2px solid #2196F3";
    style.boxSizing = "border-box";
    
    return style;
}
