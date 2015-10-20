import {CellPoint, BORDER_POSITION} from "../../../model/common";
import {targetToRect, cellRangeToRect} from "../../../model/lib/target_to_rect";

// セル枠の描画
function drawBorder(canvas, viewModel, opeModel, cellPoint, rect){
  let offset;
  const cell = viewModel.getCell(cellPoint);
  const topBorder = viewModel.getBorder(cellPoint, BORDER_POSITION.TOP);
  const leftBorder = viewModel.getBorder(cellPoint, BORDER_POSITION.LEFT);


  canvas.context.strokeStyle = topBorder.colors[0];
  // 上部分は結合されている
  const isTopMerge =
    (cell.mergeRange) &&
    (cell.mergeRange.minRowNo !== cell.rowNo);

  // 左部分は結合されている
  const isLeftMerge =
    (cell.mergeRange) &&
    (cell.mergeRange.minColumnNo !== cell.columnNo);

  if (!isTopMerge){
    const lineLength = topBorder.colors.length;
    offset = Math.floor(lineLength * topBorder.weight / 2);

    const hasDashTop = (topBorder.dash) && (topBorder.dash.length > 1);
    canvas.context.lineWidth = topBorder.weight;
    // 上のセルラインを描画
    for(let topIndex in topBorder.colors){
      const offsetTop = topBorder.weight * topIndex - offset;

      canvas.context.strokeStyle = topBorder.colors[topIndex];
      if (hasDashTop){
        canvas.drawDashedLine(rect.left, rect.top + offsetTop, rect.right, rect.top + offsetTop, topBorder.dash);
      }else {
        canvas.drawLine(rect.left, rect.top + offsetTop, rect.right, rect.top + offsetTop);
      }
    }
  }

  if (!isLeftMerge){
    const lineLength = topBorder.colors.length;
    offset = Math.floor(lineLength * leftBorder.weight / 2);

    // 左のセルラインを描画
    const hasDashLeft = (leftBorder.dash) && (leftBorder.dash.length > 1);
    canvas.context.lineWidth = leftBorder.weight;
    for(let leftIndex in leftBorder.colors){
      const offsetTLeft = leftBorder.weight * leftIndex - offset;

      canvas.context.strokeStyle = leftBorder.colors[leftIndex];
      if (hasDashLeft){
        canvas.drawDashedLine(rect.left + offsetTLeft, rect.top, rect.left + offsetTLeft, rect.bottom, leftBorder.dash);
      }
      else{
        canvas.drawLine(rect.left + offsetTLeft, rect.top, rect.left + offsetTLeft, rect.bottom);
      }
    }
  }
}

// セルの描画
function drawCell(canvas, model, opeModel, cellPoint ){


  const cell = model.getCell(cellPoint);

  let rect;
  if (cell.mergeRange) {
    rect = cellRangeToRect(model, cell.mergeRange, opeModel.scroll);
  }else{
    rect = targetToRect(model, cellPoint, opeModel.scroll);
  }

  const canCellView =  (!cell.mergeRange) || cellPoint.equals(cell.mergeRange.leftTopPoint);

  if ((cell.background) && (canCellView)){
    canvas.context.fillStyle = cell.background;
    canvas.drawRectFill(rect);
  }

  drawBorder(canvas, model, opeModel, cellPoint, rect);

  if (cell.textColor){
    canvas.context.fillStyle = cell.textColor;
  }
  else{
    canvas.context.fillStyle = "#000";
  }

  if (canCellView){
    canvas.context.font = "10pt Arial";
    canvas.drawText(cell.value, rect, cell.textAlign, cell.verticalAlign, cell.indent);
  }
}

// 行内の列描画
function drawColumn(canvas, model, rowNo, top, rowHeaderItem, opeModel) {
  let left = model.rowHeader.width;
  model.columnHeader.items.skip(opeModel.scroll.columnNo - 1)
    .takeWhile((item, columnNo) =>{
      const widthOver = (canvas.width < (left));

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
