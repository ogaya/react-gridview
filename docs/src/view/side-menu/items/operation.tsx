import * as React from "react";

function isSelect(hash: string) {

    if (hash === "#/operation") {
        return true;
    }
    return false;
};

export default function createOperationItems(hash: string) {
    let className = "side-menu-item-text";
    if (isSelect(hash)) {
        className = className + " select";
    }
    return (
        <li className="side-menu-item">
            <a href="#/operation" className={className}>Operation</a>
        </li>
    );
};
