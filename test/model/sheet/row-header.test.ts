"use strict";
import assert from "power-assert";

import {RowHeader} from "../../../src/model/sheet/row-header";
import {RowHeaderItem} from "../../../src/model/sheet/row-header-item";

describe("RowHeader", function() {
    describe("toMinJS()", function() {
        it("null", function() {
            var rowHeader = RowHeader.create();
            assert.equal(JSON.stringify(rowHeader.toMinJS()), JSON.stringify({}));
            assert.equal(Object.keys(rowHeader.toMinJS()).length, 0);
        });
        it("change cell 1 width", function() {
            var item = RowHeaderItem.create().setHeight(100);
            var rowHeader = RowHeader.create().setItem(1, item);
            assert.equal(JSON.stringify(rowHeader.toMinJS()), JSON.stringify({
                items: { 1: { height: 100 } }
            }));

            var loadRowHeader = RowHeader.fromJS(rowHeader.toMinJS());

            assert.equal(loadRowHeader.items.get(1).height, 100);
        });
        it("change cell 2 width", function() {
            var item = RowHeaderItem.create().setHeight(200);
            var rowHeader = RowHeader.create().setItem(2, item);
            assert.equal(JSON.stringify(rowHeader.toMinJS()), JSON.stringify({
                items: { 2: { height: 200 } }
            }));
        });

    });
    describe("Methods", function() {
        it("Item Value", function() {
            var model = new RowHeader();

            assert.equal(model.items.get(1).cell.value, "1");
            assert.equal(model.items.get(2).cell.value, "2");

            assert.equal(model.items.get(26).cell.value, "26");
            assert.equal(model.items.get(27).cell.value, "27");
        });

    });
});
