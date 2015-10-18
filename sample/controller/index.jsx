import React from "react";
//import GridView from "../dist/react-gridview.js";
import {GridViewModel, OperationModel} from "../../dist/react-gridview.js";

import TextArea from"./text-area";
import CellArea from"./cell-area";
import "./index.css";


// const valueStyle = {
//   position: "absolute",
//   bottom: "0px",
//   height: "24px",
//   width: "100%"
// };

const Controller = React.createClass({
  displayName: "Controller",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func,
    onChangeOperation: React.PropTypes.func,
    setInputFocus: React.PropTypes.func
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
      <div className="controller">
        <CellArea viewModel={this.props.viewModel} operationModel={this.props.operationModel}
          onControlView={this.props.onControlView} showSubWindow={this._showSubWindow}/>
        <div className="value-area">
          <TextArea viewModel={this.props.viewModel} onChangeOperation={this.props.onChangeOperation}
            operationModel={this.props.operationModel} onControlView={this.props.onControlView}
            setInputFocus={this.props.setInputFocus}/>
        </div>
        {subWindow}
      </div>
    );
  }
});


module.exports = Controller;
