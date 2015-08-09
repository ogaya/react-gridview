'use strict';

import {CellPoint} from "../../src/model/common";
import GridViewModel from "../../src/model/gridview";
import ColumnHeaderItem from "../../src/model/gridview/column-header-item";
var assert = require("power-assert");

// Viewモデルのテスト
describe("GridViewModel", function() {
  describe("Methods", function() {


    it("setValue", function() {
      const model = new GridViewModel();
      const target11 = new CellPoint(1, 1);
      const target12 = new CellPoint(1, 2);
      const target21 = new CellPoint(2, 1);
      const testModel = model
        .setValue(target11, "11")
        .setValue(target12, "12");

      assert.equal(testModel.getCell(target11).value, "11");
      assert.equal(testModel.getCell(target12).value, "12");
      assert.equal(testModel.getCell(target21).value, "");
    });

    // 座標からセル位置を算出するテスト
    it("pointToTarget", function() {
      const model = new GridViewModel();

      const target1 = model.pointToTarget(50, 20);
      assert.equal(target1.columnNo, 1);
      assert.equal(target1.rowNo, 1);

      const target2 = model.pointToTarget(100, 20);

      assert.equal(target2.columnNo, 2);
      assert.equal(target2.rowNo, 1);

    });

    // 座標から列位置を算出するテスト
    it("pointToColumnNo", function() {
      const model = new GridViewModel();
      const chItem = new ColumnHeaderItem();

      const columnHeader = model.columnHeader
        .setMaxCount(3)
        .setItem(1, chItem.setWidth(20))
        .setItem(2, chItem.setWidth(10))
        .setItem(3, chItem.setWidth(30));

      const rowHeader = model.rowHeader.setWidth(10);
      const testModel = model
        .setColumnHeader(columnHeader)
        .setRowHeader(rowHeader);

      // ヘッダ
      assert.equal(testModel.pointToColumnNo(0), 0);
      assert.equal(testModel.pointToColumnNo(49), 0);

      // 1列目
      assert.equal(testModel.pointToColumnNo(50), 1);
      assert.equal(testModel.pointToColumnNo(69), 1);

      // 2列目
      assert.equal(testModel.pointToColumnNo(70), 2);
      assert.equal(testModel.pointToColumnNo(79), 2);

      // 3列目
      assert.equal(testModel.pointToColumnNo(80), 3);
      assert.equal(testModel.pointToColumnNo(109), 3);

      // エラー
      assert.equal(testModel.pointToColumnNo(110), 0);
      assert.equal(testModel.pointToColumnNo(1000), 0);
    });

  });
});
