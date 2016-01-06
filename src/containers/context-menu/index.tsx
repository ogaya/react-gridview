import * as React from "react";

// モデル情報
import Operation from "../../model/operation";
import Sheet from "../../model/sheet";
import Extension from "../../model/extension";

import "./css.js";

export interface ContextMenuProps {
    sheet: Sheet;
    operation: Operation;
    extension: Extension;
}

export default class ContextMenu extends React.Component<ContextMenuProps, {}> {
    //const ContextMenu = React.createClass({
    public static displayName = "React-Sheet-ContextMenu";

    render() {
        return (
            <div className="rs-context-menu">
                メニュー
                </div>
        );
    }
}
