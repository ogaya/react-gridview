import {Record}from "immutable";


export default class SelectModel extends Record({
  target: null
}) {

  setTarget(target){
    return this.set("target", target);
  }
}
