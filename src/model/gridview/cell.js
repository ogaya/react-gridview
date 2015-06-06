import {Record} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";

export default class Cell extends Record({
  value: "",
  verticalAlign: VERTICAL_ALIGN.CENTER,
  textAlign: TEXT_ALIGN.RIGHT,
  indent: 1,
  background: null
}) {

  setBackground(background) {
    return this.set("background", background);
  }
  setValue(value) {
    return this.set("value", value);
  }

  setVerticalAlign(verticalAlign){
    return this.set("verticalAlign", verticalAlign);
  }

  setTextAlign(textAlign){
    return this.set("textAlign", textAlign);
  }
}
