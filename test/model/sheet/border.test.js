"use strict";

var Border = require("../../../dist/model/sheet/border").default;
var assert = require("power-assert");

describe("Border", function () {
    describe("toJS()", function () {
        it("null", function () {
            console.log(Border);
            var border = Border.create();
            var json = border.toJS();
            console.log(json);
            assert.equal(json.weight, 1);
        });

    });

});
