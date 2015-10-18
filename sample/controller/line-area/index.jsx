import React from "react";

import SimpleButton from "../common/simple-button";

import {GridViewModel, OperationModel, BORDER_POSITION} from "../../../dist/react-gridview.js";

//import LinePanel from "./line-panel";
import {LinePanel, LINE_TYPE} from "./line-panel";

import FullIcon from "./full.png";

import "./index.css";

const LineArea = React.createClass({
  displayName: "LineArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  _onChangeBorder(border, lineType){
    const rangeItem = this.props.operationModel.rangeItem;
    let view = this.props.viewModel;
    switch (lineType) {
      case LINE_TYPE.FULL:
        this.props.viewModel.getCells(rangeItem).forEach((cell) =>{
          view = view
            .setBorder(cell.cellPoint(), BORDER_POSITION.TOP, border)
            .setBorder(cell.cellPoint(), BORDER_POSITION.LEFT, border)
            .setBorder(cell.cellPoint(), BORDER_POSITION.RIGHT, border)
            .setBorder(cell.cellPoint(), BORDER_POSITION.BOTTOM, border);
        });
        break;
      default:
        return;
    }

    this.props.onControlView(view);
  },
  _onClick(){
    const subWindow = <LinePanel
      showSubWindow={this.props.showSubWindow} onSelectBorder={this._onChangeBorder}/>;
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
