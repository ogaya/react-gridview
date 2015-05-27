import React from "react";

import Cells from "./containers/cells";
import Inputer from "./containers/inputer";

//import "./react-gridview.styl";

import GridViewModel from "./model/gridview";
import OperationModel from "./model/operation";


const style = {
  width: "100%",
  height: "100%",
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
      operation: new OperationModel()
    };
  },
  _onOperationChange(ope){
    this.setState({operation: ope});
  },
  render: function () {
    const inputer = this.state.operation.input.isInputing ?
      <Inputer operation={this.state.operation} onOperationChange={this._onOperationChange} /> : null;
    return (
      <div style={style}>
        <Cells id={this.props.id} onOperationChange={this._onOperationChange}
          model={this.props.model} operation={this.state.operation} />
        {inputer}
      </div>
    );
  }
});

module.exports = GridView;
