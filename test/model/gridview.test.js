import GridViewModel from "../../src/model/gridview";

var assert = require("assert");

describe("GridViewModel", function(){
  describe("Methods", function(){
    it("getColumnNo", function(){
      const model = new GridViewModel();
      assert.equal(model.getColumnNo(0), 0);
      //assert.equal(2, 1);
      //assert.equal(3, 4);
    });
  });
});
