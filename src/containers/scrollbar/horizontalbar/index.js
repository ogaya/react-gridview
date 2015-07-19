import React from "react";
import OperationModel from "../../../model/operation";

// モデル
import {Point, Rect} from "../../../model/common";

// ライブラリ
import {drag} from "../../../util/drag";

// スタイルシート読み込み
import "./css.js";

const csStyle = Object.freeze({
  background: "#F00"
});

const PADDING = 2;
const SCROLL_UNIT = 10;

const Horizontalbar  = React.createClass({
  displayName: "Horizontalbar",
  propTypes: {
    className: React.PropTypes.string,
    maxNum: React.PropTypes.number,
    minNum: React.PropTypes.number,
    smallChange: React.PropTypes.number,
    largeChange: React.PropTypes.number,
    value: React.PropTypes.number,
    onChangeValue: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      maxNum: 100,
      minNum: 0,
      smallChange: 1,
      largeChange: 5,
      onChangeValue: (value)=>{}
    };
  },
  getInitialState() {
    return {
      location: new Rect(PADDING, 0, 60, 0),
      startPoint: null,
      startRect: null,
    }
  },
  // スタイルの生成
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
    const value = nextProps.value;
    const left =  PADDING + (value - nextProps.minNum) * SCROLL_UNIT / nextProps.smallChange ;
    const location = this.state.location.setLeft(left);

    this.setState({location: location});
  },
  _dragStart(e){

    this.setState({
      startPoint: new Point(e.clientX, e.clientY),
      startRect: this.state.location
    });
  },
  // thumbバーを操作中の処理
  _dragMove(e){

    // 移動量に応じてスクロールバーを移動させる
    const point = new Point(e.clientX, e.clientY);
    const nextLeft = this.state.startRect.left + (point.x - this.state.startPoint.x);


    const thumbArea = this.refs.rgThumbArea.getDOMNode();
    const areaRect = thumbArea.getBoundingClientRect();

    const thumbWidth = areaRect.width - this._subNum();
    let location = this.state.startRect.setLeft(nextLeft).setWidth(thumbWidth);

    if (areaRect.width - PADDING < location.right){
      location = location.setLeft(areaRect.width -PADDING - location.width);
    }

    if (location.left < PADDING){
      location = location.setLeft(PADDING);
    }

    //this.setState({location: location});
    const subValue = Math.round((location.left - PADDING) / SCROLL_UNIT);
    const value = this.props.minNum + subValue * this.props.smallChange;
    this.props.onChangeValue(value);
  },
  componentDidMount(){
    const node = this.refs.rgThumb.getDOMNode();
    drag(node, this._dragStart, this._dragMove);
  },

  _subNum(){
    // const thumbArea = this.refs.rgThumbArea.getDOMNode();
    // const areaRect = thumbArea.getBoundingClientRect();

    // const baseWidth = areaRect.width - PADDING * 2;
    let subNum = (this.props.maxNum - this.props.minNum);
    if (subNum < 0) {
      subNum = 0;
    }

    return PADDING * 2 + subNum * this.props.smallChange * SCROLL_UNIT;
  },
  render() {
    const style = this._createStyle();
    let thumbStyle = this.state.location.style;
    thumbStyle.height = "calc(100% - 6px)";
    thumbStyle.width = "calc(100% - " + this._subNum() + "px)";
    return (
      <div className="rg-scroll-base" style={style}>
        <div className="rg-scroll-arrow"></div>
        <div className="rg-scroll-thumb-area" ref="rgThumbArea">
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
