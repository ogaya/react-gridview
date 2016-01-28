"use strict";

import assert from "power-assert";

import {targetToRect} from "../../../src/model/lib/target_to_rect";
import GridViewModel from "../../../src/model/sheet";
import {CellPoint} from "../../../src/model/common";


describe("Cell Lib", function() {
    describe("targetToLeft", function() {
        it("cell(1,1)", function() {
            var viewModel = new GridViewModel();
            var target = new CellPoint(1, 1);
            var rect = targetToRect(viewModel, target, null);
            var left = viewModel.rowHeader.width;
            var top = viewModel.columnHeader.height;
            var width = viewModel.columnHeader.items.get(1).width;
            var height = viewModel.rowHeader.items.get(1).height;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);
        });

        it("cell(2,1)", function() {
            var viewModel = new GridViewModel();
            var target = new CellPoint(2, 1);
            var rect = targetToRect(viewModel, target, null);
            var left = viewModel.rowHeader.width + viewModel.columnHeader.items.get(1).width;
            var top = viewModel.columnHeader.height;
            var width = viewModel.columnHeader.items.get(2).width;
            var height = viewModel.rowHeader.items.get(1).height;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);

        });

        it("cell(1,2)", function() {
            var viewModel = new GridViewModel();
            var target = new CellPoint(1, 2);
            var rect = targetToRect(viewModel, target, null);
            var left = viewModel.rowHeader.width;
            var top = viewModel.columnHeader.height + viewModel.rowHeader.items.get(1).height;
            var width = viewModel.columnHeader.items.get(1).width;
            var height = viewModel.rowHeader.items.get(2).height;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);

        });
    });
});
