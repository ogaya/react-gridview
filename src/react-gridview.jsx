import React from "react";

import Cells from "./containers/cells";
import Inputer from "./containers/inputer";

//import "./react-gridview.styl";

import GridViewModel from "./model/gridview";
import OperationModel from "./model/operation";

const style = {
  width: "100%",
  height: "100%",
  cursor: "default",
  position: "relative"
};


const GridView = React.createClass({
  displayName: "gridview",
  propTypes: {
    id: React.PropTypes.string,
    model: React.PropTypes.instanceOf(GridViewModel)
  },
  getDefaultProps() {
    return {
      id: "gridview-canvas01",
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
        <Cells id={this.props.id} onOperationChange={this._onOperationChange}
          model={model} operation={operation} />
        {inputer}
      </div>
    );
  }
});

module.exports = GridView;
