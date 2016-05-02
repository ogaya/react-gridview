"use strict";
import assert from "power-assert";
import Border from "../../../src/model/sheet/border";

describe("Border", function () {
    describe("toJS()", function () {
        it("null", function () {
            const border = Border.create();
            const json = border.toJS();
            assert.equal(json.weight, 1);
        });
    });
    
    describe("fromJS()", function () {
        it("null", function () {
            assert.notEqual(Border.fromJS(null), null);
            assert.notEqual(Border.fromJS({}), null);
        });

    });
    
    describe("setColor()", function () {
        const border = Border.create().setColor("#FFFFFF");
        assert.equal(border.colors.length, 1);
        assert.equal(border.colors[0], "#FFFFFF");
    });

});
