'use strict';

import ColumnHeaderModel from "../../src/model/gridview/column-header";
//import ColumnHeaderItem from "../../src/model/gridview/column-header-item";
var assert = require("power-assert");

describe("ColumnHeaderModel", function() {
  describe("Methods", function() {
    it("Item Value", function() {
      const model = new ColumnHeaderModel();

      assert.equal(model.items.get(1).cell.value, "A");
      assert.equal(model.items.get(2).cell.value, "B");

      assert.equal(model.items.get(26).cell.value, "Z");
      assert.equal(model.items.get(27).cell.value, "AA");
    });

  });
});
