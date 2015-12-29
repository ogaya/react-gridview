'use strict';

var calc = require("../../dist/calc").calc;
var GridViewModel = require("../../dist/model/sheet").default;
var CellPoint = require("../../dist/model/common").CellPoint;

//import ColumnHeaderItem from "../../src/model/sheet/column-header-item";
var assert = require("power-assert");

describe("calc", function() {
  describe("expr", function() {
    it("X", function() {

      assert.equal(calc("=1").value, 1);
      assert.equal(calc("=25").value, 25);
      assert.equal(calc("=459").value, 459);
    });
    it("X+Y", function() {

      assert.equal(calc("=1+1").value, 2);
      assert.equal(calc("=2+5").value, 7);
      assert.equal(calc("=12+59").value, 71);
    });

    it("X+Y+Z", function() {

      assert.equal(calc("=2+5+3").value, 10);
    });

    it("X-Y", function() {

      assert.equal(calc("=1-1").value, 0);
      assert.equal(calc("=2-5").value, -3);
      assert.equal(calc("=12-4").value, 8);
    });

    it("X-Y-Z", function() {
      assert.equal(calc("=15-5-3").value, 7);
    });

    it("X-Y+Z", function() {
      assert.equal(calc("=15-5+3").value, 13);
    });

  });

  describe("term", function() {
    it("X*Y", function() {
      assert.equal(calc("=5*3").value, 15);
      assert.equal(calc("=1.5*2").value, 3);
      assert.equal(calc("=15*10").value, 150);
    });

    it("X*Y*Z", function() {
      assert.equal(calc("=2*3*4").value, 24);
    });

    it("X/Y", function() {
      assert.equal(calc("=24/2").value, 12);
      assert.equal(calc("=2/4").value, 0.5);
    });

    it("X*Y/Z", function() {
      assert.equal(calc("=4.5*2/10").value, 0.9);
      assert.equal(calc("=2/4*10").value, 5);
    });

  });

  describe("id", function() {
    it("mix", function() {
      var model = new GridViewModel();
      model = model
        .setValue(new CellPoint(1, 1), 5)
        .setValue(new CellPoint(1, 2), 4)
        .setValue(new CellPoint(2, 1), 10);

      assert.equal(calc("=A1+A2", model).value, 9);
      assert.equal(calc("=A1+A2+B1", model).value, 19);
      assert.equal(calc("=(A1-A2)/B1", model).value, 0.1);
    });

    it("ref", function() {
      var model = new GridViewModel();
      model = model
        .setValue(new CellPoint(1, 1), 5)
        .setValue(new CellPoint(1, 2), 4)
        .setValue(new CellPoint(2, 1), 10);

      var refs = calc("=A1+A2*B2", model).refs;

      assert.equal(refs.count(), 3);
      assert.equal(refs.includes("A1"), true);
      assert.equal(refs.includes("B2"), true);
      assert.equal(refs.includes("B1"), false);
    });
  });

  describe("func", function() {
    it("SUM", function() {
      assert.equal(calc("=SUM(1,5)").value, 6);
      assert.equal(calc("=SUM(24,5,4+1)").value, 34);
      assert.equal(calc("=SUM(1,2,3,4)*5").value, 50);
    });

    it("AVG", function() {
      assert.equal(calc("=AVG(1,5)").value, 3);
      assert.equal(calc("=AVG(20,5,4+1)").value, 10);
      assert.equal(calc("=AVG(2,2,3,3)*2").value, 5);
    });

    it("mix", function() {
      var model = new GridViewModel();
      model = model
        .setValue(new CellPoint(1, 1), 5)
        .setValue(new CellPoint(1, 2), 4)
        .setValue(new CellPoint(1, 3), 9)
        .setValue(new CellPoint(2, 2), 1)
        .setValue(new CellPoint(2, 1), 20)
        .setValue(new CellPoint(3, 1), 40);

      assert.equal(calc("=SUM(A1,A2)", model).value, 9);
      assert.equal(calc("=SUM(A1:A3)", model).value, 18);
      assert.equal(calc("=SUM(A1:C1)", model).value, 65);
      assert.equal(calc("=SUM(A1:B2)", model).value, 30);

      assert.equal(calc("=AVG(A1:A3)", model).value, 6);
    });

    it("ref", function() {
      var model = new GridViewModel();
      model = model
        .setValue(new CellPoint(1, 1), 5)
        .setValue(new CellPoint(1, 2), 4)
        .setValue(new CellPoint(1, 3), 9)
        .setValue(new CellPoint(2, 2), 1)
        .setValue(new CellPoint(2, 1), 20)
        .setValue(new CellPoint(3, 1), 40);

      var refs = calc("=SUM(A1,A3)", model).refs;
      var refsRange = calc("=SUM(A1:A3)", model).refs;

      assert.equal(refs.count(), 2);
      assert.equal(refs.includes("A1"), true);
      assert.equal(refs.includes("A2"), false);
      assert.equal(refs.includes("A3"), true);

      assert.equal(refsRange.count(), 3);
      assert.equal(refsRange.includes("A1"), true);
      assert.equal(refsRange.includes("A2"), true);
      assert.equal(refsRange.includes("A3"), true);
      assert.equal(refsRange.includes("B1"), false);
    });
  });

  describe("factor", function() {
    it("(...)", function() {
      assert.equal(calc("=(5+4)").value, 9);
      assert.equal(calc("=(5+4)*2").value, 18);
      assert.equal(calc("=5+4*2").value, 13);
    });
  });
});
