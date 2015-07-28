import {Rect, Target} from "../../../model/common";

// セルの描画
function drawCell(canvas, model, rect, target){

  const item = model.getCell(target);

  if (item.background){
    canvas.context.fillStyle = item.background;
    canvas.drawRectFill(rect);
  }

  canvas.context.strokeStyle = "#999";

  canvas.drawLine(rect.left, rect.top, rect.right, rect.top);
  canvas.drawLine(rect.left, rect.top, rect.left, rect.bottom);


  if (item.textColor){
    canvas.context.fillStyle = item.textColor;
  }
  else{
    canvas.context.fillStyle = "#000";
  }

  canvas.drawText(item.value, rect, item.textAlign, item.verticalAlign);
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
      const rect = new Rect(left, top, width, height);
      const target = new Target(columnNo, rowNo);
      drawCell(canvas, model, rect, target);
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
