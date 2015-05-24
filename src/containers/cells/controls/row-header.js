export default function drawRowHeader(canvas, columnHeader, rowHeader) {
  const context = canvas.context;
  context.fillStyle = rowHeader.background;
  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(0, columnHeader.height, rowHeader.width, rowHeader.height);

  context.strokeStyle = "#999";
  let sumHeight = columnHeader.height;
  rowHeader.items.map((item) =>{

    sumHeight = sumHeight + item.height;
    canvas.drawLine(0, sumHeight, rowHeader.width, sumHeight);
  });
}
