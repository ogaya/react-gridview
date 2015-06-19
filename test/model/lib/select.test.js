'use strict';

import {pickColumnHeader, pointToGridViewItem} from "../../../src/model/lib/select";
import {pointToColumnInfo, ColumnInfo} from "../../../src/model/lib/select/scanColumn";
import {pointToRowInfo, RowInfo} from "../../../src/model/lib/select/scanRow";
import GridViewModel from "../../../src/model/gridview";
import {OBJECT_TYPE} from "../../../src/model/gridview/object-type";
import OperationModel from "../../../src/model/operation";
import {Point} from "../../../src/model/common";

var assert = require("power-assert");

// 列ヘッダーのアイテムを選択しているか判定
describe("pickColumnHeader", function() {
  it("non hit", function() {
    const columnInfo = new ColumnInfo(1, 50, 50, false);
    const rowInfo = new RowInfo(1, 18, 18, false);
    const columnHeader = pickColumnHeader(columnInfo, rowInfo);

    assert.equal(columnHeader, null);
  });

  it("columnNo=1", function() {
    const columnInfo = new ColumnInfo(1, 50, 50, false);
    const rowInfo = new RowInfo(0, 18, 18, false);
    const columnHeader = pickColumnHeader(columnInfo, rowInfo);
    assert.equal(columnHeader.target.columnNo, 1);
    assert.equal(columnHeader.target.rowNo, 0);
    assert.equal(columnHeader.rect.left, 50);
    assert.equal(columnHeader.rect.width, 50);
    assert.equal(columnHeader.rect.top, 18);
    assert.equal(columnHeader.rect.height, 18);
    assert.equal(columnHeader.objectType, OBJECT_TYPE.COLUMN_HEADER);
  });

  it("columnNo=1 resizer", function() {
    const columnInfo = new ColumnInfo(1, 50, 50, true);
    const rowInfo = new RowInfo(0, 18, 18, false);
    const columnHeader = pickColumnHeader(columnInfo, rowInfo);
    assert.equal(columnHeader.target.columnNo, 1);
    assert.equal(columnHeader.target.rowNo, 0);
    assert.equal(columnHeader.rect.left, 98);
    assert.equal(columnHeader.rect.width, 4);
    assert.equal(columnHeader.rect.top, 18);
    assert.equal(columnHeader.rect.height, 18);
    assert.equal(columnHeader.objectType, OBJECT_TYPE.COLUMN_RESIZER);
  });
});

// 行情報の検索テスト
describe("pointToRowInfo", function() {
  const viewModel = new GridViewModel();
  const opeModel = new OperationModel();

  it("rowNo=1", function() {

    const point = new Point(
      viewModel.rowHeader.width + 1,
      viewModel.columnHeader.height + 1);

    const rowInfo = pointToRowInfo(viewModel, opeModel, point);

    // 対象行番号
    assert.equal(rowInfo.rowNo, 1);
    // 上座標
    assert.equal(rowInfo.top, viewModel.columnHeader.height);
    // 高さ
    assert.equal(rowInfo.height, viewModel.rowHeader.items.get(1).height);
  });

  it("rowNo=2", function() {
    const point = new Point(
      viewModel.rowHeader.width + 1,
      viewModel.columnHeader.height + viewModel.rowHeader.items.get(1).height + 5);

    const rowInfo = pointToRowInfo(viewModel, opeModel, point);

    // 対象行番号
    assert.equal(rowInfo.rowNo, 2);
    // 上座標
    assert.equal(rowInfo.top, viewModel.columnHeader.height + viewModel.rowHeader.items.get(1).height);
    // 高さ
    assert.equal(rowInfo.height, viewModel.rowHeader.items.get(2).height);
  });
});
describe("pointToGridViewItem", function() {
  const viewModel = new GridViewModel();
  const opeModel = new OperationModel();

  it("CELL", function() {

    const point = new Point(51, 20);

    const item = pointToGridViewItem(viewModel, opeModel, point);
    // 対象列番号
    assert.equal(item.objectType, OBJECT_TYPE.CELL);
  });

});

// 列情報検索のテスト
describe("pointToColumnInfo", function() {
  const viewModel = new GridViewModel();
  const opeModel = new OperationModel();

  it("columnNo=0", function() {
    const point = new Point(
      viewModel.rowHeader.width - 1,
      viewModel.columnHeader.height + 1);

    const columnInfo = pointToColumnInfo(viewModel, opeModel, point);

    // 対象列番号
    assert.equal(columnInfo.columnNo, 0);
    // 左座標
    assert.equal(columnInfo.left, 0);
    // 幅
    assert.equal(columnInfo.width, viewModel.rowHeader.width);

    assert.equal(columnInfo.isRightBorder, false);
  });

  it("columnNo=1", function() {

    const point = new Point(
      viewModel.rowHeader.width + 1,
      viewModel.columnHeader.height + 1);

    const columnInfo = pointToColumnInfo(viewModel, opeModel, point);

    // 対象列番号
    assert.equal(columnInfo.columnNo, 1);
    // 左座標
    assert.equal(columnInfo.left, viewModel.rowHeader.width);
    // 幅
    assert.equal(columnInfo.width, viewModel.columnHeader.items.get(1).width);
  });

  it("columnNo=1 isRightBorder", function() {
    const point = new Point(
      viewModel.rowHeader.width + viewModel.columnHeader.items.get(1).width + 1,
      viewModel.columnHeader.height + 1);

    const columnInfo = pointToColumnInfo(viewModel, opeModel, point);

    // 対象列番号
    assert.equal(columnInfo.columnNo, 1);
    // 左座標
    assert.equal(columnInfo.left, viewModel.rowHeader.width);
    // 幅
    assert.equal(columnInfo.width, viewModel.columnHeader.items.get(1).width);

    assert.equal(columnInfo.isRightBorder, true);
  });

  it("columnNo=2", function() {
    const point = new Point(
      viewModel.rowHeader.width + viewModel.columnHeader.items.get(1).width + 5,
      viewModel.columnHeader.height + 1);

    const columnInfo = pointToColumnInfo(viewModel, opeModel, point);

    // 対象列番号
    assert.equal(columnInfo.columnNo, 2);
    // 左座標
    assert.equal(columnInfo.left, viewModel.rowHeader.width + viewModel.columnHeader.items.get(1).width);
    // 幅
    assert.equal(columnInfo.width, viewModel.columnHeader.items.get(2).width);
  });
});
