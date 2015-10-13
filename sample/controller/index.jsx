import React from "react";
//import GridView from "../dist/react-gridview.js";
import {GridViewModel, OperationModel} from "../../dist/react-gridview.js";

import TextArea from"./text-area";
import CellArea from"./cell-area";

const areaStyle = {
  height: "53px",
  position: "relative",
  zIndex: "100"
};
const valueStyle = {
  position: "absolute",
  bottom: "0px",
  height: "24px",
  width: "100%"
};

const Controller = React.createClass({
  displayName: "Controller",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  getInitialState() {
    return {
      subWindow: null
    };
  },
  _showSubWindow(subWindow){
    this.setState({subWindow: subWindow});
  },
  render: function() {
    const subWindow = this.state.subWindow;

    return (
      <div style={areaStyle}>
        <CellArea viewModel={this.props.viewModel} operationModel={this.props.operationModel}
          onControlView={this.props.onControlView} showSubWindow={this._showSubWindow}/>
        <div style={valueStyle}>
          <TextArea viewModel={this.props.viewModel}
            operationModel={this.props.operationModel} onControlView={this.props.onControlView}/>
        </div>
        {subWindow}
      </div>
    );
  }
});


module.exports = Controller;
