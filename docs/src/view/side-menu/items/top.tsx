import * as React from "react";
function isSelectTop(hash: string) {
    if (!hash) {
        return true;
    }
    if (hash === "#/") {
        return true;
    }
    return false;
};

export default function createTopItems(hash: string) {
    let className = "side-menu-item-text";
    if (isSelectTop(hash)) {
        className = className + " select";
    }
    return (
        <li className="side-menu-item">
            <a href="#/" className={className}>Top</a>
        </li>
    );
};
