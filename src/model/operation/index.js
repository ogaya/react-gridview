import {Record}from "immutable";
import InputModel from "./input";
import SelectModel from "./select";
import {Target} from "../common/target";

export default class Operation extends Record({
  input: new InputModel(),
  select: new SelectModel(),
  scroll: new Target(1, 1)
}) {

  setInput(input){
    return this.set("input", input);
  }

  setSelect(select){
    return this.set("select", select);
  }

  setScroll(scroll){
    return this.set("scroll", scroll);
  }

}
