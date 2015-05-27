import {Record} from "immutable";

export default class Cell extends Record({
  value: "",
  background: null
}) {

  setValue(value) {
    return this.set("value", value);
  }
}
