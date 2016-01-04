import React from "react";

import SimpleButton from "../common/simple-button";

import {Sheet, Operation} from "react-gridview";

import "./index.css";

import CellConnectIcon from "./cell-connect.png";
import CellUnconnectIcon from "./cell-unconnect.png";

const ConnectArea = React.createClass({
  displayName: "AlignArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(Sheet),
    operation: React.PropTypes.instanceOf(Operation),
    onControlView: React.PropTypes.func
  },
  _onClickMerge(){
    const rangeItem = this.props.operation.rangeItem;

    const view = this.props.viewModel.editCells(
      rangeItem, (cell)=>{
        return cell.setMergeRange(rangeItem);
      });

    this.props.onControlView(view);

  },
  _onClickUnMerge(){
    const rangeItem = this.props.operation.rangeItem;

    const view = this.props.viewModel.editCells(
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
