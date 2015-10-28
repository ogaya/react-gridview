import React from "react";

import SimpleButton from "../common/simple-button";

import {GridViewModel, OperationModel, VERTICAL_ALIGN} from "../../../dist";

import "./index.css";

import VerticalTopIcon from "./vertical-top.png";
import VerticalMiddleIcon from "./vertical-middle.png";
import VerticalBottomIcon from "./vertical-bottom.png";

const VerticalArea = React.createClass({
  displayName: "VerticalArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  _onChangeTextAlign(textAlign){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setVerticalAlign(textAlign);
      });

    this.props.onControlView(view);

  },
  _onClickTop(){
    this._onChangeTextAlign(VERTICAL_ALIGN.TOP);
  },
  _onClickMiddle(){
    this._onChangeTextAlign(VERTICAL_ALIGN.MIDDLE);
  },
  _onClickBottom(){
    this._onChangeTextAlign(VERTICAL_ALIGN.BOTTOM);
  },
  render: function() {
    return (
      <div className="vertical-area">
        <div>
          <SimpleButton icon={VerticalTopIcon} onClick={this._onClickTop}/>
        </div>
        <div>
          <SimpleButton icon={VerticalMiddleIcon} onClick={this._onClickMiddle}/>
        </div>
        <div>
          <SimpleButton icon={VerticalBottomIcon} onClick={this._onClickBottom}/>
        </div>
      </div>
    );
  }
});

module.exports = VerticalArea;
