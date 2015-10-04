import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";
import {COLOR} from "../../../model/common";
import {OBJECT_TYPE} from "../../../model/gridview";
import {Rect} from "../../../model/common/rect";

// 列のリサイズ処理を描画
function drawColumnResize(canvas, viewModel, opeModel){
  if (!opeModel.opeItem){
    return;
  }
  if (opeModel.opeItem.objectType !== OBJECT_TYPE.COLUMN_RESIZER){
    return;
  }

  canvas.context.strokeStyle = COLOR.RESIZER;
  canvas.context.lineWidth = 5;
  const x = opeModel.hoverItem.point.x;
  canvas.drawLine(x, 0, x, canvas.height);
}

// 行のリサイズ描画
function drawRowResize(canvas, viewModel, opeModel){
  if (!opeModel.opeItem){
    return;
  }
  if (opeModel.opeItem.objectType !== OBJECT_TYPE.ROW_RESIZER){
    return;
  }

  canvas.context.strokeStyle = COLOR.RESIZER;
  canvas.context.lineWidth = 5;
  const y = opeModel.hoverItem.point.y;
  canvas.drawLine(0, y, canvas.width, y);
}

// 範囲選択の描画
function drawRange(canvas, viewModel, opeModel){
  const rangeItem = opeModel.rangeItem;
  if (!rangeItem){
    return;
  }

  if ((rangeItem.cellPoint1.columnNo === rangeItem.cellPoint2.columnNo) &&
      (rangeItem.cellPoint1.rowNo === rangeItem.cellPoint2.rowNo)){
    return;
  }

  const cellPoint = opeModel.selectItem && opeModel.selectItem.cellPoint;
  //console.log(target);
  if (!cellPoint){
    return;
  }
  const cell = viewModel.getCell(cellPoint);

  if (rangeItem.equals(cell.mergeRange)){
    return;
  }

  canvas.context.strokeStyle = "#35C";
  canvas.context.lineWidth = 1;

  const rect = cellRangeToRect(viewModel, rangeItem, opeModel.scroll);

  canvas.context.fillStyle = "#35C";
  canvas.context.globalAlpha = 0.2;
  canvas.context.fillRect(rect.left, rect.top, rect.width, rect.height);
  canvas.context.globalAlpha = 1;
  canvas.drawRectLine(rect);
}

function drawSelectCell(canvas, viewModel, opeModel){
  // セル選択の描画
  const cellPoint = opeModel.selectItem && opeModel.selectItem.cellPoint;
  //console.log(target);
  if (!cellPoint){
    return;
  }

  const cell = viewModel.getCell(cellPoint);
  canvas.context.strokeStyle = "#35C";
  canvas.context.lineWidth = 3;
  if (cell.mergeRange){
    const rect = cellRangeToRect(viewModel, cell.mergeRange, opeModel.scroll);
    canvas.drawRectLine(rect);
  }
  else{

    const rect = targetToRect(viewModel, cellPoint, opeModel.scroll);
    canvas.drawRectLine(rect);
  }


}

// ユーザー操作の描画
export default function drawOperation(canvas, viewModel, opeModel) {

  // リサイズ処理の描画
  drawColumnResize(canvas, viewModel, opeModel);
  drawRowResize(canvas, viewModel, opeModel);

  // 範囲選択の描画
  drawRange(canvas, viewModel, opeModel);
  // 選択セルの描画
  drawSelectCell(canvas, viewModel, opeModel);

}
