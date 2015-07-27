import {Record}from "immutable";
import InputModel from "./input";
import {Target} from "../common/target";
import {OBJECT_TYPE} from "../gridview/object-type";

function objectCursor(objectType){
  switch (objectType){
    case OBJECT_TYPE.CELL:
      return "pointer";
    case OBJECT_TYPE.COLUMN_RESIZER:
      return "col-resize";
    case OBJECT_TYPE.ROW_RESIZER:
      return "row-resize";
    case OBJECT_TYPE.COLUMN_HEADER:
      return "pointer";
    case OBJECT_TYPE.ROW_HEADER:
      return "pointer";
    default:
      return "default";
  }
}

export default class Operation extends Record({
  input: new InputModel(),
  selectItem: null,
  opeItem: null,
  hoverItem: null,
  rangeItem: null,
  canvasRect: null,
  scroll: new Target(1, 1)
}) {

  setInput(input){
    return this.set("input", input);
  }

  setSelectItem(selectItem){
    return this.set("selectItem", selectItem);
  }

  setScroll(scroll){
    return this.set("scroll", scroll);
  }
  
  withScroll(mutator){
    return this.set("scroll", mutator(this.scroll));
  }

  setHoverItem(hoverItem){
    return this.set("hoverItem", hoverItem);
  }

  setOpeItem(opeItem){
    return this.set("opeItem", opeItem);
  }

  setRangeItem(rangeItem){
    return this.set("rangeItem", rangeItem);
  }

  setCanvasRect(canvasRect){
    return this.set("canvasRect", canvasRect);
  }

  opeCursor(){
    if (!this.opeItem){
      return null;
    }

    // マウスの下にあるオブジェクトのタイプ
    const objectType = this.opeItem.objectType;
    return objectCursor(objectType);
  }

  get HoverCursor(){

    // 操作中のオブジェクトに対するマウスカーソルを変更する
    const opeCursor = this.opeCursor();
    if (opeCursor){
      return opeCursor;
    }

    if (!this.hoverItem){
      return "default";
    }


    // マウスの下にあるオブジェクトのタイプ
    const objectType = this.hoverItem.objectType;

    return objectCursor(objectType);
  }
}
