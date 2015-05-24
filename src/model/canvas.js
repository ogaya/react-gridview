import {Record} from "immutable";

export default class CanvasModel extends Record({
  context: null,
  width: 0,
  height: 0
}) {

  constructor(context, width, height) {
    super({context: context, width: width, height: height});
  }


  drawLine(x1, y1, x2, y2) {
    const context = this.context;
    context.beginPath();
    context.moveTo(x1 + 0.5, y1 + 0.5);
    context.lineTo(x2 + 0.5, y2 + 0.5);
    context.stroke();
  }

  drawDashedLine(x, y, x2, y2, dashArray) {
    const context = this.context;
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
}
