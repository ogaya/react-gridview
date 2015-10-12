import React from "react";

import AlignArea from "./align-area";
import VerticalArea from "./vertical-area";
import ConnectArea from "./connect-area";
import ColorArea from "./color-area";

import {GridViewModel, OperationModel} from "../../dist/react-gridview.js";

import "./cell-area.css";

const CellArea = React.createClass({
  displayName: "CellArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  render: function() {
    const viewModel = this.props.viewModel;
    const operationModel = this.props.operationModel;
    const onControlView = this.props.onControlView;
    return (
      <div className="sample-cell-area sample-cell-table">
        <div>
          <ColorArea viewModel={viewModel}
            operationModel={operationModel} onControlView={onControlView}/>
        </div>
        <div>
          <AlignArea viewModel={viewModel}
            operationModel={operationModel} onControlView={onControlView}/>
        </div>
        <div>
          <VerticalArea viewModel={viewModel}
            operationModel={operationModel} onControlView={onControlView}/>
        </div>
        <div>
          <ConnectArea viewModel={viewModel}
            operationModel={operationModel} onControlView={onControlView}/>
        </div>
      </div>
    );
  }
});

module.exports = CellArea;
