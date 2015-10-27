import React from "react";

import GridViewModel from "../../model/gridview";
import OperationModel from "../../model/operation";


import OperateDecoration from "./operate-decoration";
import TableCell from "./table-cell";
import Header from "./header";

// スタイルシート読み込み
import "./css.js";

const style =  {
  position: "absolute",
  top: "0px",
  bottom: "0px",
  width: "100%",
  height: "100%",
  cursor: "pointer",
  outline: "none"
};

const Cells = React.createClass({
  displayName: "Gridview-Cells",
  propTypes: {
    model: React.PropTypes.instanceOf(GridViewModel),
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onOperationChange: React.PropTypes.func
  },
  render: function () {
    return (
      <div style={style}>
        <TableCell view={this.props.model} opeModel={this.props.opeModel} onOperationChange={this.props.onOperationChange} />
        <OperateDecoration view={this.props.model} opeModel={this.props.opeModel}/>
        <Header view={this.props.model} opeModel={this.props.opeModel}/>
      </div>
    );
  }
});

module.exports = Cells;
