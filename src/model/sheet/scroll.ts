import {Record, Set} from "immutable";
import {VERTICAL_ALIGN, TEXT_ALIGN} from "../common";
import {calc, isCalc} from "../../calc";
import {CellPoint} from "../common";

export default class ScrollModel extends Record({
    horizontalHeight: 20,
    horizontalVisibility: "visible",
    verticalWidth: 20,
    verticalVisibility: "visible",
    background: "#AAA"
}) {
    horizontalHeight: number;
    horizontalVisibility: any;
    verticalWidth: number;
    verticalVisibility: any;
    background: any;

}
