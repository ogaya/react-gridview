"use strict";
import assert from "power-assert";
import ColumnHeaderModel from "../../src/model/sheet/column-header";


describe("ColumnHeaderModel", function() {
    describe("Methods", function() {
        it("Item Value", function() {
            var model = new ColumnHeaderModel();

            assert.equal(model.items.get(1).cell.value, "A");
            assert.equal(model.items.get(2).cell.value, "B");

            assert.equal(model.items.get(26).cell.value, "Z");
            assert.equal(model.items.get(27).cell.value, "AA");
        });

    });
});
