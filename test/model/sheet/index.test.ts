"use strict";
import assert from "power-assert";

import {Sheet} from "../../../src/model/sheet";
import {Cell} from "../../../src/model/sheet/cell";
import {Border} from "../../../src/model/sheet/border";
import {CellPoint} from "../../../src/model/common";
import {CellRange} from "../../../src/model/common";
import {BORDER_POSITION} from "../../../src/model/common";
import {ColumnHeaderItem} from "../../../src/model/sheet/column-header-item";
import {FreezePane} from "../../../src/model/common";

import {DEFAULT_HEIGHT} from "../../../src/model/sheet/row-header-item";
import {DEFAULT_WIDTH} from "../../../src/model/sheet/column-header-item";

describe("Sheet", function() {
    describe("toMinJS()", function() {
        it("null", function() {
            var sheet = Sheet.create();
            assert.equal(JSON.stringify(sheet.toMinJS()), JSON.stringify({}));
            assert.equal(Object.keys(sheet.toMinJS()).length, 0);
        });
    });

    describe("toJS()", function() {
        it("null", function() {
            var json = Sheet.create()
                .editColumnHeader(function(columnHeader) {
                    return columnHeader.setColumnCount(10)
                })
                .editRowHeader(function(rowHeader) {
                    return rowHeader.setRowCount(10)
                })
                .toJS();
            assert.equal(Object.keys(json).length > 0, true);
            assert.equal(json.cells["A1"].text, "");
        });
    });
    describe("fromJS()", function() {
        it("null", function() {
            var sheet = Sheet.fromJS({});
            assert.equal(sheet.columnHeader.columnCount, 702);
        });

        it("cell", function() {
            var cell = Cell.create();
            var sheet = Sheet.create()
                .setCell(1, 1, cell.setText("abcd"))
                .setCell(1, 2, cell.setText(1));
            var json = sheet.toMinJS();
            var sheetCnv = Sheet.fromJS(json);
            assert.equal(sheetCnv.getCell(1, 1).text, "abcd");
            assert.equal(sheetCnv.getCell(1, 2).text, 1);
        });

        it("borders", function() {
            var sheet = Sheet.create()
                .setBorder(new CellPoint(1, 1), BORDER_POSITION.TOP, Border.create().setWeight(2));

            var json = sheet.toMinJS();
            var sheetCnv = Sheet.fromJS(json);
            assert.equal(sheetCnv.getBorder(new CellPoint(1, 1), BORDER_POSITION.TOP).weight, 2);
        });

    });

    describe("freezePane", () => {
        it("getFreezePaneTopHeight", () => {
            const func = (sheet:Sheet, freezePane:FreezePane) => {
                return sheet.setFreezePane(freezePane).getFreezePaneTopHeight();
            }
            // 固定枠なし
            const sheet = Sheet.create();
            assert.equal(sheet.getFreezePaneTopHeight(), 0, "none");

            // 固定枠行1
            const freezePane1 = FreezePane.create(
                null, CellPoint.create(1, 2)
            );
            assert.equal(func(sheet, freezePane1), DEFAULT_HEIGHT, "1");

            // 固定枠行1～3
            const freezePane13 = FreezePane.create(
                null, CellPoint.create(1, 4)
            );
            assert.equal(func(sheet, freezePane13), DEFAULT_HEIGHT * 3, "1-3");
            
            // 固定枠行4～5
            const freezePane45 = FreezePane.create(
                CellPoint.create(1, 4), CellPoint.create(1, 6)
            );
            assert.equal(func(sheet, freezePane45), DEFAULT_HEIGHT * 2, "4-5");
        });
        
        it("getFreezePaneLeftWidth", () => {
            const func = (sheet:Sheet, freezePane:FreezePane) => {
                return sheet.setFreezePane(freezePane).getFreezePaneLeftWidth();
            }
            // 固定枠なし
            const sheet = Sheet.create();
            assert.equal(sheet.getFreezePaneTopHeight(), 0, "none");

            // 固定枠列1
            const freezePane1 = FreezePane.create(
                null, CellPoint.create(2, 1)
            );
            assert.equal(func(sheet, freezePane1), DEFAULT_WIDTH, "1");

            // 固定枠行1～3
            const freezePane13 = FreezePane.create(
                null, CellPoint.create(4, 1)
            );
            assert.equal(func(sheet, freezePane13), DEFAULT_WIDTH * 3, "1-3");
            
            // 固定枠行4～5
            const freezePane45 = FreezePane.create(
                CellPoint.create(4, 1), CellPoint.create(6, 1)
            );
            assert.equal(func(sheet, freezePane45), DEFAULT_WIDTH * 2, "4-5");
        });

        it("getFreezePaneBottomHeight", () => {
            const func = (sheet:Sheet, freezePane:FreezePane) => {
                return sheet.setFreezePane(freezePane).getFreezePaneBottomHeight();
            }
            // 固定枠なし
            const sheet = Sheet.create();
            assert.equal(sheet.getFreezePaneTopHeight(), 0, "none");

            // 下固定枠なし
            const freezePane1 = FreezePane.create(
                null, CellPoint.create(2, 1)
            );
            assert.equal(func(sheet, freezePane1), 0, "none bottom");

            // 固定枠行11
            const freezePane13 = FreezePane.create(
                null, null, CellPoint.create(1, 10), CellPoint.create(1, 11)
            );
            assert.equal(func(sheet, freezePane13), DEFAULT_HEIGHT, "11");
            
            // 固定枠行20～25
            const freezePane45 = FreezePane.create(
                null, null, CellPoint.create(1, 19), CellPoint.create(1, 25)
            );
            assert.equal(func(sheet, freezePane45), DEFAULT_HEIGHT * 6, "20-25");
        });

        it("getFreezePaneRightWidth", () => {
            const func = (sheet:Sheet, freezePane:FreezePane) => {
                return sheet.setFreezePane(freezePane).getFreezePaneRightWidth();
            }
            // 固定枠なし
            const sheet = Sheet.create();
            assert.equal(sheet.getFreezePaneTopHeight(), 0, "none");

            // 右固定枠なし
            const freezePane1 = FreezePane.create(
                null, CellPoint.create(2, 1)
            );
            assert.equal(func(sheet, freezePane1), 0, "none2");

            // 固定枠行11
            const freezePane13 = FreezePane.create(
                null, null, CellPoint.create(10, 1), CellPoint.create(11, 1)
            );
            assert.equal(func(sheet, freezePane13), DEFAULT_WIDTH, "11");
            
            // 固定枠行20-25
            const freezePane45 = FreezePane.create(
                null, null, CellPoint.create(19, 1), CellPoint.create(25, 1)
            );
            assert.equal(func(sheet, freezePane45), DEFAULT_WIDTH * 6, "20-25");
        });


    });

    describe("Methods", function() {
        it("setValue", function() {
            var model = new Sheet();
            var target11 = new CellPoint(1, 1);
            var target12 = new CellPoint(1, 2);
            var target21 = new CellPoint(2, 1);
            var testModel = model
                .setValue(target11, "11")
                .setValue(target12, "12");

            assert.equal(testModel.getCell(target11).value, "11");
            assert.equal(testModel.getCell(target12).value, "12");
            assert.equal(testModel.getCell(target21).value, "");
        });

        // 座標からセル位置を算出するテスト
        it("pointToTarget", function() {
            var model = new Sheet();

            var target1 = model.pointToTarget(100, 20);
            assert.equal(target1.columnNo, 1);
            assert.equal(target1.rowNo, 1);

            var target2 = model.pointToTarget(200, 20);

            assert.equal(target2.columnNo, 2);
            assert.equal(target2.rowNo, 1);

        });

        // 座標から列位置を算出するテスト
        it("pointToColumnNo", function() {
            var model = new Sheet();
            var chItem = new ColumnHeaderItem();

            var columnHeader = model.columnHeader
                .setColumnCount(3)
                .setItem(1, chItem.setWidth(20))
                .setItem(2, chItem.setWidth(10))
                .setItem(3, chItem.setWidth(30));

            var rowHeader = model.rowHeader.setWidth(10);
            var testModel = model
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
