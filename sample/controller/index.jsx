import React from "react";
//import GridView from "../dist";
import {Sheet, Operation} from "../../dist";

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
    viewModel: React.PropTypes.instanceOf(Sheet),
    operation: React.PropTypes.instanceOf(Operation),
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
        <CellArea viewModel={this.props.viewModel} operation={this.props.operation}
          onControlView={this.props.onControlView} showSubWindow={this._showSubWindow}/>
        <div className="value-area">
          <TextArea viewModel={this.props.viewModel} onChangeOperation={this.props.onChangeOperation}
            operation={this.props.operation} onControlView={this.props.onControlView}
            setInputFocus={this.props.setInputFocus}/>
        </div>
        {subWindow}
      </div>
    );
  }
});


module.exports = Controller;
