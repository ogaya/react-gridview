
import {Rect} from "../../common";

import {targetToRect} from "../target_to_rect";

// 右側にはみ出ていた場合の補正
function fitRight(viewModel, opeModel, target, scroll){

  let fitScroll = scroll;
  for(var i = target.columnNo; i < viewModel.columnHeader.maxCount; i++){
    const targetRect = targetToRect(viewModel, target, fitScroll);
    if (opeModel.canvasRect.width > targetRect.right){
      return fitScroll;
    }

    const nextColumnNo = fitScroll.columnNo + 1;
    fitScroll = fitScroll.setColumnNo(nextColumnNo);
  }
  return scroll;
}

// 左側にはみ出ていた場合の補正
function fitLeft(viewModel, opeModel, target, scroll){

  let fitScroll = scroll;
  for(var i = target.columnNo; i >= 0; i--){
    const targetRect = targetToRect(viewModel, target, fitScroll);
    if (targetRect.left > 0){
      return fitScroll;
    }

    const nextColumnNo = fitScroll.columnNo - 1;
    fitScroll = fitScroll.setColumnNo(nextColumnNo);
  }
  return scroll;
}


// 下側にはみ出ていた場合の補正
function fitBottom(viewModel, opeModel, target, scroll){

  let fitScroll = scroll;
  for(var i = target.rowNo; i < viewModel.rowHeader.maxCount; i++){
    const targetRect = targetToRect(viewModel, target, fitScroll);
    if (opeModel.canvasRect.height > targetRect.bottom){
      return fitScroll;
    }

    const nextRowNo = fitScroll.rowNo + 1;
    fitScroll = fitScroll.setRowNo(nextRowNo);
  }
  return scroll;
}

// 上側にはみ出ていた場合の補正
function fitTop(viewModel, opeModel, target, scroll){

  let fitScroll = scroll;
  for(var i = target.rowNo; i >= 0; i--){
    const targetRect = targetToRect(viewModel, target, fitScroll);
    if (targetRect.top > 0){
      return fitScroll;
    }

    const nextRowNo = fitScroll.rowNo - 1;
    fitScroll = fitScroll.setRowNo(nextRowNo);
  }
  return scroll;
}

// 対象セルが表示出来るようなスクロールポイントを作成する
export function fitForTarget(viewModel, opeModel, target) {

  let fitScroll = opeModel.scroll;

  fitScroll = fitRight(viewModel,opeModel , target, fitScroll);
  fitScroll = fitLeft(viewModel, opeModel, target, fitScroll);
  fitScroll = fitBottom(viewModel, opeModel, target, fitScroll);
  fitScroll = fitTop(viewModel, opeModel, target, fitScroll);

  return fitScroll;
}


export {
  fitForTarget
};
