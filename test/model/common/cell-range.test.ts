'use strict';

import assert from"power-assert";

import {CellRange} from "../../../src/model/common";
import {CellPoint} from "../../../src/model/common";
import {Rect, Point} from "../../../src/model/common";

import {Sheet, OBJECT_TYPE} from "../../../src/model/sheet"
import {Operation} from "../../../src/model/operation";
import {SelectInfo} from "../../../src/model/lib/select";
import {modelToRangeItem} from "../../../src/model/common/cell-range";
import {fitRange} from "../../../src/model/common/cell-range";
import {DEFAULT_ROW_COUNT} from "../../../src/model/sheet/row-header";
import {DEFAULT_COLUMN_COUNT} from "../../../src/model/sheet/column-header";

describe("CellRange", function() {

    it("fromJS", function() {
        assert.equal(CellRange.fromJS(null), null);
        var cellRange = CellRange.fromJS({
            cellPoint1: {
                columnNo: 1,
                rowNo: 3
            }
        });
        assert.equal(cellRange, null);
        cellRange = CellRange.fromJS({
            cellPoint2: {
                columnNo: 2,
                rowNo: 4
            }
        });
        assert.equal(cellRange, null);
        cellRange = CellRange.fromJS({
            cellPoint1: {
                columnNo: 1,
                rowNo: 3
            },
            cellPoint2: {
                columnNo: 2,
                rowNo: 4
            }
        });
        assert.equal(cellRange.leftTopPoint.columnNo, 1);
        assert.equal(cellRange.leftTopPoint.rowNo, 3);
        assert.equal(cellRange.rightBottomPoint.columnNo, 2);
        assert.equal(cellRange.rightBottomPoint.rowNo, 4);
    });
    it("no", function() {
        var cellRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(25, 30)
        );
        assert.equal(cellRange.minColumnNo, 10);
        assert.equal(cellRange.minRowNo, 15);
        assert.equal(cellRange.maxColumnNo, 25);
        assert.equal(cellRange.maxRowNo, 30);
    });
    it("point", function() {
        var cellRange = new CellRange(
            new CellPoint(10, 15),
            new CellPoint(25, 30)
        );
        assert.equal(cellRange.leftTopPoint.columnNo, 10);
        assert.equal(cellRange.leftTopPoint.rowNo, 15);
        assert.equal(cellRange.rightBottomPoint.columnNo, 25);
        assert.equal(cellRange.rightBottomPoint.rowNo, 30);
    });
    it("merge", function() {
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
    it("cellPoints", function() {
        var cellRange = new CellRange(
            new CellPoint(1, 1),
            new CellPoint(2, 2)
        );
        var points = cellRange.cellPoints();
        assert.equal(points.count(), 4);
    })
    it("equals", function() {
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

describe("modelToRangeItem", function() {

    it("none operation", function() {

        const sheet = Sheet.create();
        const operation = Operation.create();

        const range = modelToRangeItem(sheet, operation);
        assert.equal(range, null);

    });
    it("select column header", function() {

        // ヘッダを選択したとき
        const item = SelectInfo.create(
            OBJECT_TYPE.COLUMN_HEADER,
            CellPoint.create(3, 0),
            Rect.create(50, 0, 50, 18),
            Point.create(52, 5)
        );

        const sheet = Sheet.create();
        const operation = Operation
            .create()
            .setOpeItem(item);

        const range = modelToRangeItem(sheet, operation);
        assert.equal(range.leftTopPoint.columnNo, 3);
        assert.equal(range.leftTopPoint.rowNo, 1);
        assert.equal(range.rightBottomPoint.columnNo, 3);
        assert.equal(range.rightBottomPoint.rowNo, DEFAULT_ROW_COUNT);
    });

    it("drag column header", function() {

        // ヘッダを選択したとき
        const opeItem = SelectInfo.create(
            OBJECT_TYPE.COLUMN_HEADER,
            CellPoint.create(3, 0),
            null, null
        );

        const hoverItem = SelectInfo.create(
            OBJECT_TYPE.COLUMN_HEADER,
            CellPoint.create(4, 0),
            null, null
        );

        const sheet = Sheet.create();
        const operation = Operation
            .create()
            .setOpeItem(opeItem)
            .setHoverItem(hoverItem);

        const range = modelToRangeItem(sheet, operation);
        assert.equal(range.leftTopPoint.columnNo, 3);
        assert.equal(range.leftTopPoint.rowNo, 1);
        assert.equal(range.rightBottomPoint.columnNo, 4);
        assert.equal(range.rightBottomPoint.rowNo, DEFAULT_ROW_COUNT);
    });

    it("select row header", function() {
        const item = SelectInfo.create(
            OBJECT_TYPE.ROW_HEADER,
            CellPoint.create(0, 5),
            null, null
        );

        const sheet = Sheet.create();
        const operation = Operation
            .create()
            .setOpeItem(item);

        const range = modelToRangeItem(sheet, operation);
        assert.equal(range.leftTopPoint.columnNo, 1);
        assert.equal(range.leftTopPoint.rowNo, 5);
        assert.equal(range.rightBottomPoint.columnNo, DEFAULT_COLUMN_COUNT);
        assert.equal(range.rightBottomPoint.rowNo, 5);
    });


    it("hover row header", function() {
        const opeItem = SelectInfo.create(
            OBJECT_TYPE.ROW_HEADER,
            CellPoint.create(0, 5),
            null, null
        );

        const hoverItem = SelectInfo.create(
            OBJECT_TYPE.ROW_HEADER,
            CellPoint.create(0, 2),
            null, null
        );

        const sheet = Sheet.create();
        const operation = Operation
            .create()
            .setOpeItem(opeItem)
            .setHoverItem(hoverItem);

        const range = modelToRangeItem(sheet, operation);
        assert.equal(range.leftTopPoint.columnNo, 1);
        assert.equal(range.leftTopPoint.rowNo, 2);
        assert.equal(range.rightBottomPoint.columnNo, DEFAULT_COLUMN_COUNT);
        assert.equal(range.rightBottomPoint.rowNo, 5);
    });

    it("select cell", function() {
        const opeItem = SelectInfo.create(
            OBJECT_TYPE.CELL,
            CellPoint.create(1, 5),
            null, null
        );

        const sheet = Sheet.create();
        const operation = Operation
            .create()
            .setOpeItem(opeItem);

        const range = modelToRangeItem(sheet, operation);
        assert.equal(range.leftTopPoint.columnNo, 1);
        assert.equal(range.leftTopPoint.rowNo, 5);
        assert.equal(range.rightBottomPoint.columnNo, 1);
        assert.equal(range.rightBottomPoint.rowNo, 5);
    });

    it("select range", function() {
        const opeItem = SelectInfo.create(
            OBJECT_TYPE.CELL,
            CellPoint.create(1, 5),
            null, null
        );
        const hoverItem = SelectInfo.create(
            OBJECT_TYPE.CELL,
            CellPoint.create(5, 1),
            null, null
        );

        const sheet = Sheet.create();
        const operation = Operation
            .create()
            .setOpeItem(opeItem)
            .setHoverItem(hoverItem);

        const range = modelToRangeItem(sheet, operation);
        assert.equal(range.leftTopPoint.columnNo, 1);
        assert.equal(range.leftTopPoint.rowNo, 1);
        assert.equal(range.rightBottomPoint.columnNo, 5);
        assert.equal(range.rightBottomPoint.rowNo, 5);
    });

});



describe("fitRange", function() {

    it("top merge", function() {

        const sheet = Sheet
            .create()
            .mergeRange(CellRange.create(2, 3, 10, 3))
            .mergeRange(CellRange.create(10, 4, 10, 15))
            .mergeRange(CellRange.create(2, 1, 2, 2))
            .mergeRange(CellRange.create(2, 1, 2, 2))
            .mergeRange(CellRange.create(3, 15, 3, 20))
            .mergeRange(CellRange.create(10, 18, 15, 18));
            
        const cellRange = CellRange.create(3, 2, 3, 4);

        const range = fitRange(sheet, cellRange);
        assert.equal(range.leftTopPoint.columnNo, 2, "left");
        assert.equal(range.leftTopPoint.rowNo, 1, "top");
        assert.equal(range.rightBottomPoint.columnNo, 15, "right");
        assert.equal(range.rightBottomPoint.rowNo, 20, "bottom");

    });

});