import {Record} from "immutable";
import {drawFillText} from "./draw-text";
import {TEXT_ALIGN, VERTICAL_ALIGN, Rect} from "../common";

export class Canvas extends Record({
    context: null,
    width: 0,
    height: 0
}) {

    context: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(context: CanvasRenderingContext2D, width: number, height: number) {
        super({ context: context, width: width, height: height });
    }

    drawText(value:string, rect:Rect, 
        textAligin:TEXT_ALIGN, verticalAlign:VERTICAL_ALIGN, indent:number=0) {
        drawFillText(this.context, value, rect, textAligin, verticalAlign, indent);
    }

    // 直線を引く
    drawLine(x1: number, y1: number, x2: number, y2: number) {
        const context = this.context;
        context.beginPath();
        context.moveTo(x1 + 0.5, y1 + 0.5);
        context.lineTo(x2 + 0.5, y2 + 0.5);
        context.stroke();
    }

    // 点線を引く
    drawDashedLine(x: number, y: number, x2: number, y2: number, dashArray: Array<number>) {
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

    drawRectLine(rect: Rect) {
        // 上ライン
        this.drawLine(rect.left, rect.top, rect.right, rect.top);
        // 右ライン
        this.drawLine(rect.right, rect.top, rect.right, rect.bottom);
        // 下ライン
        this.drawLine(rect.left, rect.bottom, rect.right, rect.bottom);
        // 左ライン
        this.drawLine(rect.left, rect.top, rect.left, rect.bottom);
    }

    drawRectDashedLine(rect: Rect, dashArray: Array<number>) {
        // 上ライン
        this.drawDashedLine(rect.left, rect.top, rect.right, rect.top, dashArray);
        // 右ライン
        this.drawDashedLine(rect.right, rect.top, rect.right, rect.bottom, dashArray);
        // 下ライン
        this.drawDashedLine(rect.left, rect.bottom, rect.right, rect.bottom, dashArray);
        // 左ライン
        this.drawDashedLine(rect.left, rect.top, rect.left, rect.bottom, dashArray);
    }

    drawRectFill(rect: Rect) {
        const context = this.context;
        context.fillRect(rect.left, rect.top, rect.width, rect.height);
    }
}

export {
    Canvas as default
}