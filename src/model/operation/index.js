import {Record}from "immutable";
import InputModel from "./input";
import SelectModel from "./select";

export default class Operation extends Record({
  input: new InputModel(),
  select: new SelectModel()
}) {

  setInput(input){
    return this.set("input", input);
  }

  setSelect(select){
    return this.set("select", select);
  }
}
