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
const styleHidden = {
    visibility: "hidden",
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
        const canvasElement: any = ReactDOM.findDOMNode(this.refs["gwcellshidden"]);
        const canvasWidth = canvasElement.offsetWidth;
        const canvasHeigh = canvasElement.offsetHeight;

        if ((canvasWidth === 0) || (canvasHeigh === 0)){
            return false;
        }
        if ((canvasHeigh === canvasElement.height) &&
            (canvasWidth === canvasElement.width) &&
            (this.props.opeModel.scroll.rowNo === props.opeModel.scroll.rowNo) &&
            (this.props.opeModel.scroll.columnNo === props.opeModel.scroll.columnNo) &&
            (this.props.sheet === props.sheet)) {

            return false;
        }

        const mainElement: any = ReactDOM.findDOMNode(this.refs["gwcells"]);

        const width = canvasElement.width = mainElement.width = canvasWidth;
        const height = canvasElement.height = mainElement.height = canvasHeigh;
        const context = canvasElement.getContext("2d");
        var scale = sheet.scale;
        context.scale(scale, scale);
        const canvas = new Canvas(context, width, height);

        drawCenterHeader(canvas, sheet.columnHeader, sheet.rowHeader);
        drawColumnHeader(canvas, sheet.columnHeader, sheet.rowHeader, opeModel);
        drawRowHeader(canvas, sheet.columnHeader, sheet.rowHeader, opeModel);

        const mainContext: CanvasRenderingContext2D = mainElement.getContext("2d");
        mainContext.drawImage(canvasElement, 0, 0);

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
            <div style={style}>
                <canvas className="gw-cells" ref="gwcellshidden" style={styleHidden}/>
                <canvas className="gw-cells" ref="gwcells" style={style}/>
            </div>
        );
    }
}

//module.exports = Header;