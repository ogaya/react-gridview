import * as React from "react";
import Operation from "../../model/operation";
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

export interface GridViewBarProps {
    opeModel: Operation;
    sheet: Sheet;
    onOperationChange: (value?) => void;
}

export interface GridViewBarState {
    offsetY: number;
    thumbAreaHeight: number;
}

export class GridViewBar extends React.Component<GridViewBarProps, GridViewBarState> {
    //const GridViewBar  = React.createClass({
    public static displayName = "GridViewBar";
    public static defaultProps = {
        isVertical: false
    };

    _onHorizontalScroll(value) {
        // const point = Math.floor(e.target.scrollLeft / 100);
        const opeModel = this.props.opeModel;
        if (opeModel.scroll.columnNo === value) {
            return;
        }
        const scroll = opeModel.scroll.setColumnNo(value);
        this.props.onOperationChange(opeModel.setScroll(scroll));
    }

    _onVerticalScroll(value) {
        // const point = Math.floor(e.target.scrollLeft / 100);

        const opeModel = this.props.opeModel;
        if (opeModel.scroll.rowNo === value) {
            return;
        }
        const scroll = opeModel.scroll.setRowNo(value);
        this.props.onOperationChange(opeModel.setScroll(scroll));
    }

    _hSpaceStyle() {
        const sheet = this.props.sheet;
        return {
            left: "0px",
            bottom: "0px",
            position: "absolute",
            background: sheet.rowHeader.background,
            borderTop: "1px solid #999",
            borderRight: "1px solid #999",
            height: "20px",
            boxSizing: "border-box",
            width: (sheet.rowHeader.width * sheet.scale + 1) + "px"
        };
    }

    _vSpaceStyle() {
        const sheet = this.props.sheet;
        return {
            right: "0px",
            top: "0px",
            position: "absolute",
            borderLeft: "1px solid #999",
            borderBottom: "1px solid #999",
            background: sheet.columnHeader.background,
            height: (sheet.columnHeader.height * sheet.scale + 1)+ "px",
            boxSizing: "border-box",
            width: "20px"
        };
    }
    render() {
        const sheet = this.props.sheet;
        const scroll = this.props.opeModel.scroll;
        const rowNo = scroll.rowNo;
        const columnNo = scroll.columnNo;
        const scale = sheet.scale;
        const hStyle = {
            left: sheet.rowHeader.width * scale + "px",
            width: "calc(100% - " + (sheet.rowHeader.width * scale + 20) + "px)"
        };

        const vStyle = {
            top: sheet.columnHeader.height * scale + "px",
            height: "calc(100% - " + (sheet.columnHeader.height * scale + 20) + "px)"
        };

        return (
            <div>
                <div className="gw-horizontal-position" style={hStyle}>
                    <Horizontalbar sheet={this.props.sheet} opeModel={this.props.opeModel}
                    onChangeValue={(v)=>this._onHorizontalScroll(v)} value={columnNo}/>
                </div>
                <div style={this._hSpaceStyle() }></div>
                <div className="gw-vertical-position" style={vStyle}>
                    <Verticalbar sheet={this.props.sheet} opeModel={this.props.opeModel}
                        onChangeValue={(v)=>this._onVerticalScroll(v)} value={rowNo}/>
                </div>
                <div style={this._vSpaceStyle() }></div>
                <div className="gw-center-position" style={cStyle}/>
            </div>
        );
    }
}