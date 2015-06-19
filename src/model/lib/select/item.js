import {Record} from "immutable";

// セル位置モデル
class SelectInfo extends Record({
  objectType: null,
  target: null,
  point: null,
  rect: null
}) {

  constructor(objectType, target, rect, point) {
    super({
      objectType: objectType,
      target: target,
      point: point,
      rect: rect
    });
  }
}

export default {
  SelectInfo
};
