import {targetToRect} from "../../../model/lib/target_to_rect";
import {COLOR} from "../../../model/common";
import {OBJECT_TYPE} from "../../../model/gridview";

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

// ユーザー操作の描画
export default function drawOperation(canvas, viewModel, opeModel) {

  // リサイズ処理の描画
  drawColumnResize(canvas, viewModel, opeModel);
  drawRowResize(canvas, viewModel, opeModel);

  // セル選択の描画
  const target = opeModel.selectItem && opeModel.selectItem.target;
  //console.log(target);
  if (!target){
    return;
  }
  canvas.context.strokeStyle = "#9AD";
  canvas.context.lineWidth = 5;
  const rect = targetToRect(viewModel, target, opeModel.scroll);
  canvas.drawRecine(rect);
}
