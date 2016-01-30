import * as React from "react";
import * as ReactDOM from "react-dom";


import drawTable from "./controls/table";

import Sheet from "../../model/sheet";
import Canvas from "../../model/canvas";
import Operation from "../../model/operation";
import {Rect} from "../../model/common";

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

export interface TableCellsProps {
    sheet: Sheet;
    opeModel: Operation;
    onOperationChange: (ope: Operation) => void;
}


export class TableCells extends React.Component<TableCellsProps, {}> {
    //const TableCell = React.createClass({
    public static displayName = "Gridview-TableCell";

    _canvasRender(props) {
        const sheet = props.sheet;
        const opeModel = props.opeModel;
        const canvasElement: any = ReactDOM.findDOMNode(this.refs["gwcellshidden"]);
        const canvasWidth = canvasElement.offsetWidth;
        const canvasHeigh = canvasElement.offsetHeight;

        //console.log(window.devicePixelRatio);

        if ((canvasWidth === 0) || (canvasHeigh === 0)){
            return false;
        }
        if ((!opeModel.canvasRect) ||
            (opeModel.canvasRect.width !== canvasWidth) ||
            (opeModel.canvasRect.height !== canvasHeigh)) {
            const cRect = new Rect(0, 0, canvasWidth, canvasHeigh);
            props.onOperationChange(opeModel.setCanvasRect(cRect));
            return false;
        }

        if ((canvasHeigh === canvasElement.height) &&
            (canvasWidth === canvasElement.width) &&
            (this.props.opeModel.scroll.rowNo === props.opeModel.scroll.rowNo) &&
            (this.props.opeModel.scroll.columnNo === props.opeModel.scroll.columnNo) &&
            (this.props.sheet === props.sheet)) {
            return false;
        }

        const dpr = window.devicePixelRatio || 1;

        const mainElement: any = ReactDOM.findDOMNode(this.refs["gwcells"]);
        
        
        const width = canvasElement.width = mainElement.width = canvasWidth * dpr;
        const height = canvasElement.height = mainElement.height = canvasHeigh * dpr;
        const context:CanvasRenderingContext2D = canvasElement.getContext("2d");
        var scale = sheet.scale * dpr;
        
        context.scale(scale, scale);
        const canvas = new Canvas(context, width, height);
        drawTable(canvas, sheet, opeModel);
        
        const mainContext:CanvasRenderingContext2D = mainElement.getContext("2d");
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
