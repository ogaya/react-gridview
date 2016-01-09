import * as React from "react";
import {Sheet, Operation} from "react-gridview";

import SimpleButton from "../common/simple-button/index.tsx";
import ColorPanel from "./color-panel.tsx";

import "./index.css";

const TextIcon = require("./text.png");
const BgIcon = require("./bg.png");

export interface Props {
    viewModel: Sheet;
    operation: Operation;
    onControlView: (sheet: Sheet) => void;
    showSubWindow: (window) => void;
}

export default class ColorArea extends React.Component<Props, {}> {
    public static displayName = "ColorArea";
    private _onChangeTextColor(color) {
        const rangeItem = this.props.operation.rangeItem;
        const view = this.props.viewModel.editCells(
            rangeItem, (cell) => {
                return cell.setTextColor(color);
            });
        this.props.onControlView(view);
    }
    private _onChangeBgColor(color) {
        const rangeItem = this.props.operation.rangeItem;
        const view = this.props.viewModel.editCells(
            rangeItem, (cell) => {
                return cell.setBackground(color);
            }
        );
        this.props.onControlView(view);
    }
    private _onClickTextColor() {
        const subWindow = <ColorPanel
            className="text-color-panel"
            defaultText="自動" defaultColor="#000"
            showSubWindow={this.props.showSubWindow}
            onSelectColor={this._onChangeTextColor.bind(this)}/>;
        this.props.showSubWindow(subWindow);
    }
    private _onClickBgColor() {
        const subWindow = <ColorPanel
            className="bg-color-panel"
            defaultText="塗りつぶしなし" defaultColor=""
            showSubWindow={this.props.showSubWindow}
            onSelectColor={this._onChangeBgColor.bind(this)}/>;
        this.props.showSubWindow(subWindow);
    }
    render() {
        return (
            <div className="color-area">
                <div>
                    <SimpleButton icon={TextIcon}
                        onClick={this._onClickTextColor.bind(this)}/>
                </div>
                <div>
                    <SimpleButton icon={BgIcon}
                        onClick={this._onClickBgColor.bind(this)}/>
                </div>
            </div>
        );
    }
}
