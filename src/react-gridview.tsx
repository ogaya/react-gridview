import * as React from "react";
import * as ReactDOM from "react-dom";

import Cells from "./containers/cells";
import ExNodes from "./containers/exnodes";
import Stickies from "./containers/stickies";
import Inputer from "./containers/inputer";

import {KeyPressble, IKeyPress} from "./mixins/key-pressble";

import Sheet from "./model/sheet";
import Operation from "./model/operation";
import Extension from "./model/extension";
import Sticky from "./model/sheet/sticky";
import Border from "./model/sheet/border";

import {OBJECT_TYPE} from "./model/sheet/object-type";
import {GridViewBar} from "./containers/scrollbar";
import {VERTICAL_ALIGN, TEXT_ALIGN, BORDER_POSITION, CellPoint} from "./model/common";
import {drag} from "./util/drag";

import {Point} from "./model/common";
import {operationResult} from "./model/lib/change";
import {pointToGridViewItem} from "./model/lib/select";
import {modelToRangeItem} from "./model/common/cell-range";
import {fitForTarget} from "./model/lib/fit-for-target";

import {applyMixins} from "./util/apply-mixins";


// スタイルシート読み込み
import "./css.js";


/**
 * ドラッグ時にスクロールする処理
 * @param  {Sheet} sheet 表示情報
 * @param  {Operation} opeModel  操作情報
 * @return {CellPoint}           スクロール場所
 */
function dragScroll(sheet, opeModel) {
    const opeItem = opeModel.opeItem;
    const hoverItem = opeModel.hoverItem;

    // 操作中オブジェクトがセルで無い場合、範囲選択しない
    if ((!opeItem) || (opeItem.objectType !== OBJECT_TYPE.CELL)) {
        return opeModel.scroll;
    }
    // ホバーアイテムがセルで無い場合、前回の範囲選択情報のままとする。
    if ((!hoverItem) || (hoverItem.objectType !== OBJECT_TYPE.CELL)) {
        return opeModel.scroll;
    }

    return fitForTarget(sheet, opeModel, hoverItem.cellPoint);
}

export interface IGridViewProps {
    className?: string;
    key?: any;
    ref?: any;
    sheet?: Sheet;
    operation?: Operation;
    extension?: Extension;
    onChangeSheet?: (prevSheet: Sheet, nextSheet: Sheet) => Sheet;
    onChangeOperation?: (prevOpe: Operation, nextOpe: Operation) => Operation;
}

export interface IGridViewState {
    sheet: Sheet;
    operation: Operation;
}

export class GridView extends React.Component<IGridViewProps, IGridViewState> implements KeyPressble {
    public static displayName = "gridview";
    public static defaultProps = {
        sheet: new Sheet(),
        operation: new Operation(),
        extension: new Extension(),
        onChangeSheet: (prevView, nextView) => { return nextView; },
        onChangeOperation: (prevVOperation, nextOperation) => { return nextOperation; }
    }

    constructor(props: IGridViewProps, context) {
        super(props, context);
        this.state = {
            sheet: this.props.sheet,
            operation: this.props.operation
        };
        
        this._isTouched = false;
        this._tColumnNo = 0;
        this._tRowNo = 0;
        this._unmounted = false;
    }

    _keyPress: IKeyPress;
    _addKeyPressEvent: () => void;
    _removeKeyPressEvent: () => void;
    
    _isTouched:boolean;
    _tColumnNo: number;
    _tRowNo: number;
    _unmounted: boolean;

    componentWillReceiveProps(nextProps: IGridViewProps) {
        this.setState((prevState, props) => {
            if (this.props.sheet !== nextProps.sheet) {
                prevState.sheet = nextProps.sheet;
            }
            if (this.props.operation !== nextProps.operation) {
                prevState.operation = nextProps.operation;
            }
            return prevState;
        });
    }

    /**
    * マウスホイール処理
    * @param  {Object} e イベント引数
    */
    _onMouseWheel = (e) => {
        const opeModel = this.state.operation;
        let value = opeModel.scroll.rowNo + Math.round(e.deltaY / 100) * 3;

        if (value < 1) {
            value = 1;
        }

        if (opeModel.scroll.rowNo !== value) {
            this._isTouched = true;
            this._tColumnNo = opeModel.scroll.columnNo;
            this._tRowNo = value;
        }
        e.preventDefault();
    }
    _onContextMenu = (e) => {
        e.preventDefault();
    }
    /**
     * マウスアップ処理
     */
    _onMouseUp = () => {
        const opeModel = this.state.operation;
        const sheet = this.state.sheet;
        const nextSheet = operationResult(sheet, opeModel);

        if (sheet !== nextSheet) {
            this._onViewModelChange(nextSheet);
        }
        const ope = opeModel.setOpeItem(null);
        this._onOperationChange(ope);
    }
    /**
     * マウスダウン処理
     *   マウスの下にあるオブジェクトを検出し、選択処理等を行う
     * @param  {Object} e イベント引数
     */
    _onMouseDown = (e) => {

        // 右クリック時、何もしない
        if (e.button === 2) {
            return;
        }
        const sheet = this.state.sheet;
        const opeModel = this.state.operation;

        // テーブル上の座標を取得
        const point = new Point(e.offsetX / sheet.scale, e.offsetY / sheet.scale);

        const item = pointToGridViewItem(sheet, opeModel, point, false);

        let ope = opeModel
            .setSelectItem(item)
            .setOpeItem(item);

        if (this._keyPress.ctrl) {
            ope = ope.pushClipRanges(ope.rangeItem);
        }
        else {
            ope = ope.clearClipRanges();
        }

        ope = ope.setRangeItem(null);

        const rangeItem = modelToRangeItem(sheet, ope);
        const input = ope.input.setIsInputing(false);
        this._onOperationChange(ope.setRangeItem(rangeItem).setInput(input));
    }

