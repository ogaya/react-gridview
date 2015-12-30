import {Rect} from "./rect";
import {CellPoint} from "./cell-point";
import {CellRange} from "./cell-range";
import {Point} from "./point";
import {COLOR} from "./color";
const VERTICAL_ALIGN = Object.freeze({
    TOP: "TOP",
    MIDDLE: "MIDDLE",
    BOTTOM: "BOTTOM"
});

const TEXT_ALIGN = Object.freeze({
    LEFT: "LEFT",
    CENTER: "CENTER",
    RIGHT: "RIGHT"
});


enum LINE_STYLE {
    NORMAL=0,
    DOT=1
};

const BORDER_POSITION = Object.freeze({
    TOP: "TOP",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
    BOTTOM: "BOTTOM"
});

// リサイザーの幅
const RESIZER_BORDER_WIDTH = 4;



export {
Rect,
CellPoint,
CellRange,
Point,
VERTICAL_ALIGN,
TEXT_ALIGN,
RESIZER_BORDER_WIDTH,
LINE_STYLE,
BORDER_POSITION,
COLOR
};
