import * as React from "react";

import SimpleButton from "../common/simple-button/index.tsx";

import {Sheet, Operation, VERTICAL_ALIGN} from "react-gridview";

import "./index.css";

const VerticalTopIcon = require("./vertical-top.png");
const VerticalMiddleIcon = require("./vertical-middle.png");
const VerticalBottomIcon = require("./vertical-bottom.png");


export interface Props {
    viewModel: Sheet;
    operation: Operation;
    onControlView: (sheet: Sheet) => void;
}

export class VerticalArea extends React.Component<Props, {}> {
    public static displayName = "VerticalArea";

    _onChangeTextAlign(textAlign) {
        const rangeItem = this.props.operation.rangeItem;

        const view = this.props.viewModel.editCells(
            rangeItem, (cell) => {
                return cell.setVerticalAlign(textAlign);
            });

        this.props.onControlView(view);

    }
    _onClickTop() {
        this._onChangeTextAlign(VERTICAL_ALIGN.TOP);
    }
    _onClickMiddle() {
        this._onChangeTextAlign(VERTICAL_ALIGN.MIDDLE);
    }
    _onClickBottom() {
        this._onChangeTextAlign(VERTICAL_ALIGN.BOTTOM);
    }
    render() {
        return (
            <div className="vertical-area">
                <div>
                    <SimpleButton
                        icon={VerticalTopIcon}
                        onClick={this._onClickTop.bind(this)}/>
                </div>
                <div>
                    <SimpleButton
                        icon={VerticalMiddleIcon}
                        onClick={this._onClickMiddle.bind(this)}/>
                </div>
                <div>
                    <SimpleButton
                        icon={VerticalBottomIcon}
                        onClick={this._onClickBottom.bind(this)}/>
                </div>
            </div>
        );
    }
}

export {
VerticalArea as default
}
