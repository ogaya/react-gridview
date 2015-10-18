import {Record} from "immutable";
import {LINE_STYLE} from "../common";

export default class Border extends Record({
  // 線幅
  weight: 1,
  colors: ["#AAA"],
  lineStyle: LINE_STYLE.NORMAL,
  dash: []
}) {

  static createClass(){
    return new Border();
  };

  setWeight(weight){
    return this.set("weight", weight);
  }

  setColors(colors){
    return this.set("colors", colors);
  }

  setLineStyle(lineStyle){
    return this.set("lineStyle", lineStyle);
  }

  setDash(dash){
    return this.set("dash", dash);
  }

  equals(border){
    return JSON.stringify(this.toJS()) === JSON.stringify(border.toJS());
  }

}
