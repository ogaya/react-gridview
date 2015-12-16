"use strict";

import ColumnHeader from "../../../src/model/sheet/column-header";
import ColumnHeaderItem from "../../../src/model/sheet/column-header-item";

var assert = require("power-assert");

describe("ColumnHeader", function() {
  describe("toMinJS()", function() {
    it("null", function() {
      const columnHeader = ColumnHeader.create();
      assert.equal(JSON.stringify(columnHeader.toMinJS()), JSON.stringify({}));
      assert.equal(Object.keys(columnHeader.toMinJS()).length, 0);
    });
    it("change cell 1 width", function() {
      const item = ColumnHeaderItem.create().setWidth(100);
      const columnHeader = ColumnHeader.create().setItem(1, item);
      assert.equal(JSON.stringify(columnHeader.toMinJS()), JSON.stringify({
        items: {1: {width: 100}}
      }));

      const loadColumnHeader = ColumnHeader.fromJS(columnHeader.toMinJS());
      assert.equal(loadColumnHeader.items.get(1).width, 100);
    });
    it("change cell 2 width", function() {
      const item = ColumnHeaderItem.create().setWidth(200);
      const columnHeader = ColumnHeader.create().setItem(2, item);
      assert.equal(JSON.stringify(columnHeader.toMinJS()), JSON.stringify({
        items: {2: {width: 200}}
      }));
    });

  });
});
