import * as React from "react";

import Sheet from "../../model/sheet";
import Operation from "../../model/operation";


import OperateDecoration from "./operate-decoration";
import TableCell from "./table-cell";
import Header from "./header";

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

interface Props {
    model: Sheet;
    opeModel: Operation;
    onOperationChange: (ope: Operation) => void;
}

interface State {
}

export default class Cells extends React.Component<Props, State> {
    //const Cells = React.createClass({
    public static displayName = "Gridview-Cells";

    render() {
        return (
            <div style={style}>
                <TableCell sheet={this.props.model} opeModel={this.props.opeModel} onOperationChange={this.props.onOperationChange} />
                <OperateDecoration sheet={this.props.model} opeModel={this.props.opeModel}/>
                <Header sheet={this.props.model} opeModel={this.props.opeModel}/>
            </div>
        );
    }
}

//module.exports = Cells;
