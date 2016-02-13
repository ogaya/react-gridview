
import {Record} from "immutable";

// セル位置モデル
export class Point extends Record({
    x: 0,
    y: 0
}) {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super({
            x: Number(x),
            y: Number(y)
        });
    }
    static create(x: number, y: number){
        return new Point(x, y);
    }
}
