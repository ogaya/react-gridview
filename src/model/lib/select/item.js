import {Record} from "immutable";

// セル位置モデル
class SelectInfo extends Record({
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

export default {
  SelectInfo
};
