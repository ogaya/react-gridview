"use strict";

var Border = require("../../../dist/model/sheet/border").default;
var assert = require("power-assert");

describe("Border", function () {
    describe("toJS()", function () {
        it("null", function () {
            var border = Border.create();
            var json = border.toJS();
            assert.equal(json.weight, 1);
        });

    });

});
