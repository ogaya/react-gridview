import React from "react";

import SimpleButton from "../common/simple-button";
import ColorPanel from "./color-panel";

import {Sheet, Operation} from "../../../dist";

import "./index.css";

import TextIcon from "./text.png";
import BgIcon from "./bg.png";
// import AlignCenterIcon from "./align-center.png";
// import AlignRightIcon from "./align-right.png";

const ColorArea = React.createClass({
  displayName: "ColorArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(Sheet),
    operationModel: React.PropTypes.instanceOf(Operation),
    onControlView: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  _onChangeTextColor(color){
    const rangeItem = this.props.operationModel.rangeItem;
    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setTextColor(color);
      });
    this.props.onControlView(view);
  },
  _onChangeBgColor(color){
    const rangeItem = this.props.operationModel.rangeItem;
    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setBackground(color);
      }
    );
    this.props.onControlView(view);
  },
  _onClickTextColor(){
    const subWindow =
      <ColorPanel className="text-color-panel" defaultText="自動" defaultColor="#000"
      showSubWindow={this.props.showSubWindow} onSelectColor={this._onChangeTextColor} />;
    this.props.showSubWindow(subWindow);
  },
  _onClickBgColor(){
    const subWindow =
      <ColorPanel className="bg-color-panel" defaultText="塗りつぶしなし" defaultColor=""
      showSubWindow={this.props.showSubWindow} onSelectColor={this._onChangeBgColor} />;
    this.props.showSubWindow(subWindow);
  },
  render: function() {
    return (
      <div className="color-area">
        <div>
          <SimpleButton icon={TextIcon} onClick={this._onClickTextColor}/>
        </div>
        <div>
          <SimpleButton icon={BgIcon} onClick={this._onClickBgColor}/>
        </div>
      </div>
    );
  }
});

module.exports = ColorArea;
