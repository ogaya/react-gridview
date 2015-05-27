import {Record}from "immutable";
import InputModel from "./input";

export default class Operation extends Record({
  input: new InputModel()
}) {

  setInput(input){
    return this.set("input", input);
  }
}
