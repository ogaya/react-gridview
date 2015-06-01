import {Record}from "immutable";


export default class InputModel extends Record({
  isInputing: false,
  target: null,
  rect: null
}) {

  setIsInputing(isInputing){
    return this.set("isInputing", isInputing);
  }

  setRect(rect){
    return this.set("rect", rect);
  }

  setTarget(target){
    return this.set("target", target);
  }
}
