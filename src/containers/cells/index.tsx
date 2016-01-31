import * as React from "react";
import * as ReactDOM from "react-dom";

import Sheet from "../../model/sheet";
import Operation from "../../model/operation";

import {Rect} from "../../model/common";

import Canvas from "../../model/canvas";
import drawTable from "./controls/table";
import drawOperation from "./controls/operation";
import drawColumnHeader from "./controls/column-header";
import drawRowHeader from "./controls/row-header";
import drawCenterHeader from "./controls/center-header";


// スタイルシート読み込み
import "./css.js";

const style = {
    position: "absolute",
    top: "0px",
    bottom: "0px",
    width: "100%",
    height: "100%",
    cursor: "pointer",
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

export interface CellsProps {
    sheet: Sheet;
    opeModel: Operation;
    onOperationChange: (ope: Operation) => void;
}

export interface CellsState {
    tableElement: any,
    opeElement: any,
    headerElement: any
}

export default class Cells extends React.Component<CellsProps, CellsState> {
    public static displayName = "Gridview-Cells";
    constructor(props: CellsProps, context) {
        super(props, context);
        this.state = {
            tableElement: document.createElement("canvas"),
            opeElement: document.createElement("canvas"),
            headerElement: document.createElement("canvas")
        };
    }

    private _canRender(canvasElement: any,
        tableElement: any, opeElement: any, headerElement: any, props:CellsProps){
            
        const paneElement: any = ReactDOM.findDOMNode(this.refs["gwpane"]);

        if ((!paneElement) || (!tableElement) || (!opeElement) || (!headerElement)){
            return false;
        }
        const canvasWidth = paneElement.offsetWidth;
        const canvasHeigh = paneElement.offsetHeight;
        const opeModel = props.opeModel;
        if ((canvasWidth === 0) || (canvasHeigh === 0)){
            return false;
        }
        if ((!opeModel.canvasRect) ||
            (opeModel.canvasRect.width !== canvasWidth) ||
            (opeModel.canvasRect.height !== canvasHeigh)) {
            const cRect = new Rect(0, 0, canvasWidth, canvasHeigh);
            props.onOperationChange(opeModel.setCanvasRect(cRect));
            const dpr = window.devicePixelRatio || 1;
            canvasElement.width = tableElement.width = 
                opeElement.width = headerElement.width = canvasWidth * dpr;
            canvasElement.height = tableElement.height =
                opeElement.height = headerElement.height = canvasHeigh * dpr;
            return false;
        }

        return true;
    }
    private _tableRender(tableElement: any, props:CellsProps, isForce:boolean){
        const sheet = props.sheet;
        const opeModel = props.opeModel;
        if ((!isForce) &&
            (this.props.opeModel.scroll.rowNo === props.opeModel.scroll.rowNo) &&
            (this.props.opeModel.scroll.columnNo === props.opeModel.scroll.columnNo) &&
            (this.props.sheet === props.sheet)) {
            return;
        }
        

        const dpr = window.devicePixelRatio || 1;
        const context:CanvasRenderingContext2D = tableElement.getContext("2d");
        var scale = sheet.scale * dpr;
        
        context.save();
        context.scale(scale, scale);
        context.clearRect(0, 0, tableElement.width, tableElement.height);

        const canvas = new Canvas(context, tableElement.width, tableElement.height);
        drawTable(canvas, sheet, opeModel);
        context.restore();
    }
    private _operationRender(operationElement: any, props:CellsProps){
        const sheet = props.sheet;
        const opeModel = props.opeModel;

        const dpr = window.devicePixelRatio || 1;
        const context:CanvasRenderingContext2D = operationElement.getContext("2d");
        var scale = sheet.scale * dpr;
        
        context.save();
        context.scale(scale, scale);
        context.clearRect(0, 0, operationElement.width, operationElement.height);

        const canvas = new Canvas(context, operationElement.width, operationElement.height);
        drawOperation(canvas, sheet, opeModel);
        context.restore();
    }
    private _headerRender(headerElement: any, props:CellsProps, isForce:boolean){
        const sheet = props.sheet;
        const opeModel = props.opeModel;
        if ((!isForce) &&
            (this.props.opeModel.scroll.rowNo === props.opeModel.scroll.rowNo) &&
            (this.props.opeModel.scroll.columnNo === props.opeModel.scroll.columnNo) &&
            (this.props.sheet === props.sheet)) {
            return;
        }
        

        const dpr = window.devicePixelRatio || 1;

        const context:CanvasRenderingContext2D = headerElement.getContext("2d");
        var scale = sheet.scale * dpr;
        
        context.save();
        context.scale(scale, scale);
        context.clearRect(0, 0, headerElement.width, headerElement.height);

        const canvas = new Canvas(context, headerElement.width, headerElement.height);
        drawCenterHeader(canvas, sheet.columnHeader, sheet.rowHeader);
        drawColumnHeader(canvas, sheet.columnHeader, sheet.rowHeader, opeModel);
        drawRowHeader(canvas, sheet.columnHeader, sheet.rowHeader, opeModel);

        context.restore();
    }
    _canvasRender(props:CellsProps, isForce:boolean) {
        const sheet = props.sheet;
        const opeModel = props.opeModel;
        const canvasElement: any = ReactDOM.findDOMNode(this.refs["gwcells"]);
        const tableElement: any = this.state.tableElement;
        const opeElement: any = this.state.opeElement;
        const headerElement: any = this.state.headerElement;

        if ((!this._canRender(
                canvasElement, tableElement, opeElement, headerElement, props)) &&
            (!isForce)){
            return;
        }
        this._tableRender(tableElement, props, isForce);
        this._operationRender(opeElement, props);
        this._headerRender(headerElement, props, isForce);
        
        const canvasContext:CanvasRenderingContext2D = canvasElement.getContext("2d");
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasContext.drawImage(tableElement, 0, 0);
        canvasContext.drawImage(opeElement, 0, 0);
        canvasContext.drawImage(headerElement, 0, 0);
    }
    _handleResize = () => {
        this._canvasRender(this.props, true);
    }

    componentDidMount() {
        window.addEventListener("resize", this._handleResize);
        this._canvasRender(this.props, true);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._handleResize);
    }
    shouldComponentUpdate(nextProps) {
        this._canvasRender(nextProps, false);
        return false;
    }
    render() {
        return (
            <div style={style} ref="gwpane">
                <canvas className="gw-cells" ref="gwcells" style={style}/>
            </div>
        );
    }
}

