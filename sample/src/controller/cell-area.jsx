import React from "react";

import AlignArea from "./align-area";
import VerticalArea from "./vertical-area";
import ConnectArea from "./connect-area";
import ColorArea from "./color-area";
import LineArea from "./line-area";

import {Sheet, Operation} from "react-gridview";

import "./cell-area.css";

const CellArea = React.createClass({
  displayName: "CellArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(Sheet),
    operation: React.PropTypes.instanceOf(Operation),
    onControlView: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  render: function() {
    const viewModel = this.props.viewModel;
    const operation = this.props.operation;
    const onControlView = this.props.onControlView;
    return (
      <div className="sample-cell-area sample-cell-table">
        <ColorArea viewModel={viewModel} operation={operation}
          onControlView={onControlView} showSubWindow={this.props.showSubWindow}/>
        <AlignArea viewModel={viewModel}
          operation={operation} onControlView={onControlView}/>
        <VerticalArea viewModel={viewModel}
          operation={operation} onControlView={onControlView}/>
        <ConnectArea viewModel={viewModel}
          operation={operation} onControlView={onControlView}/>
        <LineArea viewModel={viewModel} operation={operation}
          onControlView={onControlView} showSubWindow={this.props.showSubWindow}/>
        <div></div>
      </div>
    );
  }
});

module.exports = CellArea;
