'use strict';

var CellRange = require("../../../dist/model/common").CellRange;
var CellPoint = require("../../../dist/model/common").CellPoint;

var assert = require("power-assert");


describe("CellRange", function () {
    it("no", function () {
        var cellRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(25, 30)
            );
        assert.equal(cellRange.minColumnNo, 10);
        assert.equal(cellRange.minRowNo, 15);
        assert.equal(cellRange.maxColumnNo, 25);
        assert.equal(cellRange.maxRowNo, 30);
    });
    it("point", function(){
        var cellRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(25, 30)
            );
        assert.equal(cellRange.leftTopPoint.columnNo, 10);
        assert.equal(cellRange.leftTopPoint.rowNo, 15);
        assert.equal(cellRange.rightBottomPoint.columnNo, 25);
        assert.equal(cellRange.rightBottomPoint.rowNo, 30);
    });
    it("merge", function(){
        var cellRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(25, 30)
            );
        var cellRange2 = new CellRange(
            new CellPoint(25, 30),
            new CellPoint(45, 50)
            );
        cellRange = cellRange.merge(cellRange2);
        assert.equal(cellRange.leftTopPoint.columnNo, 10);
        assert.equal(cellRange.leftTopPoint.rowNo, 15);
        assert.equal(cellRange.rightBottomPoint.columnNo, 45);
        assert.equal(cellRange.rightBottomPoint.rowNo, 50);
    });
    it("cellPoints", function(){
        var cellRange = new CellRange(
            new CellPoint(1, 1),
            new CellPoint(2, 2)
            );
        var points = cellRange.cellPoints();
        assert.equal(points.count(), 4);
    })
    it("equals", function(){
        var cellRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(25, 30)
            );
        assert.equal(cellRange.equals(null), false);
        var testRange = new CellRange(
            new CellPoint(9, 15),
            new CellPoint(25, 30)
            );
        assert.equal(cellRange.equals(testRange), false);
        testRange = new CellRange(
            new CellPoint(10, 14),
            new CellPoint(25, 30)
            );
        assert.equal(cellRange.equals(testRange), false);
        testRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(24, 30)
            );
        assert.equal(cellRange.equals(testRange), false);
        testRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(25, 39)
            );
        assert.equal(cellRange.equals(testRange), false);
        testRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(25, 30)
            );
        assert.equal(cellRange.equals(testRange), true);
    });
});
