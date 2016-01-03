import * as React from "react";
import * as ReactDOM from "react-dom";


import drawColumnHeader from "./controls/column-header";
import drawRowHeader from "./controls/row-header";
import drawCenterHeader from "./controls/center-header";

import Sheet from "../../model/sheet";
import Canvas from "../../model/canvas";
import Operation from "../../model/operation";

// スタイルシート読み込み
//import "./css.js";

const style = {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    width: "100%",
    height: "100%",
    outline: "none"
};


export interface HeaderProps {
    sheet: Sheet;
    opeModel: Operation;
    onOperationChange?: (ope: Operation) => void;
}

export class Header extends React.Component<HeaderProps, {}> {
    //const Header = React.createClass({
    public static displayName = "Gridview-TableCell";

    _canvasRender(props) {
        const sheet = props.sheet;
        const opeModel = props.opeModel;
        const canvasElement: any = ReactDOM.findDOMNode(this.refs["gwcells"]);
        const canvasWidth = canvasElement.offsetWidth;
        const canvasHeigh = canvasElement.offsetHeight;

        if ((canvasHeigh === canvasElement.height) &&
            (canvasWidth === canvasElement.width) &&
            (this.props.opeModel.scroll.rowNo === props.opeModel.scroll.rowNo) &&
            (this.props.opeModel.scroll.columnNo === props.opeModel.scroll.columnNo) &&
            (this.props.sheet === props.sheet)) {

            return false;
        }

        const width = canvasElement.width = canvasWidth;
        const height = canvasElement.height = canvasHeigh;
        const context = canvasElement.getContext("2d");
        var scale = sheet.scale;
        context.scale(scale, scale);
        const canvas = new Canvas(context, width, height);


        drawCenterHeader(canvas, sheet.columnHeader, sheet.rowHeader);
        drawColumnHeader(canvas, sheet.columnHeader, sheet.rowHeader, opeModel);
        drawRowHeader(canvas, sheet.columnHeader, sheet.rowHeader, opeModel);

        return false;
    }

    _handleResize = () => {
        this._canvasRender(this.props);
    }

    componentDidMount() {
        window.addEventListener("resize", this._handleResize);
        this._canvasRender(this.props);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._handleResize);
    }
    shouldComponentUpdate(nextProps) {
        this._canvasRender(nextProps);
        return false;
    }

    render() {
        return (
            <canvas className="gw-cells" ref="gwcells" style={style}/>
        );
    }
}

//module.exports = Header;
