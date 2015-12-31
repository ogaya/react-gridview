"use strict";

var pickColumnHeader = require("../../../dist/model/lib/select").pickColumnHeader;
var pointToGridViewItem = require("../../../dist/model/lib/select").pointToGridViewItem;

var clientPointToColumnInfo = require("../../../dist/model/lib/select/scanColumn").clientPointToColumnInfo;
var ColumnInfo = require("../../../dist/model/lib/select/scanColumn").ColumnInfo;

var clientPointToRowInfo = require("../../../dist/model/lib/select/scanRow").clientPointToRowInfo;
var RowInfo = require("../../../dist/model/lib/select/scanRow").RowInfo;

var GridViewModel = require("../../../dist/model/sheet").default;
var OBJECT_TYPE = require("../../../dist/model/sheet/object-type").OBJECT_TYPE;
var OperationModel = require("../../../dist/model/operation").default;
var Point = require("../../../dist/model/common").Point;

var assert = require("power-assert");

// 列ヘッダーのアイテムを選択しているか判定
describe("pickColumnHeader", function() {
  it("non hit", function() {
    var columnInfo = new ColumnInfo(1, 50, 50, false);
    var rowInfo = new RowInfo(1, 18, 18, false);
    var columnHeader = pickColumnHeader(columnInfo, rowInfo);

    assert.equal(columnHeader, null);
  });

  it("columnNo=1", function() {
    var columnInfo = new ColumnInfo(1, 50, 50, false);
    var rowInfo = new RowInfo(0, 18, 18, false);
    var columnHeader = pickColumnHeader(columnInfo, rowInfo);
    assert.equal(columnHeader.cellPoint.columnNo, 1);
    assert.equal(columnHeader.cellPoint.rowNo, 0);
    assert.equal(columnHeader.rect.left, 50);
    assert.equal(columnHeader.rect.width, 50);
    assert.equal(columnHeader.rect.top, 18);
    assert.equal(columnHeader.rect.height, 18);
    assert.equal(columnHeader.objectType, OBJECT_TYPE.COLUMN_HEADER);
  });

  it("columnNo=1 resizer", function() {
    var columnInfo = new ColumnInfo(1, 50, 50, true);
    var rowInfo = new RowInfo(0, 18, 18, false);
    var columnHeader = pickColumnHeader(columnInfo, rowInfo);
    assert.equal(columnHeader.cellPoint.columnNo, 1);
    assert.equal(columnHeader.cellPoint.rowNo, 0);
    assert.equal(columnHeader.rect.left, 50);
    assert.equal(columnHeader.rect.width, 50);
    assert.equal(columnHeader.rect.top, 18);
    assert.equal(columnHeader.rect.height, 18);
    assert.equal(columnHeader.objectType, OBJECT_TYPE.COLUMN_RESIZER);
  });
});

// 行情報の検索テスト
describe("pointToRowInfo", function() {
  var viewModel = new GridViewModel();
  var opeModel = new OperationModel();

  it("rowNo=1", function() {

    var point = new Point(
      viewModel.rowHeader.width + 1,
      viewModel.columnHeader.height + 1);

    var rowInfo = clientPointToRowInfo(viewModel, opeModel, point);

    // 対象行番号
    assert.equal(rowInfo.rowNo, 1);
    // 上座標
    assert.equal(rowInfo.top, viewModel.columnHeader.height);
    // 高さ
    assert.equal(rowInfo.height, viewModel.rowHeader.items.get(1).height);
  });

  it("rowNo=2", function() {
    var point = new Point(
      viewModel.rowHeader.width + 1,
      viewModel.columnHeader.height + viewModel.rowHeader.items.get(1).height + 5);

    var rowInfo = clientPointToRowInfo(viewModel, opeModel, point);

    // 対象行番号
    assert.equal(rowInfo.rowNo, 2);
    // 上座標
    assert.equal(rowInfo.top, viewModel.columnHeader.height + viewModel.rowHeader.items.get(1).height);
    // 高さ
    assert.equal(rowInfo.height, viewModel.rowHeader.items.get(2).height);
  });
});
describe("pointToGridViewItem", function() {
  var viewModel = new GridViewModel();
  var opeModel = new OperationModel();

  it("CELL", function() {

    var point = new Point(51, 20);

    var item = pointToGridViewItem(viewModel, opeModel, point);
    // 対象列番号
    assert.equal(item.objectType, OBJECT_TYPE.CELL);
  });

});

// 列情報検索のテスト
describe("clientPointToColumnInfo", function() {
  var viewModel = new GridViewModel();
  var opeModel = new OperationModel();

  it("columnNo=0", function() {
    var point = new Point(
      viewModel.rowHeader.width - 1,
      viewModel.columnHeader.height + 1);

    var columnInfo = clientPointToColumnInfo(viewModel, opeModel, point);

    // 対象列番号
    assert.equal(columnInfo.columnNo, 0);
    // 左座標
    assert.equal(columnInfo.left, 0);
    // 幅
    assert.equal(columnInfo.width, viewModel.rowHeader.width);

    assert.equal(columnInfo.isRightBorder, false);
  });

  it("columnNo=1", function() {

    var point = new Point(
      viewModel.rowHeader.width + 1,
      viewModel.columnHeader.height + 1);

    var columnInfo = clientPointToColumnInfo(viewModel, opeModel, point);

    // 対象列番号
    assert.equal(columnInfo.columnNo, 1);
    // 左座標
    assert.equal(columnInfo.left, viewModel.rowHeader.width);
    // 幅
    assert.equal(columnInfo.width, viewModel.columnHeader.items.get(1).width);
  });

  it("columnNo=1 isRightBorder", function() {
    var point = new Point(
      viewModel.rowHeader.width + viewModel.columnHeader.items.get(1).width + 1,
      viewModel.columnHeader.height + 1);

    var columnInfo = clientPointToColumnInfo(viewModel, opeModel, point);

    // 対象列番号
    assert.equal(columnInfo.columnNo, 1);
    // 左座標
    assert.equal(columnInfo.left, viewModel.rowHeader.width);
    // 幅
    assert.equal(columnInfo.width, viewModel.columnHeader.items.get(1).width);

    assert.equal(columnInfo.isRightBorder, true);
  });

  it("columnNo=2", function() {
    var point = new Point(
      viewModel.rowHeader.width + viewModel.columnHeader.items.get(1).width + 5,
      viewModel.columnHeader.height + 1);

    var columnInfo = clientPointToColumnInfo(viewModel, opeModel, point);

    // 対象列番号
    assert.equal(columnInfo.columnNo, 2);
    // 左座標
    assert.equal(columnInfo.left, viewModel.rowHeader.width + viewModel.columnHeader.items.get(1).width);
    // 幅
    assert.equal(columnInfo.width, viewModel.columnHeader.items.get(2).width);
  });
});
