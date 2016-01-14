import * as React from "react";

function isSelectGridView(hash: string) {

    if (hash === "#/gridview") {
        return true;
    }
    return false;
};

export default function createGridViewItems(hash: string) {
    let className = "side-menu-item-text";
    if (isSelectGridView(hash)) {
        className = className + " select";
    }
    return (
        <li className="side-menu-item">
            <a href="#/gridview" className={className}>GridView</a>
        </li>
    );
};
