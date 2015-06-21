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
  cursor: "default",
  position: "relative"
};


const GridView = React.createClass({
  displayName: "gridview",
  propTypes: {
    model: React.PropTypes.instanceOf(GridViewModel)
  },
  getDefaultProps() {
    return {
      model: new GridViewModel()
    };
  },
  getInitialState() {
    return {
      model: this.props.model,
      operation: new OperationModel()
    };
  },
  _onValueChange(target, value){

    const model = this.state.model
      .setValue(target, value);

    this.setState({model: model});
  },
  _onViewModelChange(viewModel){
    this.setState({model: viewModel});
  },
  _onOperationChange(ope){
    this.setState({operation: ope});
  },
  render: function () {
    const model = this.state.model;
    const operation = this.state.operation;
    const inputer = operation.input.isInputing ?
      <Inputer opeModel={operation} onValueChange={this._onValueChange}
        onOperationChange={this._onOperationChange} /> : null;
    return (
      <div style={style}>
        <Cells onOperationChange={this._onOperationChange}
          model={model} opeModel={operation} onViewModelChange={this._onViewModelChange} />
        {inputer}
        <Horizontalbar opeModel={operation} onOperationChange={this._onOperationChange}/>
      </div>
    );
  }
});

module.exports = GridView;
