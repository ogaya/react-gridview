import {Record} from "immutable";
import {LINE_STYLE} from "../common";
import toMinJS from "../lib/to-min-js";

export default class Border extends Record({
    // 線幅
    weight: 1,
    colors: ["#BBB"],
    lineStyle: LINE_STYLE.NORMAL,
    dash: []
}) {
    weight: number;
    colors: Array<string>;
    lineStyle: LINE_STYLE;
    dash: Array<number>;


    static fromJS(json) {
        const border = Border.create();

        if (!json) {
            return border;
        }
        return border
            .setWeight(json.weight || border.weight)
            .setColors(json.colors || border.colors)
            .setLineStyle(json.lineStyle || border.lineStyle)
            .setDash(json.dash || border.dash);
    }

    toMinJS() {
        return toMinJS(this, new Border, Border);
    }
    static create() {
        return new Border();
    };

    setWeight(weight) : this {
        return <this> this.set("weight", weight);
    }

    setColors(colors):this {
        return <this> this.set("colors", colors);
    }

    setLineStyle(lineStyle):this {
        return <this> this.set("lineStyle", lineStyle);
    }

    setDash(dash):this {
        return <this> this.set("dash", dash);
    }

    equals(border) {
        return JSON.stringify(this.toJS()) === JSON.stringify(border.toJS());
    }

}
