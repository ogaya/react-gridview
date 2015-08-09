import React from "react";
import OperationModel from "../../model/operation";
import GridViewModel from "../../model/gridview";

// モデル
import {Point, Rect} from "../../model/common";
import {HEADER_WIDTH} from "../../model/gridview/row-header";
import {HEADER_HEIGHT} from "../../model/gridview/column-header";

// コンポーネント
import {Horizontalbar} from "./horizontalbar";
import {Verticalbar}  from "./verticalbar";

// ライブラリ
import {drag} from "../../util/drag";

// スタイルシート読み込み
import "./css.js";

const csStyle = Object.freeze({
  background: "#F00"
});

const PADDING = 2;
const SCROLL_UNIT = 10;

const hStyle = Object.freeze({
  left: HEADER_WIDTH + "px",
  width: "calc(100% - " + (HEADER_WIDTH + 20) +"px)"
});

const vStyle = Object.freeze({
  top: HEADER_HEIGHT + "px",
  height: "calc(100% - " + (HEADER_HEIGHT + 20) +"px)"
});

const cStyle = Object.freeze({
  width: "20px",
  height: "20px"
});

const GridViewBar  = React.createClass({
  displayName: "GridViewBar",
  propTypes: {
    isVertical: React.PropTypes.bool,
    opeModel: React.PropTypes.instanceOf(OperationModel),
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    onOperationChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      isVertical: false
    };
  },
  _onHorizontalScroll(value){
    // const point = Math.floor(e.target.scrollLeft / 100);
    const opeModel = this.props.opeModel;
    if (opeModel.scroll.columnNo === value){
      return;
    }
    const scroll = opeModel.scroll.setColumnNo(value);
    this.props.onOperationChange(opeModel.setScroll(scroll));
  },
  _onVerticalScroll(value){
    // const point = Math.floor(e.target.scrollLeft / 100);

    const opeModel = this.props.opeModel;
    if (opeModel.scroll.rowNo === value){
      return;
    }
    const scroll = opeModel.scroll.setRowNo(value);
    this.props.onOperationChange(opeModel.setScroll(scroll));
  },
  render() {
    const scroll = this.props.opeModel.scroll;
    const rowNo = scroll.rowNo;
    const columnNo = scroll.columnNo;
    return (
      <div>
        <div className="gw-horizontal-position" style={hStyle}>
          <Horizontalbar viewModel={this.props.viewModel} opeModel={this.props.opeModel}
            onChangeValue={this._onHorizontalScroll} value={columnNo}/>
        </div>

        <div className="gw-vertical-position" style={vStyle}>
          <Verticalbar viewModel={this.props.viewModel} opeModel={this.props.opeModel}
            onChangeValue={this._onVerticalScroll} value={rowNo}/>
        </div>

        <div className="gw-center-position" style={cStyle}/>

      </div>
    );
  }
});
// <div style={contents} />
export {
  GridViewBar
};
