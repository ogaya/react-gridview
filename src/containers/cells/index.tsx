import * as React from "react";

import Sheet from "../../model/sheet";
import Operation from "../../model/operation";

import {OperateDecoration} from "./operate-decoration";
import {TableCells} from "./table-cells";
import {Header} from "./header";

// スタイルシート読み込み
import "./css.js";

const style = {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    outline: "none"
};

export interface CellsProps {
    model: Sheet;
    opeModel: Operation;
    onOperationChange: (ope: Operation) => void;
}

export default class Cells extends React.Component<CellsProps, {}> {
    public static displayName = "Gridview-Cells";

    render() {
        return (
            <div style={style}>
                <TableCells sheet={this.props.model} opeModel={this.props.opeModel} onOperationChange={this.props.onOperationChange} />
                <OperateDecoration sheet={this.props.model} opeModel={this.props.opeModel}/>
                <Header sheet={this.props.model} opeModel={this.props.opeModel}/>
            </div>
        );
    }
}

