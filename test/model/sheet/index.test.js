"use strict";

var Sheet = require("../../../dist/model/sheet").default;
var Cell = require("../../../dist/model/sheet/cell").default;

var assert = require("power-assert");

describe("Sheet", function() {
  describe("toJS()", function() {
    it("null", function() {
      var sheet = Sheet.create();
      assert.equal(JSON.stringify(sheet.toJS()), JSON.stringify({
        columnHeader: {},
        rowHeader: {},
        cells: {},
        borders: {}
      }));
      assert.equal(Object.keys(sheet.toJS()).length, 4);
    });
  });
  describe("fromJS()", function(){
    it("null", function(){
      var sheet = Sheet.fromJS({});
      assert.equal(sheet.columnHeader.maxCount, 702);
    });

    it("cell", function(){
      var cell = Cell.create();
      var sheet = Sheet.create()
        .setCell(1, 1, cell.setText("abcd"))
        .setCell(1, 2, cell.setText(1));
      var json = sheet.toJS();
      var sheetCnv = Sheet.fromJS(json);
      assert.equal(sheetCnv.getCell(1, 1).text, "abcd");
      assert.equal(sheetCnv.getCell(1, 2).text, 1);
    });

  });
});
