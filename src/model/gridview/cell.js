import {Record} from "immutable";

export default class Cell extends Record({
  value: "",
  background: null
}) {

  setBackground(background) {
    return this.set("background", background);
  }
  setValue(value) {
    return this.set("value", value);
  }
}
