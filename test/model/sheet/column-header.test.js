"use strict";

var ColumnHeader = require("../../../dist/model/sheet/column-header").default;
var ColumnHeaderItem = require("../../../dist/model/sheet/column-header-item").default;

var assert = require("power-assert");

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
        items: {1: {width: 100}}
      }));

      var loadColumnHeader = ColumnHeader.fromJS(columnHeader.toMinJS());
      assert.equal(loadColumnHeader.items.get(1).width, 100);
    });
    it("change cell 2 width", function() {
      var item = ColumnHeaderItem.create().setWidth(200);
      var columnHeader = ColumnHeader.create().setItem(2, item);
      assert.equal(JSON.stringify(columnHeader.toMinJS()), JSON.stringify({
        items: {2: {width: 200}}
      }));
    });

  });
});
