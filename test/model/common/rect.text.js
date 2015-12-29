'use strict';

var Rect = require("../../../dist/model/common").Rect;

var assert = require("power-assert");

// 四角形オブジェクトのテスト
describe("Rect", function() {
  it("isIntersected", function() {
    var rect = new Rect(10, 10, 20, 20);

    assert.equal(rect.isIntersected(new Rect(0, 0, 10, 10)), false);
    assert.equal(rect.isIntersected(new Rect(0, 1, 10, 10)), false);
    assert.equal(rect.isIntersected(new Rect(1, 1, 10, 10)), true);

    assert.equal(rect.isIntersected(new Rect(1, 30, 10, 10)), false);
    assert.equal(rect.isIntersected(new Rect(1, 29, 10, 10)), true);

    assert.equal(rect.isIntersected(new Rect(30, 1, 10, 10)), false);
    assert.equal(rect.isIntersected(new Rect(29, 1, 10, 10)), true);

    assert.equal(rect.isIntersected(new Rect(30, 30, 10, 10)), false);
  });
});
