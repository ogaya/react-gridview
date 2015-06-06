import {TEXT_ALIGN, VERTICAL_ALIGN} from "../common";

// 縦位置を調整する
function adjustVerticalAlign(context, rect, verticalAlign) {
  switch(verticalAlign){
    case VERTICAL_ALIGN.TOP:
      context.textBaseline = "top";
      return rect.top;

    case VERTICAL_ALIGN.BOTTOM:
        context.textBaseline = "bottom";
        return rect.bottom;
    default:
      context.textBaseline = "middle";
      return rect.middle;
  }
}

// 横位置を調整する
function adjustTextlAlign(context, rect, textAligin) {
  switch(textAligin){
    case TEXT_ALIGN.CENTER:
      context.textAlign = "center";
      return rect.center;

    case TEXT_ALIGN.RIGHT:
        context.textAlign = "right";
        return rect.right;
    default:
      context.textAlign  = "left";
      return rect.left;
  }
}

// 塗りつぶしテキストを描画する
export function drawFillText(context,
  value, rect, textAlign, verticalAlign){

  const x = adjustTextlAlign(context, rect, textAlign);
  const y = adjustVerticalAlign(context, rect, verticalAlign);
  context.fillText(value, x, y);
}
