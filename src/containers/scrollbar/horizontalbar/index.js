//
// 横のスクロールバー
//

import React from "react";
import OperationModel from "../../../model/operation";
import GridViewModel  from "../../../model/gridview";

// モデル
import {Point, Rect} from "../../../model/common";

// ライブラリ
import {drag} from "../../../util/drag";

// スタイルシート読み込み
import "./css.js";

const csStyle = Object.freeze({
  background: "#F00"
});

const PADDING = 0;
const SCROLL_UNIT = 5;

// thumbの最小幅
const THUMB_MIN_WIDTH = 30;

const Horizontalbar  = React.createClass({
  displayName: "Horizontalbar",
  propTypes: {
    className: React.PropTypes.string,
    opeModel: React.PropTypes.instanceOf(OperationModel),
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    smallChange: React.PropTypes.number,
    largeChange: React.PropTypes.number,
    value: React.PropTypes.number,
    onChangeValue: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      smallChange: 1,
      largeChange: 5,
      onChangeValue: (value)=>{}
    };
  },
  getInitialState() {
    return {
      thumbAreaRect: null,
    }
  },
  _handleResize(){
    const thumbArea = this.refs.rgThumbArea.getDOMNode();
    const areaRect = thumbArea.getBoundingClientRect();
    this.setState({thumbAreaRect: areaRect});
  },
  componentDidMount(){
    const node = this.refs.rgThumb.getDOMNode();
    drag(node, this._dragStart, this._dragMove);
    window.addEventListener('resize', this._handleResize);
    this._handleResize();
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },
  // 全体のスタイルの生成
  _createStyle(){
    let style = {
      position: "absolute"
    };

    style.bottom = "0px";
    style.left = "0px";
    style.width = "100%";
    //style.height = "25px";
    //style.background = "#0FF";
    style.overflowX = "hidden";
    style.overflowY = "hidden";
    return style;
  },
  componentWillReceiveProps(nextProps){
  },
  _dragStart(e){
  },
  _getScrollMaxValue(){
    const viewModel = this.props.viewModel;
    const opeModel = this.props.opeModel;
    if ((!viewModel) || (!opeModel)) {
      return 0;
    }

    const maxColumnCount = viewModel.columnHeader.maxCount;
    const fullWidth = this.props.viewModel.columnHeader.width;

    const canvasRect = opeModel.canvasRect;
    if (!canvasRect){
      return 0;
    }
    const tableWidth = canvasRect.width - viewModel.rowHeader.width;
    let sumWidth = 0;
    let columnNo = 1;
    viewModel.columnHeader.items.reverse().forEach((item, key)=>{
      sumWidth = sumWidth + item.width;

      if (sumWidth > tableWidth){
        return false;
      }
      columnNo = key;
    });

    return columnNo;
  },
  // thumbバーを操作中の処理
  _dragMove(e){

    if (!this.state.thumbAreaRect){
      return;
    }

    const nextLeft = (e.clientX - this.state.thumbAreaRect.left);
    // 移動可能領域の幅
    const moveAreaWidth = this.state.thumbAreaRect.width - this._thumWidth();
    const fullWidth = this.props.viewModel.columnHeader.width;

    // １ピクセルあたりの倍率を求める
    const magnification = fullWidth / moveAreaWidth;
    // スクロールバー位置に対応するcanvas上のX座標を求める
    const canvasX = nextLeft * magnification + 50;

    let columnNo = this.props.viewModel.pointToColumnNo(canvasX);
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
  // thumbの幅
  _thumWidth(){
    if(!this.state.thumbAreaRect){
      return THUMB_MIN_WIDTH;
    }
    const areaWidth = this.state.thumbAreaRect.width;
    const fullWidth = this.props.viewModel.columnHeader.width;

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

    const view = this.props.viewModel;
    const scrollMax = this._getScrollMaxValue();

    const thumbWidth = this._thumWidth();
    // 移動可能領域の幅
    const moveAreaWidth = this.state.thumbAreaRect.width - thumbWidth;
    //const fullWidth = this.props.viewModel.columnHeader.width;
    const fullWidth = view.columnHeader.items.get(scrollMax).right - view.rowHeader.width;

    // １ピクセルあたりの倍率を求める
    const magnification = fullWidth / moveAreaWidth;
    const scrollNo = this.props.opeModel.scroll.columnNo;
    const scrollCell = this.props.viewModel.columnHeader.items.get(scrollNo);

    if (!scrollCell){
      return PADDING;
    }

    const left = Math.round((scrollCell.left - view.rowHeader.width) / magnification);
    return left;
  },
  // スクロールエリアでマウスを押したときの処理
  _onMouseDown(e){
    const thumbArea = this.refs.rgThumb.getDOMNode();
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
