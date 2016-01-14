import * as React from "react";

function isSelect(hash: string) {

    if (hash === "#/sheet") {
        return true;
    }
    return false;
};

export default function createSheetItems(hash: string) {
    let className = "side-menu-item-text";
    if (isSelect(hash)) {
        className = className + " select";
    }
    return (
        <li className="side-menu-item">
            <a href="#/sheet" className={className}>Sheet</a>
        </li>
    );
};
