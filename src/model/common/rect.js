import {Record} from "immutable";

// 矩形モデル
export class Rect extends Record({
  left: 0,
  top: 0,
  width: 0,
  height: 0
}) {

  constructor(left, top, width, height) {
    super({
      left: left,
      top: top,
      width: width,
      height: height
    });
  }

  setLeft(left){
    return this.set("left", left);
  }

  setTop(top){
    return this.set("top", top);
  }

  setWidth(width){
    return this.set("width", width);
  }

  setHeight(height){
    return this.set("height", height);
  }
  
  get right(){
    return this.left + this.width;
  }

  get bottom(){
    return this.top + this.height;
  }

  get middle(){
    return this.top + this.height / 2;
  }

  get center(){
    return this.left + this.width / 2;
  }

  get style(){
    return {
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height
    };
  }
}
