import {Rect, Target} from "../../../model/common";

// セルの描画
function drawCell(canvas, model, rect, target){

  const item = model.getCell(target);
  canvas.context.fillStyle = item.background;
  canvas.context.strokeStyle = "#999";

  canvas.drawLine(rect.right, rect.top, rect.right, rect.bottom);
  canvas.drawLine(rect.left, rect.bottom, rect.right, rect.bottom);
  canvas.context.fillStyle = "#333";
  canvas.drawText(item.value, rect, item.textAlign, item.verticalAlign);
  //canvas.context.fillText(item.value, rect.left, rect.top);
}

// 行内の列描画
function drawColumn(canvas, model, index, top, rowHeaderItem) {

  let left = model.rowHeader.width;
  const items = model.columnHeader.items.toArray();
  for(let key in items){
    const item = items[key];
    const width = item.width;
    const height = rowHeaderItem.height;
    const widthOver = (canvas.width < (left + width));

    if (widthOver){
      return;
    }
    const rect = new Rect(left, top, width, height);
    const target = new Target(Number(key) + 1, Number(index) + 1);
    drawCell(canvas, model, rect, target);
    left = left + item.width;
  }
}

// 行毎の描画
export default function drawTable(canvas, model) {
  let top = model.columnHeader.height;
  const items = model.rowHeader.items.toArray();
  for(let key in items){
    const item = items[key];
    drawColumn(canvas, model, key, top, item);
    top = top + item.height;

    const heightOver = (canvas.height < top);
    if (heightOver){
      return;
    }
  }
}
