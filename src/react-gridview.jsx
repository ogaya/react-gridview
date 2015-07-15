import React from "react";

import Cells from "./containers/cells";
import Inputer from "./containers/inputer";

//import "./react-gridview.styl";

import GridViewModel from "./model/gridview";
import OperationModel from "./model/operation";

import {Horizontalbar} from "./containers/scrollbar";

const style = {
  width: "100%",
  height: "100%",
  cursor: "pointer",
  position: "relative"
};


const GridView = React.createClass({
  displayName: "gridview",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel)
  },
  getDefaultProps() {
    return {
      viewModel: new GridViewModel()
    };
  },
  getInitialState() {
    return {
      viewModel: this.props.viewModel,
      operation: new OperationModel()
    };
  },
  _onValueChange(target, value){

    const viewModel = this.state.viewModel
      .setValue(target, value);

    this.setState({viewModel: viewModel});
  },
  _onViewModelChange(viewModel){
    this.setState({viewModel: viewModel});
  },
  _onOperationChange(ope){
    this.setState({operation: ope});
  },
  _onStateChange(viewModel, operation){
    this.setState({
      viewModel: viewModel,
      operation: operation
    });
  },
  render: function () {
    const viewModel = this.state.viewModel;
    const operation = this.state.operation;
//    const inputer = operation.input.isInputing ?
//      <Inputer opeModel={operation} onValueChange={this._onValueChange}
//        onOperationChange={this._onOperationChange} /> : null;
    //console.log(operation.HoverCursor);
    //style.cursor = operation.HoverCursor;
    const inputer = <Inputer opeModel={operation} viewModel={viewModel}
      onValueChange={this._onValueChange} onStateChange={this._onStateChange}/>;
    return (
      <div style={style}>
        <Cells onOperationChange={this._onOperationChange}
          model={viewModel} opeModel={operation} onViewModelChange={this._onViewModelChange} />
        {inputer}
        <Horizontalbar opeModel={operation} onOperationChange={this._onOperationChange}/>
      </div>
    );
  }
});

module.exports = GridView;
