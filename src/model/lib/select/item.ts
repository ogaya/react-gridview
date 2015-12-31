import {Record} from "immutable";

// セル位置モデル
export class SelectInfo extends Record({
    objectType: null,
    cellPoint: null,
    point: null,
    rect: null
}) {

    constructor(objectType, cellPoint, rect, point) {
        super({
            objectType: objectType,
            cellPoint: cellPoint,
            rect: rect,
            point: point
        });
    }
}
