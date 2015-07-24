import {Rect, Target} from "../../../model/common";

// セルの描画
function drawCell(canvas, model, rect, target){

  const item = model.getCell(target);
  canvas.context.fillStyle = item.background;
  canvas.context.strokeStyle = "#999";

  canvas.drawLine(rect.right, rect.top, rect.right, rect.bottom);
  canvas.drawLine(rect.left, rect.bottom, rect.right, rect.bottom);

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
function drawColumn(canvas, model, index, top, rowHeaderItem, opeModel) {
  const columnNo = opeModel.scroll.columnNo;
  const rowNo = opeModel.scroll.rowNo;
  let left = model.rowHeader.width;
  const items = model.columnHeader.items.skip(columnNo - 1).toArray();
  for(let key in items){
    const item = items[key];
    const width = item.width;
    const height = rowHeaderItem.height;
    const widthOver = (canvas.width < (left + width));

    if (widthOver){
      return;
    }
    const rect = new Rect(left, top, width, height);
    const target = new Target(Number(key) + columnNo, Number(index) + rowNo);
    drawCell(canvas, model, rect, target);
    left = left + item.width;
  }
}

// 行毎の描画
export default function drawTable(canvas, model, opeModel) {
  let top = model.columnHeader.height;
  const rowNo = opeModel.scroll.rowNo;
  const items = model.rowHeader.items.skip(rowNo - 1).toArray();
  for(let key in items){
    const item = items[key];
    drawColumn(canvas, model, key, top, item, opeModel);
    top = top + item.height;

    const heightOver = (canvas.height < top);
    if (heightOver){
      return;
    }
  }
}
