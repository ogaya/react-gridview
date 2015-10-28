import React from "react";

import AlignArea from "./align-area";
import VerticalArea from "./vertical-area";
import ConnectArea from "./connect-area";
import ColorArea from "./color-area";
import LineArea from "./line-area";

import {GridViewModel, OperationModel} from "../../dist";

import "./cell-area.css";

const CellArea = React.createClass({
  displayName: "CellArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  render: function() {
    const viewModel = this.props.viewModel;
    const operationModel = this.props.operationModel;
    const onControlView = this.props.onControlView;
    return (
      <div className="sample-cell-area sample-cell-table">
        <ColorArea viewModel={viewModel} operationModel={operationModel}
          onControlView={onControlView} showSubWindow={this.props.showSubWindow}/>
        <AlignArea viewModel={viewModel}
          operationModel={operationModel} onControlView={onControlView}/>
        <VerticalArea viewModel={viewModel}
          operationModel={operationModel} onControlView={onControlView}/>
        <ConnectArea viewModel={viewModel}
          operationModel={operationModel} onControlView={onControlView}/>
        <LineArea viewModel={viewModel} operationModel={operationModel}
          onControlView={onControlView} showSubWindow={this.props.showSubWindow}/>
        <div></div>
      </div>
    );
  }
});

module.exports = CellArea;
