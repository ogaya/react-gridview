"use strict";

import Sheet from "../../../src/model/sheet";
import Cell from "../../../src/model/sheet/cell";

var assert = require("power-assert");

describe("Sheet", function() {
  describe("toJS()", function() {
    it("null", function() {
      const sheet = Sheet.create();
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
      const sheet = Sheet.fromJS({});
      assert.equal(sheet.columnHeader.maxCount, 702);
    });

    it("cell", function(){
      const cell = Cell.create();
      const sheet = Sheet.create()
        .setCell(1, 1, cell.setText("abcd"))
        .setCell(1, 2, cell.setText(1));
      const json = sheet.toJS();
      const sheetCnv = Sheet.fromJS(json);
      assert.equal(sheetCnv.getCell(1, 1).text, "abcd");
      assert.equal(sheetCnv.getCell(1, 2).text, 1);
    });

  });
});
