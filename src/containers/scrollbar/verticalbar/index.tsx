//
// 縦のスクロールバー
//

import * as React from "react";
import * as ReactDOM from "react-dom";

import Operation from "../../../model/operation";
import Sheet  from "../../../model/sheet";

// モデル
//import {Point, Rect} from "../../../model/common";

// ライブラリ
import {drag} from "../../../util/drag";

// スタイルシート読み込み
import "./css.js";

const PADDING = 0;

// thumbの最小高さ
const THUMB_MIN_HEIGHT = 30;


interface Props {
    className?: string;
    opeModel: Operation;
    sheet: Sheet;
    smallChange?: number;
    largeChange?: number;
    value?: number;
    onChangeValue?: (value?: any) => void;
}

interface State {
    offsetY: number;
    thumbAreaHeight: number;
}

export class Verticalbar extends React.Component<Props, State> {
    public static displayName = "Verticalbar";
    public static defaultProps = {
        smallChange: 1,
        largeChange: 5,
        onChangeValue: () => { }
    };
    state: State = {
        thumbAreaHeight: 0,
        offsetY: 0
    };
    _handleResize = () => {
        const thumbArea = ReactDOM.findDOMNode(this.refs["rgThumbArea"]);
        const areaRect = thumbArea.getBoundingClientRect();
        //this.setState({thumbAreaHeight: areaRect.height});
        this.setState((prevState, props) => {
            prevState.thumbAreaHeight = areaRect.height;
            return prevState;
        })
    };
    componentDidMount() {
        const node = ReactDOM.findDOMNode(this.refs["rgThumb"]);
        drag(node, (e) => this._dragStart(e), (e) => this._dragMove(e));
        window.addEventListener("resize",  this._handleResize);
        this._handleResize();
    }
    componentWillUnmount() {
        window.removeEventListener("resize",  this._handleResize);
    }
    // スタイルの生成
    private _createStyle() {
        const style: any = {
            position: "absolute"
        };

        style.top = "0px";
        style.right = "0px";
        style.height = "100%";
        style.overflowX = "hidden";
        style.overflowY = "hidden";
        return style;
    }
    private _dragStart(e: MouseEvent) {
        //this.setState({offsetY: e.offsetY});
        this.setState((prevState, props) => {
            prevState.offsetY = e.offsetY;
            return prevState;
        });
    }
    private _getScrollMaxValue() {
        const sheet = this.props.sheet;
        const opeModel = this.props.opeModel;
        if ((!sheet) || (!opeModel)) {
            return 0;
        }

        const canvasRect = opeModel.canvasRect;
        if (!canvasRect) {
            return 0;
        }
        const tableHeight = canvasRect.height - sheet.columnHeader.height;
        let sumHeight = 0;
        let rowNo = 1;
        sheet.rowHeader.items.reverse().forEach((item, key) => {
            sumHeight = sumHeight + item.height;

            if (sumHeight > tableHeight) {
                return false;
            }
            rowNo = key;
        });

        return rowNo;
    }
    // thumbバーを操作中の処理
    private _dragMove(e) {
        const thumbArea = ReactDOM.findDOMNode(this.refs["rgThumbArea"]);
        if (!thumbArea) {
            return PADDING;
        }
        const thumbAreaRect = thumbArea.getBoundingClientRect();

        const nextTop = (e.clientY - thumbAreaRect.top - this.state.offsetY);

        const sheet = this.props.sheet;
        const scrollMax = this._getScrollMaxValue();

        // 移動可能領域の幅
        const moveAreaHeight = thumbAreaRect.height - this._thumHeight();
        const fullHeight = sheet.rowHeader.items.get(scrollMax).bottom;

        // １ピクセルあたりの倍率を求める
        const magnification = fullHeight / moveAreaHeight;
        // スクロールバー位置に対応するcanvas上のX座標を求める
        const canvasY = nextTop * magnification + 18;

        let rowNo = this.props.sheet.pointToRowNo(canvasY);
        let maxNo = this._getScrollMaxValue();

        if (!rowNo) {
            rowNo = (nextTop < PADDING) ?
                1 :
                maxNo;
        }

        if (rowNo > maxNo) {
            rowNo = maxNo;
        }

        this.props.onChangeValue(rowNo);
    }
  
    // thumbの幅
    private _thumHeight() {
        if (!this.state){
            return PADDING;
        }
        if (!this.state.thumbAreaHeight) {
            return PADDING;
        }

        const areaHeight = this.state.thumbAreaHeight;
        const fullHeight = this.props.sheet.rowHeader.height;

        const magnification = fullHeight / areaHeight;
        const thumbHeight = areaHeight / magnification;

        if (thumbHeight < THUMB_MIN_HEIGHT) {
            return THUMB_MIN_HEIGHT;
        }

        return thumbHeight;
    }
  
    // thumbの左側の位置
    private _thumTop() {
        if (!this.state){
            return PADDING;
        }
        if (!this.state.thumbAreaHeight) {
            return PADDING;
        }

        const sheet = this.props.sheet;
        const scrollMax = this._getScrollMaxValue();

        const thumbHeight = this._thumHeight();
        // 移動可能領域の幅
        const moveAreaHeight = this.state.thumbAreaHeight - thumbHeight;
        const fullHeight = sheet.rowHeader.items.get(scrollMax).bottom - sheet.columnHeader.height;

        // １ピクセルあたりの倍率を求める
        const magnification = fullHeight / moveAreaHeight;
        const scrollNo = this.props.opeModel.scroll.rowNo;
        const scrollCell = sheet.rowHeader.items.get(scrollNo);

        if (!scrollCell) {
            return PADDING;
        }

        const top = Math.round((scrollCell.top - sheet.columnHeader.height) / magnification);
        return top;
    }

    private _onMouseDown(e) {
        const thumbArea = ReactDOM.findDOMNode(this.refs["rgThumb"]);
        const areaRect = thumbArea.getBoundingClientRect();

        if (areaRect.bottom < e.clientY) {
            const value = this.props.value + this.props.largeChange;
            this.props.onChangeValue(Math.min(value, this._getScrollMaxValue()));
        }

        if (areaRect.top > e.clientY) {
            const value = this.props.value - this.props.largeChange;
            this.props.onChangeValue(Math.max(value, 1));
        }
    }
    render() {
        const style = this._createStyle();
        let thumbStyle = {
            left: "0",
            top: this._thumTop() + "px",
            height: this._thumHeight() + "px",
            width: "calc(20px - 6px)"
        };
        return (
            <div className="rg-scroll-vertical-base" style={style}>
                <div className="rg-scroll-vertical-thumb-area"
                    ref="rgThumbArea" onMouseDown={(e)=>this._onMouseDown(e)}>
                    <div className="rg-scroll-vertical-thumb" ref="rgThumb" style={thumbStyle}></div>
                </div>
            </div>
        );
    }
}