import * as React from "react";

import SimpleButton from "../common/simple-button/index.tsx";

import {Sheet, Operation} from "react-gridview";

import "./index.css";

const CellConnectIcon = require("./cell-connect.png");
const CellUnconnectIcon = require("./cell-unconnect.png");

export interface Props {
    viewModel: Sheet;
    operation: Operation
    onControlView: (sheet: Sheet) => void;
}

export default class ConnectArea extends React.Component<Props, {}> {
    public static displayName = "AlignArea";

    _onClickMerge(){
        const rangeItem = this.props.operation.rangeItem;
        const view = this.props.viewModel.editCells(
            rangeItem, (cell) => {
                return cell.setMergeRange(rangeItem);
            });
        this.props.onControlView(view);
    }

    _onClickUnMerge(){
        const rangeItem = this.props.operation.rangeItem;
        const view = this.props.viewModel.editCells(
            rangeItem, (cell) => {
                return cell.setMergeRange(null);
            });
        this.props.onControlView(view);
    }

    render() {
        return (
            <div className="connect-area">
                <div>
                    <SimpleButton icon={CellConnectIcon}
                        onClick={this._onClickMerge.bind(this)}/>
                </div>
                <div>
                    <SimpleButton icon={CellUnconnectIcon}
                        onClick={this._onClickUnMerge.bind(this)}/>
                </div>
            </div>
        );
    }
}
