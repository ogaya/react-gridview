import * as React from "react";
import * as ReactDOM from "react-dom";


import drawOperation from "./controls/operation";
import Sheet from "../../model/sheet";
import Canvas from "../../model/canvas";
import Operation from "../../model/operation";

// スタイルシート読み込み
import "./css.js";


const style = {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    width: "100%",
    height: "100%",
    outline: "none"
};


interface Props {
    sheet: Sheet;
    opeModel: Operation;
    onViewModelChange?: (sheet: Sheet) => void;
    onOperationChange?: (ope: Operation) => void;
}

interface State {
}

export default class OperateDecoration extends React.Component<Props, State> {
    //const OperateDecoration = React.createClass({
    public static displayName = "Gridview-Operate-Decoration";
    _canvasRender(props) {
        const sheet = props.sheet;
        const opeModel = props.opeModel;
        const canvasElement: any = ReactDOM.findDOMNode(this.refs["gwcells"]);
        const canvasWidth = canvasElement.offsetWidth;
        const canvasHeigh = canvasElement.offsetHeight;

        if ((!opeModel.canvasRect) ||
            (opeModel.canvasRect.width !== canvasWidth) ||
            (opeModel.canvasRect.height !== canvasHeigh)) {
            return false;
        }


        const width = canvasElement.width = canvasWidth;
        const height = canvasElement.height = canvasHeigh;
        const context = canvasElement.getContext("2d");
        var scale = sheet.scale;
        context.scale(scale, scale);
        const canvas = new Canvas(context, width, height);

        drawOperation(canvas, sheet, props.opeModel);

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

//module.exports = OperateDecoration;
