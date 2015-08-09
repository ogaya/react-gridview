import {Rect, CellPoint} from "../../../model/common";
import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";

// セルの描画
function drawCell(canvas, model, opeModel, cellPoint ){

  const cell = model.getCell(cellPoint);

  if (cell.background){
    canvas.context.fillStyle = cell.background;
    canvas.drawRectFill(rect);
  }

  let rect;
  if (cell.mergeRange) {
    rect = cellRangeToRect(model, cell.mergeRange, opeModel.scroll);
  }else{
    rect = targetToRect(model, cellPoint, opeModel.scroll);
  }

  canvas.context.strokeStyle = "#999";

  // 上部分は結合されている
  const isTopMerge =
    (cell.mergeRange) &&
    (cell.mergeRange.minRowNo !== cell.rowNo);

  // 左部分は結合されている
  const isLeftMerge =
    (cell.mergeRange) &&
    (cell.mergeRange.minColumnNo !== cell.columnNo);

  if (!isTopMerge){
    // 上のセルラインを描画
    canvas.drawLine(rect.left, rect.top, rect.right, rect.top);
  }

  if (!isLeftMerge){
    // 左のセルラインを描画
    canvas.drawLine(rect.left, rect.top, rect.left, rect.bottom);
  }

  if (cell.textColor){
    canvas.context.fillStyle = cell.textColor;
  }
  else{
    canvas.context.fillStyle = "#000";
  }

  if (cell.mergeRange) {
    if (cell.mergeRange.leftTopPoint.equals(cellPoint) === false){
      return;
    }
  }

  canvas.drawText(cell.value, rect, cell.textAlign, cell.verticalAlign);
  //canvas.context.fillText(item.value, rect.left, rect.top);
}

// 行内の列描画
function drawColumn(canvas, model, rowNo, top, rowHeaderItem, opeModel) {
  let left = model.rowHeader.width;
  model.columnHeader.items.skip(opeModel.scroll.columnNo - 1)
    .takeWhile((item, columnNo) =>{

      const width = item.width;
      const height = rowHeaderItem.height;
      const widthOver = (canvas.width < (left + width));

      if (widthOver){
        return false;
      }
      // const rect = new Rect(left, top, width, height);
      const cellPoint = new CellPoint(columnNo, rowNo);
      drawCell(canvas, model, opeModel, cellPoint);
      left = left + item.width;

      return true;
    });

}

// 行毎の描画
export default function drawTable(canvas, model, opeModel) {
  let top = model.columnHeader.height;
  model.rowHeader.items.skip(opeModel.scroll.rowNo - 1)
    .takeWhile((item, rowNo) =>{
      drawColumn(canvas, model, rowNo, top, item, opeModel);
      top = top + item.height;
      return (canvas.height >= top);
    });

}
