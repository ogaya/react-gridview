"use strict";

import assert from "power-assert";

import Cell from "../../../src/model/sheet/cell";
import {CellRange} from "../../../src/model/common";
import {CellPoint} from "../../../src/model/common";


describe("Cell", function () {
    describe("toMinJS()", function () {
        it("null", function () {
            var cell = Cell.create();
            assert.equal(JSON.stringify(cell.toMinJS()), JSON.stringify({}));
            assert.equal(Object.keys(cell.toMinJS()).length, 0);
        });

        it("change text", function () {
            var cell = Cell.create().setText("1");
            assert.equal(JSON.stringify(cell.toMinJS()), JSON.stringify({ "text": "1" }));
            assert.equal(Object.keys(cell.toMinJS()).length, 1);
        });
    });

    describe("fromJS()", function () {
        it("null", function () {
            var cell = Cell.fromJS(null);
            assert.equal(cell.text, "");
        });

        it("{}", function () {
            var cell = Cell.fromJS({});
            assert.equal(cell.text, "");
        });

        it("text", function () {
            var cell = Cell.fromJS({ text: "4" });
            assert.equal(cell.text, "4");
        });

        it("merge", function () {
            var range = CellRange.create(
                new CellPoint(1, 2),
                new CellPoint(3, 4)
            );
            var json = Cell.create().setMergeRange(range).toJS();
            var cell = Cell.fromJS(json);
            assert.equal(range.equals(cell.mergeRange), true);
        });

    });
});
