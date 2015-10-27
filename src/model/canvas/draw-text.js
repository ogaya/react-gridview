import {TEXT_ALIGN, VERTICAL_ALIGN} from "../common";

// 縦位置を調整する
function adjustVerticalAlign(context, rect, verticalAlign, indent) {
  switch(verticalAlign){
    case VERTICAL_ALIGN.TOP:
      context.textBaseline = "top";
      return rect.top + indent;

    case VERTICAL_ALIGN.BOTTOM:
        context.textBaseline = "bottom";
        return rect.bottom - indent;
    default:
      context.textBaseline = "middle";
      return rect.middle;
  }
}

// 横位置を調整する
function adjustTextlAlign(context, rect, textAligin, indent) {
  switch(textAligin){
    case TEXT_ALIGN.CENTER:
      context.textAlign = "center";
      return rect.center;

    case TEXT_ALIGN.RIGHT:
      context.textAlign = "right";
      return rect.right - indent;
    default:
      context.textAlign  = "left";
      return rect.left + 1 + indent;
  }
}

// 塗りつぶしテキストを描画する
export function drawFillText(context,
  value, rect, textAlign, verticalAlign, indent){

  indent = (indent) || 0;



  const x = adjustTextlAlign(context, rect, textAlign, indent);
  const y = adjustVerticalAlign(context, rect, verticalAlign, indent);

  //console.log(x + ":" + y);
  context.fillText(value, x, y);
}
