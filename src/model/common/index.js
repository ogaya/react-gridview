import {Rect} from "./rect";
import {CellPoint} from "./cellPoint";
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


const LINE_STYLE = Object.freeze({
  NORMAL: "NORMAL",
  DOT: "DOT"
});

const BORDER_POSITION = Object.freeze({
  TOP: "TOP",
  LEFT: "LEFT"
});

// リサイザーの幅
const RESIZER_BORDER_WIDTH = 4;



export {
  Rect,
  CellPoint,
  Point,
  VERTICAL_ALIGN,
  TEXT_ALIGN,
  RESIZER_BORDER_WIDTH,
  LINE_STYLE,
  BORDER_POSITION,
  COLOR
};
