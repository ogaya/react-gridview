export function drawGrid(context, width, height) {
  context.lineWidth = 0.5;
  context.strokeStyle = "#999";
  const rowHeight = 18;
  for (let i = 0; i < (height / rowHeight); i++) {
    drawDashedLine(context, 0, i * rowHeight + 0.5, width, i * rowHeight + 0.5);
  }
  const columnWidth = 50;
  for (let i = 0; i < (width / columnWidth); i++) {
    drawDashedLine(context, i * columnWidth + 0.5, 0, i * columnWidth + 0.5, height);
  }
}

export function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

export function drawDashedLine(context, x, y, x2, y2, dashArray) {
  context.beginPath();
  if (!dashArray) {
    dashArray = [1, 1];
  }
  const dashCount = dashArray.length;
  context.moveTo(x, y);
  var dx = (x2 - x),
    dy = (y2 - y);
  var slope = dx ? dy / dx : 1e15;
  var distRemaining = Math.sqrt(dx * dx + dy * dy);
  var dashIndex = 0,
    draw = true;
  while (distRemaining >= 0.1) {
    let dashLength = dashArray[dashIndex++ % dashCount];
    if (dashLength > distRemaining) {
      dashLength = distRemaining;
    }
    var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
    if (dx < 0) {
      xStep = -xStep;
    }
    x += xStep;
    y += slope * xStep;
    context[draw ? 'lineTo' : 'moveTo'](x, y);
    distRemaining -= dashLength;
    draw = !draw;
  }
  context.stroke();
}
