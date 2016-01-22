import {Record} from "immutable";
import {LINE_STYLE} from "../common";
import toMinJS from "../lib/to-min-js";

export class Border extends Record({
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

    setWeight(weight: number) {
        return <Border>this.set("weight", weight);
    }

    setColors(colors: Array<string>) {
        return <Border>this.set("colors", colors);
    }
    
    setColor(color: string){
        return <Border>this.set("colors", [color]);
    }

    setLineStyle(lineStyle: LINE_STYLE) {
        return <Border>this.set("lineStyle", lineStyle);
    }

    setDash(dash: Array<number>) {
        return <Border>this.set("dash", dash);
    }

    equals(border: Border) {
        return JSON.stringify(this.toJS()) === JSON.stringify(border.toJS());
    }

}

export {
Border as default
}