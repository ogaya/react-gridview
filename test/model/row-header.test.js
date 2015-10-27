'use strict';

import RowHeaderModel from "../../src/model/gridview/row-header";
//import ColumnHeaderItem from "../../src/model/gridview/column-header-item";
var assert = require("power-assert");

describe("RowHeaderModel", function() {
  describe("Methods", function() {
    it("Item Value", function() {
      const model = new RowHeaderModel();

      assert.equal(model.items.get(1).cell.value, "1");
      assert.equal(model.items.get(2).cell.value, "2");

      assert.equal(model.items.get(26).cell.value, "26");
      assert.equal(model.items.get(27).cell.value, "27");
    });

  });
});
