export default function drawRowHeader(canvas, columnHeader, rowHeader) {
  const context = canvas.context;
  context.fillStyle = "#BEE";
  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(0, columnHeader.height, rowHeader.width, rowHeader.height);

  context.strokeStyle = "#999";
  let sumHeight = columnHeader.height;

  const items = rowHeader.items.toArray();
  for (let key in items) {
    const item = items[key];
    sumHeight = sumHeight + item.height;
    //sumHeight = sumHeight + 18;
    if (sumHeight > canvas.height) {
      return;
    }
    canvas.drawLine(0, sumHeight, rowHeader.width, sumHeight);
  }

}
