import React from "react";

import SimpleButton from "../common/simple-button";

import {GridViewModel, OperationModel} from "../../../dist/react-gridview.js";

//import LinePanel from "./line-panel";
import {LinePanel, LINE_TYPE} from "./line-panel";

import {
  setFullBorder,
  setBottomBorder,
  setLeftBorder,
  setRightBorder,
  setCrossBorder,
  setCenterBorder,
  setMiddleBorder,
  setGridBorder,
  setTopBorder
} from "./set-border";

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
        view = setFullBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.TOP:
        view = setTopBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.BOTTOM:
        view = setBottomBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.LEFT:
        view = setLeftBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.RIGHT:
        view = setRightBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.NONE:
        view = setFullBorder(view, rangeItem, null);
        break;
      case LINE_TYPE.CROSS:
        view = setCrossBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.MIDDLE:
        view = setMiddleBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.CENTER:
        view = setCenterBorder(view, rangeItem, border);
        break;
      case LINE_TYPE.GRID:
        view = setGridBorder(view, rangeItem, border);
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
