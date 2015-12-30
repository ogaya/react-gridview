import {Record} from "immutable";
import {drawFillText} from "./draw-text";
export default class CanvasModel extends Record({
    context: null,
    width: 0,
    height: 0
}) {

    context: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(context, width, height) {
        super({ context: context, width: width, height: height });
    }

    drawText(value, rect, textAligin, verticalAlign, indent) {
        drawFillText(this.context, value, rect, textAligin, verticalAlign, indent);
    }

    // 直線を引く
    drawLine(x1, y1, x2, y2) {
        const context = this.context;
        context.beginPath();
        context.moveTo(x1 + 0.5, y1 + 0.5);
        context.lineTo(x2 + 0.5, y2 + 0.5);
        context.stroke();
    }

    // 点線を引く
    drawDashedLine(x, y, x2, y2, dashArray) {
        const context = this.context;
        context.beginPath();
        if (!dashArray) {
            dashArray = [1, 1];
        }
        const dashCount = dashArray.length;
        context.moveTo(x + 0.5, y + 0.5);
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
            context[draw ? 'lineTo' : 'moveTo'](x + 0.5, y + 0.5);
            distRemaining -= dashLength;
            draw = !draw;
        }
        context.stroke();
    }

    drawRectLine(rect) {
        // 上ライン
        this.drawLine(rect.left, rect.top, rect.right, rect.top);
        // 右ライン
        this.drawLine(rect.right, rect.top, rect.right, rect.bottom);
        // 下ライン
        this.drawLine(rect.left, rect.bottom, rect.right, rect.bottom);
        // 左ライン
        this.drawLine(rect.left, rect.top, rect.left, rect.bottom);
    }

    drawRectDashedLine(rect, dashArray) {
        // 上ライン
        this.drawDashedLine(rect.left, rect.top, rect.right, rect.top, dashArray);
        // 右ライン
        this.drawDashedLine(rect.right, rect.top, rect.right, rect.bottom, dashArray);
        // 下ライン
        this.drawDashedLine(rect.left, rect.bottom, rect.right, rect.bottom, dashArray);
        // 左ライン
        this.drawDashedLine(rect.left, rect.top, rect.left, rect.bottom, dashArray);
    }

    drawRectFill(rect) {
        const context = this.context;
        context.fillRect(rect.left, rect.top, rect.width, rect.height);
    }
}
