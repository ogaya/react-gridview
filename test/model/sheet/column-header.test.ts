"use strict";
import assert from "power-assert";

import {ColumnHeader} from "../../../src/model/sheet/column-header";
import {ColumnHeaderItem} from "../../../src/model/sheet/column-header-item";

describe("ColumnHeader", function() {
    describe("toMinJS()", function() {
        it("null", function() {
            var columnHeader = ColumnHeader.create();
            assert.equal(JSON.stringify(columnHeader.toMinJS()), JSON.stringify({}));
            assert.equal(Object.keys(columnHeader.toMinJS()).length, 0);
        });
        it("change cell 1 width", function() {
            var item = ColumnHeaderItem.create().setWidth(100);
            var columnHeader = ColumnHeader.create().setItem(1, item);
            assert.equal(JSON.stringify(columnHeader.toMinJS()), JSON.stringify({
                items: { 1: { width: 100 } }
            }));

            var loadColumnHeader = ColumnHeader.fromJS(columnHeader.toMinJS());
            assert.equal(loadColumnHeader.items.get(1).width, 100);
        });
        it("change cell 2 width", function() {
            var item = ColumnHeaderItem.create().setWidth(200);
            var columnHeader = ColumnHeader.create().setItem(2, item);
            assert.equal(JSON.stringify(columnHeader.toMinJS()), JSON.stringify({
                items: { 2: { width: 200 } }
            }));
        });

    });
    describe("Methods", function() {
        it("Item Value", function() {
            var model = new ColumnHeader();

            assert.equal(model.items.get(1).cell.value, "A");
            assert.equal(model.items.get(2).cell.value, "B");

            assert.equal(model.items.get(26).cell.value, "Z");
            assert.equal(model.items.get(27).cell.value, "AA");
        });

    });
});
