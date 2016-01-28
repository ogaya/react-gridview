"use strict";
import assert from "power-assert";
import Border from "../../../src/model/sheet/border";

describe("Border", function () {
    describe("toJS()", function () {
        it("null", function () {
            var border = Border.create();
            var json = border.toJS();
            assert.equal(json.weight, 1);
        });

    });

});