    _onMouseMove = (e) => {
        const node = ReactDOM.findDOMNode(this.refs["gwcells"]);
        const sheet = this.state.sheet;
        const opeModel = this.state.operation;

        const rect = node.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // テーブル上の座標を取得
        const point = new Point(x / sheet.scale, y / sheet.scale);

        const item = pointToGridViewItem(sheet, opeModel, point, true);
        const ope = opeModel.setHoverItem(item);
        const scroll = dragScroll(sheet, ope);
        const rangeItem = modelToRangeItem(sheet, ope);

        this._onOperationChange(ope.setRangeItem(rangeItem).setScroll(scroll));
    }

    _startOperation: Operation;
    _startToucheClientX: number;
    _startToucheClientY: number;
    _startToucheIdentifier: number;


    _touchDecided  = () => {
        if (this._unmounted){
            return;
        }
        if (!this._isTouched){
            requestAnimationFrame(this._touchDecided);
            return;
        }
        const operation = this.state.operation;
        const columnNo = this._tColumnNo;
        const rowNo = this._tRowNo;
        if ((operation.scroll.columnNo === columnNo) &&
            (operation.scroll.rowNo === rowNo)){
            this._isTouched = false;
            requestAnimationFrame(this._touchDecided);
            return;
        }

        const scroll = operation.scroll
            .setColumnNo(columnNo)
            .setRowNo(rowNo);
        this._onOperationChange(operation.setScroll(scroll));
        
        this._isTouched = false;
        requestAnimationFrame(this._touchDecided);
    }
    
    _onTouchStart = (e:React.TouchEvent) => {
        this._startToucheClientX = e.touches[0].clientX;
        this._startToucheClientY = e.touches[0].clientY;
        this._startToucheIdentifier = e.touches[0].identifier;
        this._startOperation = this.state.operation;
        
    }
    _onTouchMove = (e:React.TouchEvent) => {

        e.preventDefault();
        if (e.touches.length < 1) {
            return;
        }

        const touch = e.touches[0];

        if (this._startToucheIdentifier  !== touch.identifier) {
            return;
        }

        const sheet = this.state.sheet;
        const operation = this.state.operation;

        const diffX = this._startToucheClientX - touch.clientX + sheet.rowHeader.width;
        const diffY = this._startToucheClientY - touch.clientY + sheet.columnHeader.height;

        
        const top = sheet.rowHeader.items.get(this._startOperation.scroll.rowNo).top;
        const left = sheet.columnHeader.items.get(this._startOperation.scroll.columnNo).left;

        let columnNo = sheet.pointToColumnNo(left + diffX / sheet.scale);
        let rowNo = sheet.pointToRowNo(top + diffY / sheet.scale);

        if (rowNo < 1) {
            rowNo = 1;
        }

        if (columnNo < 1) {
            columnNo = 1;
        }

        this._isTouched = true;
        this._tColumnNo = columnNo;
        this._tRowNo = rowNo;
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this.refs["gwcells"]);
        drag(node, this._onMouseDown, this._onMouseMove, this._onMouseUp);
        this._addKeyPressEvent();
        this._touchDecided();
    }

    componentWillUnmount() {
        this._removeKeyPressEvent();
        this._unmounted = true;
    }

    _onValueChange = (cellPoint, value) => {
        const sheet = this.state.sheet
            .setValue(cellPoint, value);
        this._onViewModelChange(sheet);
    }
    _onViewModelChange = (sheet) => {
        const prevSheet = this.state.sheet;
        const nextSheet = this.props.onChangeSheet(prevSheet, sheet);
        if (prevSheet === nextSheet) {
            return;
        }
        this.setState((prevState, props) => {
            prevState.sheet = nextSheet;
            return prevState;
        });
    }
    _onOperationChange = (ope) => {
        const nextOpe = this.props.onChangeOperation(this.state.operation, ope);
        if (this.state.operation === nextOpe) {
            return;
        }
        this.setState((prevState, props) => {
            prevState.operation = nextOpe;
            return prevState;
        });
    }
    _onStateChange = (sheet, operation) => {
        this._onViewModelChange(sheet);
        this._onOperationChange(operation);
    }
    render() {
        const sheet = this.state.sheet;
        const operation = this.state.operation;
        const cellStyle = {
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 2,
            background: "#FFF",
            cursor: operation.hoverCursor
        };
        let className = "react-sheet";
        if (this.props.className) {
            className = className + " " + this.props.className;
        }

        return (
            <div className={className} ref="gridview"
                onWheel={this._onMouseWheel} onContextMenu={this._onContextMenu}>
                <div style={cellStyle} ref="gwcells"  onMouseMove={this._onMouseMove} onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove}>
                    <Cells onOperationChange={this._onOperationChange}
                        sheet={sheet} opeModel={operation}/>

                    <ExNodes sheet={sheet} operation={operation} extension={this.props.extension} />
                    <Stickies sheet={sheet} operation={operation} extension={this.props.extension} />
                </div>

                <Inputer ref="inputer" opeModel={operation} sheet={sheet}
                    onValueChange={this._onValueChange} onStateChange={this._onStateChange}/>
                <GridViewBar sheet={sheet} opeModel={operation} onOperationChange={this._onOperationChange}/>
            </div>
        );
    }
}

applyMixins(GridView, [KeyPressble]);
