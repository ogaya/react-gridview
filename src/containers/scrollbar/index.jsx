import React from "react";
import OperationModel from "../../model/operation";
import Sheet from "../../model/sheet";

// コンポーネント
import {Horizontalbar} from "./horizontalbar";
import {Verticalbar}  from "./verticalbar";

// スタイルシート読み込み
import "./css.js";

const cStyle = Object.freeze({
  width: "20px",
  height: "20px"
});

const GridViewBar  = React.createClass({
  displayName: "GridViewBar",
  propTypes: {
    isVertical: React.PropTypes.bool,
    opeModel: React.PropTypes.instanceOf(OperationModel),
    sheet: React.PropTypes.instanceOf(Sheet),
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
  _hSpaceStyle(){
    const sheet = this.props.sheet;
    return {
      left: "0px",
      bottom: "0px",
      position: "absolute",
      background: sheet.rowHeader.background,
      borderTop: "1px solid #999",
      borderRight: "1px solid #999",
      height: "20px",
      width: sheet.rowHeader.width + "px"
    };
  },
  _vSpaceStyle(){
    const sheet = this.props.sheet;
    return {
      right: "0px",
      top: "0px",
      position: "absolute",
      borderLeft: "1px solid #999",
      borderBottom: "1px solid #999",
      background: sheet.columnHeader.background,
      height: sheet.columnHeader.height + "px",
      width: "20px"
    };
  },
  render() {
    const sheet = this.props.sheet;
    const scroll = this.props.opeModel.scroll;
    const rowNo = scroll.rowNo;
    const columnNo = scroll.columnNo;

    const hStyle = {
      left: sheet.rowHeader.width + "px",
      width: "calc(100% - " + (sheet.rowHeader.width + 20) + "px)"
    };

    const vStyle = {
      top: sheet.columnHeader.height + "px",
      height: "calc(100% - " + (sheet.columnHeader.height + 20) + "px)"
    };

    return (
      <div>
        <div className="gw-horizontal-position" style={hStyle}>
          <Horizontalbar sheet={this.props.sheet} opeModel={this.props.opeModel}
            onChangeValue={this._onHorizontalScroll} value={columnNo}/>
        </div>
        <div style={this._hSpaceStyle()}></div>
        <div className="gw-vertical-position" style={vStyle}>
          <Verticalbar sheet={this.props.sheet} opeModel={this.props.opeModel}
            onChangeValue={this._onVerticalScroll} value={rowNo}/>
        </div>
        <div style={this._vSpaceStyle()}></div>
        <div className="gw-center-position" style={cStyle}/>

      </div>
    );
  }
});
// <div style={contents} />
export {
  GridViewBar
};
