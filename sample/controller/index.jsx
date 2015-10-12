import React from "react";
//import GridView from "../dist/react-gridview.js";
import {GridViewModel, OperationModel} from "../../dist/react-gridview.js";

import TextArea from"./text-area";
import CellArea from"./cell-area";

const areaStyle = {
  height: "50px",
  position: "relative"
};
const valueStyle = {
  position: "absolute",
  bottom: "0px",
  height: "20px",
  width: "100%"
};

const Controller = React.createClass({
  displayName: "Controller",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  render: function() {
    return (
      <div style={areaStyle}>
        <CellArea viewModel={this.props.viewModel}
          operationModel={this.props.operationModel} onControlView={this.props.onControlView}/>
        <div style={valueStyle}>
          <TextArea viewModel={this.props.viewModel}
            operationModel={this.props.operationModel} onControlView={this.props.onControlView}/>
        </div>
      </div>
    );
  }
});


module.exports = Controller;
