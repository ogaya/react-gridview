import * as React from "react";

import AlignArea from "./align-area/index.tsx";
import VerticalArea from "./vertical-area/index.tsx";
import ConnectArea from "./connect-area/index.tsx";
import ColorArea from "./color-area/index.tsx";
import LineArea from "./line-area/index.tsx";

import {Sheet, Operation} from "react-gridview";

import "./cell-area.css";

export interface Props {
    viewModel: Sheet;
    operation: Operation;
    onControlView: (sheet: Sheet) => void;
    showSubWindow: (window) => void;
}

export default class CellArea extends React.Component<Props, {}> {
    //const CellArea = React.createClass({
    public static displayName = "CellArea";

    render() {
        const viewModel = this.props.viewModel;
        const operation = this.props.operation;
        const onControlView = this.props.onControlView;
        return (
            <div className="sample-cell-area sample-cell-table">
                <ColorArea 
                    viewModel={viewModel}
                    operation={operation}
                    onControlView={onControlView}
                    showSubWindow={this.props.showSubWindow}/>
                <AlignArea
                    sheet={viewModel}
                    operation={operation}
                    onControlView={onControlView}/>
                <VerticalArea
                    viewModel={viewModel}
                    operation={operation}
                    onControlView={onControlView}/>
                <ConnectArea
                    viewModel={viewModel}
                    operation={operation}
                    onControlView={onControlView}/>
                <LineArea
                    viewModel={viewModel}
                    operation={operation}
                    onControlView={onControlView}
                    showSubWindow={this.props.showSubWindow}/>
                <div></div>
            </div>
        );
    }
}
