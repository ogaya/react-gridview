"use strict";

import assert from "power-assert";

import {targetToRect, cellRangeToRect} from "../../../src/model/lib/target_to_rect";
import GridViewModel from "../../../src/model/sheet";
import {CellPoint, CellRange} from "../../../src/model/common";


describe("Cell Lib", function() {
    describe("targetToLeft", function() {
        it("cell(1,1)", function() {
            const viewModel = new GridViewModel();
            const target = new CellPoint(1, 1);
            const rect = targetToRect(viewModel, target, null);
            const left = viewModel.rowHeader.width;
            const top = viewModel.columnHeader.height;
            const width = viewModel.columnHeader.items.get(1).width;
            const height = viewModel.rowHeader.items.get(1).height;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);
        });

        it("cell(2,1)", function() {
            const viewModel = new GridViewModel();
            const target = new CellPoint(2, 1);
            const rect = targetToRect(viewModel, target, null);
            const left = viewModel.rowHeader.width + viewModel.columnHeader.items.get(1).width;
            const top = viewModel.columnHeader.height;
            const width = viewModel.columnHeader.items.get(2).width;
            const height = viewModel.rowHeader.items.get(1).height;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);

        });

        it("cell(1,2)", function() {
            const viewModel = new GridViewModel();
            const target = new CellPoint(1, 2);
            const rect = targetToRect(viewModel, target, null);
            const left = viewModel.rowHeader.width;
            const top = viewModel.columnHeader.height + viewModel.rowHeader.items.get(1).height;
            const width = viewModel.columnHeader.items.get(1).width;
            const height = viewModel.rowHeader.items.get(2).height;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);

        });

        it("null", function() {
            const viewModel = new GridViewModel();
            const rect = targetToRect(viewModel, null, null);

            assert.equal(rect.left, 0);
            assert.equal(rect.top, 0);
            assert.equal(rect.width, 0);
            assert.equal(rect.height, 0);
        });
        it("cell(0,0)", function() {
            const viewModel = new GridViewModel();
            const rect = targetToRect(viewModel, new CellPoint(0, 0), null);

            assert.equal(rect.left, 0);
            assert.equal(rect.top, 0);
            assert.equal(rect.width, 0);
            assert.equal(rect.height, 0);
        });
        it("cell(-1,1)", function() {
            const viewModel = new GridViewModel();
            const rect = targetToRect(viewModel, new CellPoint(-1, 1), null);

            assert.equal(rect.left, 0);
            assert.equal(rect.top, 0);
            assert.equal(rect.width, 0);
            assert.equal(rect.height, 0);
        });

        it("cell(1,-1)", function() {
            const viewModel = new GridViewModel();
            const rect = targetToRect(viewModel, new CellPoint(1, -1), null);

            assert.equal(rect.left, 0);
            assert.equal(rect.top, 0);
            assert.equal(rect.width, 0);
            assert.equal(rect.height, 0);
        });

        it("scroll(0,0)", function() {
            const viewModel = new GridViewModel();
            const rect = targetToRect(viewModel, new CellPoint(1, 1), new CellPoint(0, 0));
            const left = viewModel.rowHeader.width;
            const top = viewModel.columnHeader.height;
            const width = viewModel.columnHeader.items.get(1).width;
            const height = viewModel.rowHeader.items.get(1).height;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);
        });
    });

    describe("cellRangeToRect", function() {
        it("null", function() {
            const viewModel = new GridViewModel();
            const rect = cellRangeToRect(viewModel, null, null);

            assert.equal(rect.left, 0);
            assert.equal(rect.top, 0);
            assert.equal(rect.width, 0);
            assert.equal(rect.height, 0);
        });
        it("cell(0,0) cell(0,0)", function() {
            const viewModel = new GridViewModel();
            const target = CellRange.create(0, 0, 0, 0);
            const rect = cellRangeToRect(viewModel, target, null);

            assert.equal(rect.left, 0);
            assert.equal(rect.top, 0);
            assert.equal(rect.width, 0);
            assert.equal(rect.height, 0);
        });

        it("cell(1,1) cell(2,2)", function() {
            const viewModel = new GridViewModel();
            const target = CellRange.create(1, 1, 2, 2);
            const rect = cellRangeToRect(viewModel, target, null);
            const left = viewModel.rowHeader.width;
            const top = viewModel.columnHeader.height;
            const width = viewModel.columnHeader.items.get(1).width * 2;
            const height = viewModel.rowHeader.items.get(1).height * 2;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);
        });

        it("scroll(0,0)", function() {
            const viewModel = new GridViewModel();
            const target = CellRange.create(1, 1, 2, 2);
            const rect = cellRangeToRect(viewModel, target, new CellPoint(0, 0));
            const left = viewModel.rowHeader.width;
            const top = viewModel.columnHeader.height;
            const width = viewModel.columnHeader.items.get(1).width * 2;
            const height = viewModel.rowHeader.items.get(1).height * 2;

            assert.equal(rect.left, left);
            assert.equal(rect.top, top);
            assert.equal(rect.width, width);
            assert.equal(rect.height, height);
        });
    });

});
