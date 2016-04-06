import {Record} from "immutable";
import {Rect, Point, CellPoint} from "../../common";

import {OBJECT_TYPE} from "../../sheet";
import {Operation} from "../../operation";

// セル位置モデル
export class SelectInfo extends Record({
    objectType: null,
    cellPoint: null,
    point: null,
    rect: null
}) {
    objectType: OBJECT_TYPE;
    cellPoint: CellPoint;
    point: Point;
    rect: Rect;

    constructor(objectType: OBJECT_TYPE, cellPoint: CellPoint, rect: Rect, point: Point) {
        super({
            objectType: objectType,
            cellPoint: cellPoint,
            rect: rect,
            point: point
        });
    }
    
    public static create(objectType: OBJECT_TYPE, cellPoint: CellPoint, rect: Rect, point: Point) {
        return new SelectInfo(objectType, cellPoint, rect, point);
    }
}
