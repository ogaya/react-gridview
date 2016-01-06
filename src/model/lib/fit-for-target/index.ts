
//import {Rect} from "../../common";

import {targetToRect} from "../target_to_rect";

import {Sheet} from "../../sheet";
import {Operation} from "../../operation";
import {CellPoint} from "../../common";

// 右側にはみ出ていた場合の補正
function fitRight(sheet:Sheet, opeModel:Operation, target:CellPoint, scroll:CellPoint){

  let fitScroll = scroll;
  for(var i = target.columnNo; i < sheet.columnHeader.columnCount; i++){
    const targetRect = targetToRect(sheet, target, fitScroll);
    if (opeModel.canvasRect.width > targetRect.right * sheet.scale){
      return fitScroll;
    }

    const nextColumnNo = fitScroll.columnNo + 1;
    fitScroll = fitScroll.setColumnNo(nextColumnNo);
  }
  return scroll;
}

// 左側にはみ出ていた場合の補正
function fitLeft(sheet:Sheet, opeModel:Operation, target:CellPoint, scroll:CellPoint){

  let fitScroll = scroll;
  for(var i = target.columnNo; i >= 0; i--){
    const targetRect = targetToRect(sheet, target, fitScroll);
    if (targetRect.left > 0){
      return fitScroll;
    }

    const nextColumnNo = fitScroll.columnNo - 1;
    fitScroll = fitScroll.setColumnNo(nextColumnNo);
  }
  return scroll;
}


// 下側にはみ出ていた場合の補正
function fitBottom(sheet:Sheet, opeModel:Operation, target:CellPoint, scroll:CellPoint){

  let fitScroll = scroll;
  for(var i = target.rowNo; i < sheet.rowHeader.rowCount; i++){
    const targetRect = targetToRect(sheet, target, fitScroll);
    if (opeModel.canvasRect.height > targetRect.bottom * sheet.scale){
      return fitScroll;
    }

    const nextRowNo = fitScroll.rowNo + 1;
    fitScroll = fitScroll.setRowNo(nextRowNo);
  }
  return scroll;
}

// 上側にはみ出ていた場合の補正
function fitTop(sheet:Sheet, opeModel:Operation, target:CellPoint, scroll:CellPoint){

  let fitScroll = scroll;
  for(var i = target.rowNo; i >= 0; i--){
    const targetRect = targetToRect(sheet, target, fitScroll);
    if (targetRect.top > 0){
      return fitScroll;
    }

    const nextRowNo = fitScroll.rowNo - 1;
    fitScroll = fitScroll.setRowNo(nextRowNo);
  }
  return scroll;
}

// 対象セルが表示出来るようなスクロールポイントを作成する
export function fitForTarget(sheet:Sheet, opeModel:Operation, target:CellPoint) {

  let fitScroll = opeModel.scroll;

  fitScroll = fitRight(sheet, opeModel, target, fitScroll);
  fitScroll = fitLeft(sheet, opeModel, target, fitScroll);
  fitScroll = fitBottom(sheet, opeModel, target, fitScroll);
  fitScroll = fitTop(sheet, opeModel, target, fitScroll);

  return fitScroll;
}
