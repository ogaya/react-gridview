import {Record} from "immutable";

// セル位置モデル
class SelectInfo extends Record({
  objectType: null,
  target: null,
  rect: null
}) {

  constructor(objectType, target, rect) {
    super({
      objectType: objectType,
      target: target,
      rect: rect
    });
  }
}

export default {
  SelectInfo
};
