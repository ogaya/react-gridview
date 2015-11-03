'use strict';

import {targetToRect} from "../../../src/model/lib/target_to_rect";
import GridViewModel  from "../../../src/model/sheet";
import {CellPoint}       from "../../../src/model/common";

//import ColumnHeaderItem from "../../src/model/sheet/column-header-item";
var assert = require("power-assert");

describe("Cell Lib", function() {
  describe("targetToLeft", function() {
    it("cell(1,1)", function() {
      const viewModel = new GridViewModel();
      const target = new CellPoint(1, 1);
      const rect = targetToRect(viewModel, target);
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
      const rect = targetToRect(viewModel, target);
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
      const rect = targetToRect(viewModel, target);
      const left = viewModel.rowHeader.width;
      const top = viewModel.columnHeader.height + viewModel.rowHeader.items.get(1).height;
      const width = viewModel.columnHeader.items.get(1).width;
      const height = viewModel.rowHeader.items.get(2).height;

      assert.equal(rect.left, left);
      assert.equal(rect.top, top);
      assert.equal(rect.width, width);
      assert.equal(rect.height, height);

    });
  });
});
