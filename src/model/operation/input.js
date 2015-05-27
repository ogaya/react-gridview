import {Record}from "immutable";


export default class InputModel extends Record({
  isInputing: false,
  top: 0,
  left: 0,
  width: 18,
  height: 50
}) {

  setIsInputing(isInputing){
    return this.set("isInputing", isInputing);
  }
}
