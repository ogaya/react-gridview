import React from "react";

import SimpleButton from "../common/simple-button";

import {GridViewModel, OperationModel} from "../../../dist/react-gridview.js";

import "./index.css";

import CellConnectIcon from "./cell-connect.png";
import CellUnconnectIcon from "./cell-unconnect.png";

const ConnectArea = React.createClass({
  displayName: "AlignArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  _onClickMerge(){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setMergeRange(rangeItem);
      });

    this.props.onControlView(view);

  },
  _onClickUnMerge(){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setMergeRange(null);
      });

    this.props.onControlView(view);

  },
  render: function() {
    return (
      <div className="connect-area">
        <div>
          <SimpleButton icon={CellConnectIcon} onClick={this._onClickMerge}/>
        </div>
        <div>
          <SimpleButton icon={CellUnconnectIcon} onClick={this._onClickUnMerge}/>
        </div>
      </div>
    );
  }
});

module.exports = ConnectArea;
