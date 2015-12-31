"use strict";
import {Record} from "immutable";
import {Rect} from "../common/rect";
const empty = new Rect(0, 0, 100, 100);

export default class StickyModel extends Record({
    location: empty,
    text: "",
    nodeName: ""
}) {
    equals(sticky) {
        return JSON.stringify(this.toJS()) === JSON.stringify(sticky.toJS());
    }
}
