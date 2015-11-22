//
// 横のスクロールバー
//

import React from "react";
import ReactDOM from "react-dom";

import OperationModel from "../../../model/operation";
import GridViewModel  from "../../../model/sheet";

// ライブラリ
import {drag} from "../../../util/drag";

// スタイルシート読み込み
import "./css.js";


const PADDING = 0;
//const SCROLL_UNIT = 5;

// thumbの最小幅
const THUMB_MIN_WIDTH = 30;

const Horizontalbar  = React.createClass({
  displayName: "Horizontalbar",
  propTypes: {
    className: React.PropTypes.string,
    opeModel: React.PropTypes.instanceOf(OperationModel),
    sheet: React.PropTypes.instanceOf(GridViewModel),
    smallChange: React.PropTypes.number,
    largeChange: React.PropTypes.number,
    value: React.PropTypes.number,
    onChangeValue: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      smallChange: 1,
      largeChange: 5,
      onChangeValue: ()=>{}
    };
  },
  getInitialState() {
    return {
      thumbAreaRect: null,
      offsetX: 0
    };
  },
  _handleResize(){
    const thumbArea = ReactDOM.findDOMNode(this.refs.rgThumbArea);
    const areaRect = thumbArea.getBoundingClientRect();
    this.setState({thumbAreaRect: areaRect});
  },
  componentDidMount(){
    const node = ReactDOM.findDOMNode(this.refs.rgThumb);
    drag(node, this._dragStart, this._dragMove);
    window.addEventListener("resize", this._handleResize);
    this._handleResize();
  },
  componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize);
  },
  // 全体のスタイルの生成
  _createStyle(){
    let style = {
      position: "absolute"
    };

    style.bottom = "0px";
    style.left = "0px";
    style.width = "100%";
    style.overflowX = "hidden";
    style.overflowY = "hidden";
    return style;
  },
  _getScrollMaxValue(){
    const sheet = this.props.sheet;
    const opeModel = this.props.opeModel;
    if ((!sheet) || (!opeModel)) {
      return 0;
    }

    const canvasRect = opeModel.canvasRect;
    if (!canvasRect){
      return 0;
    }
    const tableWidth = canvasRect.width - sheet.rowHeader.width;
    let sumWidth = 0;
    let columnNo = 1;
    sheet.columnHeader.items.reverse().forEach((item, key)=>{
      sumWidth = sumWidth + item.width;

      if (sumWidth > tableWidth){
        return false;
      }
      columnNo = key;
    });

    return columnNo;
  },
  _dragStart(e){
    if (!this.state.thumbAreaRect){
      return;
    }
    this.setState({offsetX: e.offsetX});
  },
  // thumbバーを操作中の処理
  _dragMove(e){

    if (!this.state.thumbAreaRect){
      return;
    }
    const  sheet = this.props.sheet;
    const nextLeft = (e.clientX - this.state.thumbAreaRect.left - this.state.offsetX);

    const scrollMax = this._getScrollMaxValue();
    // 移動可能領域の幅
    const moveAreaWidth = this.state.thumbAreaRect.width - this._thumWidth();
    const fullWidth = sheet.columnHeader.items.get(scrollMax).right;

    // １ピクセルあたりの倍率を求める
    const magnification = fullWidth / moveAreaWidth;
    // スクロールバー位置に対応するcanvas上のX座標を求める
    const canvasX = nextLeft * magnification + sheet.rowHeader.width;

    let columnNo = this.props.sheet.pointToColumnNo(canvasX);
    let maxNo = this._getScrollMaxValue();

    if (!columnNo){
      columnNo = (nextLeft < PADDING) ?
        1 :
        maxNo;
    }

    if (columnNo > maxNo){
      columnNo = maxNo;
    }

    this.props.onChangeValue(columnNo);
  },
  /**
   * thumbの幅
   * @return {[number]} [幅]
   */
  _thumWidth(){
    if(!this.state.thumbAreaRect){
      return THUMB_MIN_WIDTH;
    }
    const areaWidth = this.state.thumbAreaRect.width;
    const fullWidth = this.props.sheet.columnHeader.width;

    const magnification = fullWidth / areaWidth;
    const thumbWidth = areaWidth / magnification;

    if (thumbWidth < THUMB_MIN_WIDTH) {
      return THUMB_MIN_WIDTH;
    }

    return thumbWidth;
  },
  // thumbの左側の位置
  _thumLeft(){
    if(!this.state.thumbAreaRect){
      return PADDING;
    }

    const sheet = this.props.sheet;
    const scrollMax = this._getScrollMaxValue();

    const thumbWidth = this._thumWidth();
    // 移動可能領域の幅
    const moveAreaWidth = this.state.thumbAreaRect.width - thumbWidth;
    //const fullWidth = this.props.sheet.columnHeader.width;
    const fullWidth = sheet.columnHeader.items.get(scrollMax).right - sheet.rowHeader.width;

    // １ピクセルあたりの倍率を求める
    const magnification = fullWidth / moveAreaWidth;
    const scrollNo = this.props.opeModel.scroll.columnNo;
    const scrollCell = this.props.sheet.columnHeader.items.get(scrollNo);

    if (!scrollCell){
      return PADDING;
    }

    const left = Math.round((scrollCell.left - sheet.rowHeader.width) / magnification);
    return left;
  },
  // スクロールエリアでマウスを押したときの処理
  _onMouseDown(e){
    const thumbArea = ReactDOM.findDOMNode(this.refs.rgThumb);
    const areaRect = thumbArea.getBoundingClientRect();

    if (areaRect.right < e.clientX){
      const value = this.props.value + this.props.largeChange;
      this.props.onChangeValue(Math.min(value, this._getScrollMaxValue()));
    }

    if (areaRect.left > e.clientX){
      const value = this.props.value - this.props.largeChange;
      this.props.onChangeValue(Math.max(value, 1));
    }

  },
  render() {
    const style = this._createStyle();

    let thumbStyle = {
      left: this._thumLeft() + "px",
      top: "0",
      height: "calc(20px - 6px)",
      width: this._thumWidth() + "px"
    };

    return (
      <div className="rg-scroll-base" style={style}>
        <div className="rg-scroll-arrow"></div>
        <div className="rg-scroll-thumb-area" ref="rgThumbArea" onMouseDown={this._onMouseDown}>
          <div className="rg-scroll-thumb" ref="rgThumb" style={thumbStyle}></div>
        </div>
        <div className="rg-scroll-arrow"></div>
      </div>
    );
  }
});

export {
  Horizontalbar
};
