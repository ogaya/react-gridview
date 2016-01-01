//
// 横のスクロールバー
//

import * as React from "react";
import * as ReactDOM from "react-dom";

import Operation from "../../../model/operation";
import Sheet  from "../../../model/sheet";

// ライブラリ
import {drag} from "../../../util/drag";

// スタイルシート読み込み
import "./css.js";


const PADDING = 0;
//const SCROLL_UNIT = 5;

// thumbの最小幅
const THUMB_MIN_WIDTH = 30;

interface Props {
    className?: string;
    opeModel: Operation;
    sheet: Sheet;
    smallChange?: number;
    largeChange?: number;
    value?: number;
    onChangeValue?: (val?: any) => void;
}

interface State {
    offsetX: number;
    thumbAreaWidth: number;
}

export class Horizontalbar extends React.Component<Props, State> {
    displayName: string = "Horizontalbar";
    public static defaultProps = {
        smallChange: 1,
        largeChange: 5,
        onChangeValue: () => { },
        value: 0
    };
    state: State = {
        thumbAreaWidth: 0,
        offsetX: 0
    };

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this.refs["rgThumb"]);
        drag(node, (e)=>this._dragStart(e), (e)=>this._dragMove(e));
        window.addEventListener("resize", this._handleResize);
        this._handleResize();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._handleResize);
    }
    
    
    private _handleResize = () =>{
        const thumbArea = ReactDOM.findDOMNode(this.refs["rgThumbArea"]);
        const areaRect = thumbArea.getBoundingClientRect();
        //this.setState({thumbAreaWidth: areaRect.width});
        this.setState((prevState, props) => {
            prevState.thumbAreaWidth = areaRect.width;
            return prevState;
        });
    }
    // 全体のスタイルの生成
    private _createStyle(){
        let style: any = {
            position: "absolute"
        };

        style.bottom = "0px";
        style.left = "0px";
        style.width = "100%";
        style.overflowX = "hidden";
        style.overflowY = "hidden";
        return style;
    }
    private _getScrollMaxValue(){
        const sheet = this.props.sheet;
        const opeModel = this.props.opeModel;
        if ((!sheet) || (!opeModel)) {
            return 0;
        }

        const canvasRect = opeModel.canvasRect;
        if (!canvasRect) {
            return 0;
        }
        const tableWidth = canvasRect.width - sheet.rowHeader.width;
        let sumWidth = 0;
        let columnNo = 1;
        sheet.columnHeader.items.reverse().forEach((item, key) => {
            sumWidth = sumWidth + item.width;

            if (sumWidth > tableWidth) {
                return false;
            }
            columnNo = key;
        });

        return columnNo;
    }
    private _dragStart(e){
        //this.setState({offsetX: e.offsetX});
        this.setState((prevState, props) => {
            prevState.offsetX = e.offsetX as number;
            return prevState;
        });
    }
    // thumbバーを操作中の処理
    private _dragMove(e){

        const thumbArea = ReactDOM.findDOMNode(this.refs["rgThumbArea"]);
        const thumbAreaRect = thumbArea.getBoundingClientRect();

        const sheet = this.props.sheet;
        const nextLeft = (e.clientX - thumbAreaRect.left - this.state.offsetX);

        const scrollMax = this._getScrollMaxValue();
        // 移動可能領域の幅
        const moveAreaWidth = thumbAreaRect.width - this._thumWidth();
        const fullWidth = sheet.columnHeader.items.get(scrollMax).right;

        // １ピクセルあたりの倍率を求める
        const magnification = fullWidth / moveAreaWidth;
        // スクロールバー位置に対応するcanvas上のX座標を求める
        const canvasX = nextLeft * magnification + sheet.rowHeader.width;

        let columnNo = this.props.sheet.pointToColumnNo(canvasX);
        let maxNo = this._getScrollMaxValue();

        if (!columnNo) {
            columnNo = (nextLeft < PADDING) ?
                1 :
                maxNo;
        }

        if (columnNo > maxNo) {
            columnNo = maxNo;
        }

        this.props.onChangeValue(columnNo);
    }
    /**
     * thumbの幅
     * @return {[number]} [幅]
     */
    private _thumWidth(){
        if (!this.state) {
            return THUMB_MIN_WIDTH;
        }
        if (!this.state.thumbAreaWidth) {
            return THUMB_MIN_WIDTH;
        }
        const areaWidth = this.state.thumbAreaWidth;
        const fullWidth = this.props.sheet.columnHeader.width;

        const magnification = fullWidth / areaWidth;
        const thumbWidth = areaWidth / magnification;

        if (thumbWidth < THUMB_MIN_WIDTH) {
            return THUMB_MIN_WIDTH;
        }

        return thumbWidth;
    }
    // thumbの左側の位置
    private _thumLeft(){
        if (!this.state) {
            return PADDING;
        }
        if (!this.state.thumbAreaWidth) {
            return PADDING;
        }

        const sheet = this.props.sheet;
        const scrollMax = this._getScrollMaxValue();

        const thumbWidth = this._thumWidth();
        // 移動可能領域の幅
        const moveAreaWidth = this.state.thumbAreaWidth - thumbWidth;
        //const fullWidth = this.props.sheet.columnHeader.width;
        const fullWidth = sheet.columnHeader.items.get(scrollMax).right - sheet.rowHeader.width;

        // １ピクセルあたりの倍率を求める
        const magnification = fullWidth / moveAreaWidth;
        const scrollNo = this.props.opeModel.scroll.columnNo;
        const scrollCell = this.props.sheet.columnHeader.items.get(scrollNo);

        if (!scrollCell) {
            return PADDING;
        }

        const left = Math.round((scrollCell.left - sheet.rowHeader.width) / magnification);
        return left;
    }
    // スクロールエリアでマウスを押したときの処理
    private _onMouseDown(e){
        const thumbArea = ReactDOM.findDOMNode(this.refs["rgThumb"]);
        const areaRect = thumbArea.getBoundingClientRect();

        if (areaRect.right < e.clientX) {
            const value = this.props.value + this.props.largeChange;
            console.log(value);
            console.log(this.props.value);
            console.log(this.props.largeChange);
            this.props.onChangeValue(Math.min(value, this._getScrollMaxValue()));
        }

        if (areaRect.left > e.clientX) {
            const value = this.props.value - this.props.largeChange;
            this.props.onChangeValue(Math.max(value, 1));
        }

    }
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
                <div className="rg-scroll-thumb-area"
                    ref="rgThumbArea" onMouseDown={(e)=>this._onMouseDown(e)}>
                    <div className="rg-scroll-thumb" ref="rgThumb" style={thumbStyle}></div>
                </div>
                <div className="rg-scroll-arrow"></div>
            </div>
        );
    }
}
