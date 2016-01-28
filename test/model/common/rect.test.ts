'use strict';

import assert from "power-assert";
import {Rect} from "../../../src/model/common";

// 四角形オブジェクトのテスト
describe("Rect", function () {
    
    it("forPoints", function(){
       var rect = Rect.forPoints(1, 2, 3, 4);
        assert.equal(rect.left, 1);
        assert.equal(rect.top, 2);
        assert.equal(rect.width, 2);
        assert.equal(rect.height, 2);
    });
    it("reduce", function(){
        var rect = new Rect(10, 10, 10, 10);
        rect = rect.reduce(1);
        assert.equal(rect.left, 11);
        assert.equal(rect.top, 11);
        assert.equal(rect.width, 8);
        assert.equal(rect.height, 8);
    });
    it("forRects", function(){
       var rect = Rect.forRects(
           new Rect(10, 10, 10, 10),
           new Rect(15, 15, 15, 15)
       );
        assert.equal(rect.left, 10);
        assert.equal(rect.top, 10);
        assert.equal(rect.width, 20);
        assert.equal(rect.height, 20);
    });
    it("middle center", function(){
       var rect = new Rect(10, 20, 10, 10);
        assert.equal(rect.middle, 25);
        assert.equal(rect.center, 15);
    });
    it("style", function(){
       var rect = new Rect(10, 10, 10, 10);
       var style = rect.style;
        assert.equal(style.left, 10);
    });
    it("setLeft", function(){
        var rect = new Rect(10, 10, 10, 10);
        rect = rect.setLeft(20);
        assert.equal(rect.left, 20);
        assert.equal(rect.top, 10);
        assert.equal(rect.width, 10);
        assert.equal(rect.height, 10);
    });
    it("setTop", function(){
        var rect = new Rect(10, 10, 10, 10);
        rect = rect.setTop(20);
        assert.equal(rect.left, 10);
        assert.equal(rect.top, 20);
        assert.equal(rect.width, 10);
        assert.equal(rect.height, 10);
    });
    it("setWidth", function(){
        var rect = new Rect(10, 10, 10, 10);
        rect = rect.setWidth(20);
        assert.equal(rect.left, 10);
        assert.equal(rect.top, 10);
        assert.equal(rect.width, 20);
        assert.equal(rect.height, 10);
    });
    it("setHeight", function(){
        var rect = new Rect(10, 10, 10, 10);
        rect = rect.setHeight(20);
        assert.equal(rect.left, 10);
        assert.equal(rect.top, 10);
        assert.equal(rect.width, 10);
        assert.equal(rect.height, 20);
    });
    it("isIntersected", function () {
        var rect = new Rect(10, 10, 20, 20);

        assert.equal(rect.isIntersected(new Rect(0, 0, 10, 10)), false);
        assert.equal(rect.isIntersected(new Rect(0, 1, 10, 10)), false);
        assert.equal(rect.isIntersected(new Rect(1, 0, 10, 10)), false);
        assert.equal(rect.isIntersected(new Rect(1, 1, 10, 10)), true);

        assert.equal(rect.isIntersected(new Rect(1, 30, 10, 10)), false);
        assert.equal(rect.isIntersected(new Rect(1, 29, 10, 10)), true);

        assert.equal(rect.isIntersected(new Rect(30, 1, 10, 10)), false);
        assert.equal(rect.isIntersected(new Rect(29, 1, 10, 10)), true);

        assert.equal(rect.isIntersected(new Rect(30, 30, 10, 10)), false);
        assert.equal(rect.isIntersected(null), false);
    });
});
