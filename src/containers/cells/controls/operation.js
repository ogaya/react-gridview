import {targetToRect} from "../../../model/lib/target_to_rect";
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
  canvas.context.strokeStyle = "#35C";
  canvas.context.lineWidth = 1;

  const rect1 = targetToRect(viewModel, rangeItem.target1, opeModel.scroll);
  const rect2 = targetToRect(viewModel, rangeItem.target2, opeModel.scroll);
  const rect = Rect.forRects(rect1, rect2);

  canvas.context.fillStyle = "#35C";
  canvas.context.globalAlpha = 0.2;
  canvas.context.fillRect(rect.left, rect.top, rect.width, rect.height);
  canvas.context.globalAlpha = 1;
  canvas.drawRect(rect);


}

// ユーザー操作の描画
export default function drawOperation(canvas, viewModel, opeModel) {

  // リサイズ処理の描画
  drawColumnResize(canvas, viewModel, opeModel);
  drawRowResize(canvas, viewModel, opeModel);

  // 範囲選択の描画
  drawRange(canvas, viewModel, opeModel);

  // セル選択の描画
  const target = opeModel.selectItem && opeModel.selectItem.target;
  //console.log(target);
  if (!target){
    return;
  }
  canvas.context.strokeStyle = "#35C";
  canvas.context.lineWidth = 3;
  const rect = targetToRect(viewModel, target, opeModel.scroll);
  canvas.drawRect(rect);
}
