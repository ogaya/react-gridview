"use strict";
import assert from "power-assert";

import {CellRange, CellPoint, Rect} from "../../../src/model/common";
import {Operation} from "../../../src/model/operation";
import {SelectInfo} from "../../../src/model/lib/select";
import {OBJECT_TYPE} from "../../../src/model/sheet/object-type";
import {InputModel} from "../../../src/model/operation/input";

describe("Operation", function() {
    describe("objectCursor", function() {
        it("CELL", function() {
            const item = new SelectInfo(OBJECT_TYPE.CELL, null, null, null);
            const operation = Operation.create().setOpeItem(item);
            assert.equal(operation.opeCursor, "pointer");
        });
        it("COLUMN_RESIZER", function() {
            const item = new SelectInfo(OBJECT_TYPE.COLUMN_RESIZER, null, null, null);
            const operation = Operation.create().setOpeItem(item);
            assert.equal(operation.opeCursor, "col-resize");
        });
        it("ROW_RESIZER", function() {
            const item = new SelectInfo(OBJECT_TYPE.ROW_RESIZER, null, null, null);
            const operation = Operation.create().setOpeItem(item);
            assert.equal(operation.opeCursor, "row-resize");
        });
        it("COLUMN_HEADER", function() {
            const item = new SelectInfo(OBJECT_TYPE.COLUMN_HEADER, null, null, null);
            const operation = Operation.create().setOpeItem(item);
            assert.equal(operation.opeCursor, "pointer");
        });
        it("ROW_HEADER", function() {
            const item = new SelectInfo(OBJECT_TYPE.ROW_HEADER, null, null, null);
            const operation = Operation.create().setOpeItem(item);
            assert.equal(operation.opeCursor, "pointer");
        });
        it("NONE", function() {
            const item = new SelectInfo(OBJECT_TYPE.NONE, null, null, null);
            const operation = Operation.create().setOpeItem(item);
            assert.equal(operation.opeCursor, "default");
        });
        
        it("null", function() {
            const operation = Operation.create();
            assert.equal(operation.opeCursor, null);
        });
    });

    describe("rangeItems", function() {
        it("None", function() {
            const items = Operation.create().rangeItems;
            assert.equal(items.count(), 0);
        });

        it("One", function() {
            const item = CellRange.create(1, 1, 5, 5);
            const items = Operation.create()
                .setRangeItem(item)
                .rangeItems;
            assert.equal(items.count(), 1);
        });
        
        it("Reset", function() {
            const select = new SelectInfo(
                OBJECT_TYPE.CELL,
                new CellPoint(1, 1),
                null, null
            );
            const range = CellRange.create(1, 1, 5, 5);
            const operation = Operation.create()
                .setSelectItem(select)
                .setRangeItem(range)
                .resetRange();
            assert.equal(operation.rangeItem.maxColumnNo, 1);
            assert.equal(operation.rangeItem.maxRowNo, 1);
        });
    });

    describe("input", function() {
        it("Set", function() {
            const input = InputModel.create().setText("tester");
            const operation = Operation.create()
                .setInput(input);
            assert.equal(operation.input.text, "tester");
        });
    });
    describe("selectItem", function() {
        it("Set", function() {
            const item = new SelectInfo(OBJECT_TYPE.CELL, null, null, null);
            const operation = Operation.create()
                .setSelectItem(item);
            assert.equal(operation.selectItem.objectType, OBJECT_TYPE.CELL);
        });
    });

    describe("scroll", function() {
        it("Set", function() {
            const cellPoint = CellPoint.create(5, 6);
            const operation = Operation.create()
                .setScroll(cellPoint);
            assert.equal(operation.scroll.columnNo, 5);
            assert.equal(operation.scroll.rowNo, 6);
        });
        it("Edit", function() {
            const operation = Operation.create()
                .editScroll((scroll) => {
                    return scroll.setColumnNo(9).setRowNo(12);
                });
            assert.equal(operation.scroll.columnNo, 9);
            assert.equal(operation.scroll.rowNo, 12);
        });
    });
    describe("hoverItem", function() {
        it("Set", function() {
            const item = new SelectInfo(OBJECT_TYPE.ROW_RESIZER, null, null, null);
            const operation = Operation.create()
                .setHoverItem(item);
            assert.equal(operation.hoverItem.objectType, OBJECT_TYPE.ROW_RESIZER);
        });
    });

    describe("ClipRanges", function() {
        it("Push", function() {
            const range1 = CellRange.create(1, 1, 4, 4);
            const range2 = CellRange.create(5, 5, 11, 11);
            const operation = Operation.create()
                .pushClipRanges(range1)
                .pushClipRanges(range2);
            assert.equal(operation.clipRanges.count(), 2);
        });
        it("Clear", function() {
            const range1 = CellRange.create(1, 1, 4, 4);
            const range2 = CellRange.create(5, 5, 11, 11);
            const operation = Operation.create()
                .pushClipRanges(range1)
                .pushClipRanges(range2)
                .clearClipRanges();
            assert.equal(operation.clipRanges.count(), 0);
        });
    });
    describe("CanvasRect", function() {
        it("Set", function() {
            const rect = new Rect(0, 0, 100, 200);
            const operation = Operation.create()
                .setCanvasRect(rect);
            assert.equal(operation.canvasRect.width, 100);
            assert.equal(operation.canvasRect.height, 200);
        });
    });
    describe("CopyRange", function() {
        it("Set", function() {
            const range = CellRange.create(1, 1, 4, 5);
            const operation = Operation.create()
                .setCopyingRange(range);
            assert.equal(operation.copyingRange.maxColumnNo, 4);
            assert.equal(operation.copyingRange.maxRowNo, 5);
        });
    });
    describe("HoverCursor", function() {
        it("none", function() {
            const operation = Operation.create();
            assert.equal(operation.hoverCursor, "default");
        });
        it("HasOpeItem", function() {
            const opeItem = new SelectInfo(OBJECT_TYPE.CELL, null, null, null);
            const hoverItem = new SelectInfo(OBJECT_TYPE.COLUMN_RESIZER, null, null, null);
            
            const operation = Operation.create()
                .setOpeItem(opeItem)
                .setHoverItem(hoverItem);
            assert.equal(operation.hoverCursor, "pointer");
        });
        it("nonOpeItem", function() {
            const hoverItem = new SelectInfo(OBJECT_TYPE.COLUMN_RESIZER, null, null, null);
            const operation = Operation.create()
                .setHoverItem(hoverItem);
            assert.equal(operation.hoverCursor, "col-resize");
        });
    });
});
