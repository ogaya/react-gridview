'use strict';
import assert from "power-assert";
import {CellPoint} from "../../../src/model/common";

// 列ヘッダーのアイテムを選択しているか判定
describe("CellPoint", function () {
    describe("fromJS", function () {
        it("null", function(){
            var cellPoint = CellPoint.fromJS(null);
            assert.equal(cellPoint, null);
        });
        
        it("1-2", function(){
            var cellPoint = CellPoint.fromJS({
                columnNo: 1,
                rowNo: 2
            });
            assert.equal(cellPoint.columnNo, 1);
            assert.equal(cellPoint.rowNo, 2);
        });
        it("2-1", function(){
            var cellPoint = CellPoint.fromJS({
                columnNo: 2,
                rowNo: 1
            });
            assert.equal(cellPoint.columnNo, 2);
            assert.equal(cellPoint.rowNo, 1);
        });
    });
    describe("fromId", function () {
        it("A1", function () {
            var cellPoint = CellPoint.fromId("A1");
            assert.equal(cellPoint.columnNo, 1);
            assert.equal(cellPoint.rowNo, 1);
        });

        it("Z1", function () {
            var cellPoint = CellPoint.fromId("Z1");
            assert.equal(cellPoint.columnNo, 26);
            assert.equal(cellPoint.rowNo, 1);
        });

        it("AA1", function () {
            var cellPoint = CellPoint.fromId("AA1");
            assert.equal(cellPoint.columnNo, 27);
            assert.equal(cellPoint.rowNo, 1);
        });

        it("A9", function () {
            var cellPoint = CellPoint.fromId("A9");
            assert.equal(cellPoint.columnNo, 1);
            assert.equal(cellPoint.rowNo, 9);
        });

        it("A10", function () {
            var cellPoint = CellPoint.fromId("A10");
            assert.equal(cellPoint.columnNo, 1);
            assert.equal(cellPoint.rowNo, 10);
        });

        it("AB357", function () {
            var cellPoint = CellPoint.fromId("AB357");
            assert.equal(cellPoint.columnNo, 28);
            assert.equal(cellPoint.rowNo, 357);
        });
    });
});
