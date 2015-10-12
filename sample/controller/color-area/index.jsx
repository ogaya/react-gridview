import React from "react";

import SimpleButton from "../common/simple-button";

import {GridViewModel, OperationModel} from "../../../dist/react-gridview.js";

import "./index.css";

import TextIcon from "./text.png";
import BgIcon from "./bg.png";
// import AlignCenterIcon from "./align-center.png";
// import AlignRightIcon from "./align-right.png";

const ColorArea = React.createClass({
  displayName: "ColorArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  _onChangeTextColor(e){
    const rangeItem = this.props.operationModel.rangeItem;
    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setTextColor(e.target.value);
      });
    this.props.onControlView(view);
  },
  _onChangeBgColor(e){
    const rangeItem = this.props.operationModel.rangeItem;
    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setBackground(e.target.value);
      }
    );
    this.props.onControlView(view);
  },
  render: function() {
    return (
      <div className="color-area">
        <div>
          <SimpleButton icon={TextIcon}/>
        </div>
        <div>
          <SimpleButton icon={BgIcon}/>
        </div>
        <div>
          <select name="textcolor" onChange={this._onChangeTextColor}>
            <option value="">なし</option>
            <option value="#F00">赤</option>
            <option value="#0F0">緑</option>
            <option value="#00F">青</option>
          </select>
        </div>
        <div>
          <select name="bgcolor" onChange={this._onChangeBgColor}>
            <option value="">なし</option>
            <option value="#F00">赤</option>
            <option value="#0F0">緑</option>
            <option value="#00F">青</option>
          </select>
        </div>
      </div>
    );
  }
});

module.exports = ColorArea;
