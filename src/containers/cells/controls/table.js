
function drawCell(canvas, model, left, top, width, height, cell){

  canvas.context.fillStyle = cell.background;
  canvas.context.strokeStyle = "#999";

  const right = left + width;
  const bottom = top + height;
  canvas.drawLine(right, top, right, bottom);
  canvas.drawLine(left, bottom, right, bottom);
}

function drawColumn(canvas, model, index, top, rowHeaderItem) {

  let left = model.rowHeader.width;
  model.columnHeader.Items.map((item) =>{
    const width = item.width;
    const height = rowHeaderItem.height;
    drawCell(canvas, model, left, top, width, height, item.cell);
    left = left + item.width;
  });
}

export default function drawTable(canvas, model) {
  let top = model.columnHeader.height;
  model.rowHeader.items.map((item, index) =>{
    drawColumn(canvas, model, index, top, item);
    top = top + item.height;
  });
}
