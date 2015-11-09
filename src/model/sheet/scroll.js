import {Record, Set} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import {calc, isCalc} from "../../calc";
import {CellPoint} from "../common";

function JsonToSet(json){
  let result = Set();

  if (!json){
    return result;
  }
  for(var key in json){
    result = result.add(json[key]);
  }
  return result;
}

export default class ScrollModel extends Record({
  horizontalHeight: 20,
  horizontalVisibility: "visible",
  verticalWidth: 20,
  verticalVisibility: "visible",
  background: "#AAA"
}) {

}
