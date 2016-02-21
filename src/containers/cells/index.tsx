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

const w = window as any;

const requestAnimationFrame = 
    w.requestAnimationFrame || 
    w.mozRequestAnimationFrame ||
    w.webkitRequestAnimationFrame ||
    w.msRequestAnimationFrame;

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
    headerElement: any,
    prevSheet: Sheet,
    prevOpe: Operation
}

export default class Cells extends React.Component<CellsProps, CellsState> {
    public static displayName = "Gridview-Cells";
    constructor(props: CellsProps, context) {
        super(props, context);
        this.state = {
            tableElement: document.createElement("canvas"),
            opeElement: document.createElement("canvas"),
            headerElement: document.createElement("canvas"),
            prevSheet: null,
            prevOpe: null
        };
        
        this._unMounted = false;
        this._dpr = window.devicePixelRatio || 1;
    }
    
    private _unMounted: boolean;
    private _dpr: number;
    
    private _sheetRendered(){
        if (!this.state.prevOpe){
            return false;
        }
        
        if(this.state.prevOpe.canvasRect !== this.props.opeModel.canvasRect){
            return false;
        }
        if (this.state.prevOpe.scroll !== this.props.opeModel.scroll) {
            return false;
        }
            
        if (this.state.prevSheet !== this.props.sheet) {
            return false;
        }
        return true;
    }

    private _canRender(canvasElement: any,
        tableElement: any, opeElement: any, headerElement: any){
            
        const paneElement: any = ReactDOM.findDOMNode(this.refs["gwpane"]);

        if ((!paneElement) || (!tableElement) || (!opeElement) || (!headerElement)){
            return false;
        }
        const canvasWidth = paneElement.offsetWidth;
        const canvasHeigh = paneElement.offsetHeight;
        const opeModel = this.props.opeModel;
        if ((canvasWidth === 0) || (canvasHeigh === 0)){
            return false;
        }
        if ((!opeModel.canvasRect) ||
            (opeModel.canvasRect.width !== canvasWidth) ||
            (opeModel.canvasRect.height !== canvasHeigh)) {
            const cRect = new Rect(0, 0, canvasWidth, canvasHeigh);
            this.props.onOperationChange(opeModel.setCanvasRect(cRect));
            canvasElement.width = tableElement.width = 
                opeElement.width = headerElement.width = canvasWidth * this._dpr;
            canvasElement.height = tableElement.height =
                opeElement.height = headerElement.height = canvasHeigh * this._dpr;
        }

        return true;
    }
    private _tableRender(tableElement: any){
        const sheet = this.props.sheet;
        const opeModel = this.props.opeModel;
        if (this._sheetRendered()) {
            return;
        }

        const context:CanvasRenderingContext2D = tableElement.getContext("2d");
        var scale = sheet.scale * this._dpr;
        
        context.save();
        context.scale(scale, scale);
        context.clearRect(0, 0, tableElement.width, tableElement.height);

        const canvas = new Canvas(context, tableElement.width, tableElement.height);
        drawTable(canvas, sheet, opeModel);
        context.restore();
    }
    private _operationRender(operationElement: any){
        const sheet = this.props.sheet;
        const opeModel = this.props.opeModel;

        const context:CanvasRenderingContext2D = operationElement.getContext("2d");
        var scale = sheet.scale * this._dpr;
        
        context.save();
        context.scale(scale, scale);
        context.clearRect(0, 0, operationElement.width, operationElement.height);

        const canvas = new Canvas(context, operationElement.width, operationElement.height);
        drawOperation(canvas, sheet, opeModel);
        context.restore();
    }
    private _headerRender(headerElement: any){
        const sheet = this.props.sheet;
        const opeModel = this.props.opeModel;
        if (this._sheetRendered()) {
            return;
        }
        
        const context:CanvasRenderingContext2D = headerElement.getContext("2d");
        const scale = sheet.scale * this._dpr;

        context.save();
        context.scale(scale, scale);
        context.clearRect(0, 0, headerElement.width, headerElement.height);

        const canvas = new Canvas(context, headerElement.width, headerElement.height);
        drawCenterHeader(canvas, sheet.columnHeader, sheet.rowHeader);
        canvas.beginCache();
        drawColumnHeader(canvas, sheet.columnHeader, sheet.rowHeader, opeModel);
        drawRowHeader(canvas, sheet.columnHeader, sheet.rowHeader, opeModel);
        canvas.strockCache();

        context.restore();
    }
    _canvasRender() {
        const sheet = this.props.sheet;
        const opeModel = this.props.opeModel;
        const canvasElement: any = ReactDOM.findDOMNode(this.refs["gwcells"]);
        const tableElement: any = this.state.tableElement;
        const opeElement: any = this.state.opeElement;
        const headerElement: any = this.state.headerElement;

        if (!this._canRender(
                canvasElement, tableElement, opeElement, headerElement)){
            return;
        }
        
        if ((this.state.prevSheet === this.props.sheet) &&
            (this.state.prevOpe === this.props.opeModel)){
            return;
        }
        if (!opeModel.canvasRect){
            return;
        }

        this._tableRender(tableElement);
        this._operationRender(opeElement);
        this._headerRender(headerElement);
        
        const canvasContext:CanvasRenderingContext2D = canvasElement.getContext("2d");
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasContext.drawImage(tableElement, 0, 0);
        canvasContext.drawImage(opeElement, 0, 0);
        canvasContext.drawImage(headerElement, 0, 0);
        
        this.setState((prevState)=>{
            prevState.prevSheet = this.props.sheet;
            prevState.prevOpe = this.props.opeModel;
            return prevState;
        })
    }
    _handleResize = () => {
        this._canvasRender();
    }
    
    rendering = () =>{
        if (this._unMounted){
            return;
        }
        this._canvasRender();
        requestAnimationFrame(this.rendering);
    }

    componentDidMount() {
        window.addEventListener("resize", this._handleResize);
        this.rendering();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._handleResize);
        this._unMounted = true;
    }
    shouldComponentUpdate(nextProps) {
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

