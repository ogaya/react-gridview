"use strict";

import Cell from "../../../src/model/sheet/cell";
var assert = require("power-assert");

describe("Cell", function() {
  describe("toMinJS()", function() {
    it("null", function() {
      const cell = Cell.create();
      assert.equal(JSON.stringify(cell.toMinJS()), JSON.stringify({}));
      assert.equal(Object.keys(cell.toMinJS()).length, 0);
    });

    it("change text", function(){
      const cell = Cell.create().setText("1");
      assert.equal(JSON.stringify(cell.toMinJS()), JSON.stringify({"text": "1"}));
      assert.equal(Object.keys(cell.toMinJS()).length, 1);
    });
  });

  describe("fromJS()", function() {
    it("null", function() {
      const cell = Cell.fromJS(null);
      assert.equal(cell.text, "");
    });

    it("{}", function() {
      const cell = Cell.fromJS({});
      assert.equal(cell.text, "");
    });

    it("text", function() {
      const cell = Cell.fromJS({text: "4"});
      assert.equal(cell.text, "4");
    });

  });
});
