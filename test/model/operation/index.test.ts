"use strict";
import assert from "power-assert";

import {Operation} from "../../../src/model/operation";
import {SelectInfo} from "../../../src/model/lib/select";
import {OBJECT_TYPE} from "../../../src/model/sheet/object-type";

describe("Operation", function() {
    describe("objectCursor", function() {
        it("pointer", function() {
            const item = new SelectInfo(OBJECT_TYPE.CELL, null, null, null);
            const operation = Operation.create().setOpeItem(item);

            assert.equal(operation.opeCursor(), "pointer");
        });
    });
});
