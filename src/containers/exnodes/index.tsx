import * as React from "react";

// モデル情報
import Operation from "../../model/operation";
import Sheet from "../../model/sheet";
import Extension from "../../model/extension";
import {CellPoint} from "../../model/common";

// 共通ライブラリ
import {targetToRect, cellRangeToRect} from "../../model/lib/target_to_rect";

// スタイル
const style = {
    overflow: "hidden",
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%"
};


export interface ExNodesProps {
    sheet: Sheet;
    operation: Operation;
    extension: Extension;
}

export default class ExNodes extends React.Component<ExNodesProps, {}> {
    //const ExNodes = React.createClass({
    public static displayName = "Gridview-ExNodes";

    _createNodes() {
        const nodes = this.props.sheet.table
            .filter(cell => this.props.extension.nodes.has(cell.nodeName))
            .map((cell, key) => {
                const UserNode = this.props.extension.nodes.get(cell.nodeName);
                const rect = targetToRect(this.props.sheet, CellPoint.fromId(key), this.props.operation.scroll);
                const userNodeStyle = {
                    overflow: "hidden",
                    position: "absolute",
                    top: rect.top + "px",
                    left: rect.left + "px",
                    width: rect.width + "px",
                    height: rect.height + "px"
                };
                // 参照セルの取得
                const refCells = cell.refs
                    .map(id=> {
                        return this.props.sheet.getCell(id);
                    })
                    .toList();
                return (
                    <div key={key} style={userNodeStyle}>
                        <UserNode cell={cell} refCells={refCells} />
                    </div>);
            })
            .toArray();
        return nodes;
    }

    render() {
        const nodes = this._createNodes();
        //const nodes = null;
        return (
            <div style={style}>
                {nodes}
            </div>
        );
    }
}

//module.exports = ExNodes;
