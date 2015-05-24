export default function drawColumnHeader(canvas, columnHeader, rowHeader) {
  const context = canvas.context;
  //const headerHaight = 18;
  //塗りスタイルに青色を指定する
  //context.fillStyle = "rgb(200, 200, 200)";
  context.fillStyle = columnHeader.background;
  //左から20上から20の位置に幅50高さ50の塗りつぶしの四角形を描く
  context.fillRect(rowHeader.width, 0, columnHeader.width, columnHeader.height);
  context.strokeStyle = "#999";
  let sumWidth = rowHeader.width;
  columnHeader.Items.map((item) =>{
    sumWidth = sumWidth + item.width;
    canvas.drawLine(sumWidth, 0, sumWidth, columnHeader.height);
  });
}
