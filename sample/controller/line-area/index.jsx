import React from "react";

import SimpleButton from "../common/simple-button";

import {GridViewModel, OperationModel} from "../../../dist/react-gridview.js";

import LinePanel from "./line-panel";

import FullIcon from "./full.png";

import "./index.css";

const LineArea = React.createClass({
  displayName: "AlignArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  _onClick(){
    const subWindow = <LinePanel
      showSubWindow={this.props.showSubWindow} onSelectColor={this._onChangeTextColor}/>;
    this.props.showSubWindow(subWindow);
  },
  render: function() {
    return (
      <div className="line-area">
        <div>
          <SimpleButton icon={FullIcon} onClick={this._onClick}/>
        </div>
      </div>
    );
  }
});

module.exports = LineArea;
