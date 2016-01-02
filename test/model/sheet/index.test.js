"use strict";

var Sheet = require("../../../dist/model/sheet").default;
var Cell = require("../../../dist/model/sheet/cell").default;
var Border = require("../../../dist/model/sheet/border").default;
var CellPoint = require("../../../dist/model/common").CellPoint;
var BORDER_POSITION = require("../../../dist/model/common").BORDER_POSITION;

var assert = require("power-assert");

describe("Sheet", function() {
  describe("toMinJS()", function() {
    it("null", function() {
      var sheet = Sheet.create();
      assert.equal(JSON.stringify(sheet.toMinJS()), JSON.stringify({}));
      assert.equal(Object.keys(sheet.toMinJS()).length, 0);
    });
  });
  
  describe("toJS()", function(){
      it("null", function(){
          var json = Sheet.create()
            .editColumnHeader(function(columnHeader){
                return columnHeader.setColumnCount(10)
            })
            .editRowHeader(function(rowHeader){
                return rowHeader.setRowCount(10)
            })
            .toJS();
          assert.equal(Object.keys(json).length > 0, true);
          assert.equal(json.cells["A1"].text, "");
      });
  });
  describe("fromJS()", function(){
    it("null", function(){
      var sheet = Sheet.fromJS({});
      assert.equal(sheet.columnHeader.columnCount, 702);
    });

    it("cell", function(){
      var cell = Cell.create();
      var sheet = Sheet.create()
        .setCell(1, 1, cell.setText("abcd"))
        .setCell(1, 2, cell.setText(1));
      var json = sheet.toMinJS();
      var sheetCnv = Sheet.fromJS(json);
      assert.equal(sheetCnv.getCell(1, 1).text, "abcd");
      assert.equal(sheetCnv.getCell(1, 2).text, 1);
    });
    
    it("borders", function(){
        var sheet = Sheet.create()
            .setBorder(new CellPoint(1, 1), BORDER_POSITION.TOP, Border.create().setWeight(2));
        
        var json = sheet.toMinJS();
        var sheetCnv = Sheet.fromJS(json);
        assert.equal(sheetCnv.getBorder(new CellPoint(1, 1), BORDER_POSITION.TOP).weight, 2);
    });

  });
});
