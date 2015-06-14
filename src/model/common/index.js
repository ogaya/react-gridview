import {Rect} from "./rect";
import {Target} from "./target";
import {Point} from "./point";

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

const RESIZER_BORDER_WIDTH = 2;

export {
  Rect,
  Target,
  Point,
  VERTICAL_ALIGN,
  TEXT_ALIGN,
  RESIZER_BORDER_WIDTH
};
