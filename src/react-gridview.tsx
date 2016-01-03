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
 * @param  {View} sheet 表示情報
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

export interface GridViewProps {
    className: string;
    key?: any;
    ref?: any;
    sheet: Sheet;
    operation: Operation;
    extension: Extension;
    onChangeSheet: (prevSheet: Sheet, nextSheet: Sheet) => Sheet;
    onChangeOperation: (prevOpe: Operation, nextOpe: Operation) => Operation;
}

export interface GridViewState {
    sheet: Sheet;
    operation: Operation;
}

export class GridView extends React.Component<GridViewProps, GridViewState> implements KeyPressble {
    //const GridView = React.createClass({
    public static displayName = "gridview";
    //mixins: [KeyPress, MouseEvent, TouchEvent],
  
    public static defaultProps = {
        sheet: new Sheet(),
        operation: new Operation(),
        extension: new Extension(),
        onChangeSheet: (prevView, nextView) => { return nextView; },
        onChangeOperation: (prevVOperation, nextOperation) => { return nextOperation; }
    }

    constructor(props: GridViewProps, context) {
        super(props, context);

        this.state = {
            sheet: this.props.sheet,
            operation: this.props.operation
        };
    }

    _keyPress: IKeyPress;
    _addKeyPressEvent: () => void;
    _removeKeyPressEvent: () => void;
  
    //   getInitialState() {
    //     return {
    //       sheet: this.props.sheet,
    //       operation: this.props.operation
    //     };
    //   },
    componentWillReceiveProps(nextProps: GridViewProps) {
        if (this.props.sheet !== nextProps.sheet) {
            //this.setState({sheet: nextProps.sheet});
            this.setState((prevState, props) => {
                prevState.sheet = nextProps.sheet;
                return prevState;
            });
        }
        if (this.props.operation !== nextProps.operation) {
            //this.setState({operation: nextProps.operation});
            this.setState((prevState, props) => {
                prevState.operation = nextProps.operation;
                return prevState;
            });
        }
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
            const scroll = opeModel.scroll.setRowNo(value);
            this._onOperationChange(opeModel.setScroll(scroll));
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
        const newViewModel = operationResult(sheet, opeModel);

        if (sheet !== newViewModel) {
            this._onViewModelChange(newViewModel);
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
        this.setInputFocus();

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
    _startTouches: any;

    _onTouchStart = (e) => {
        this._startTouches = e.touches;
        this._startOperation = this.state.operation;
    }
    _onTouchMove = (e) => {

        e.preventDefault();
        if (e.touches.length < 1) {
            return;
        }

        const touch = e.touches[0];
        const startTouch = this._startTouches[0];

        if (startTouch.identifier !== touch.identifier) {
            return;
        }

        const sheet = this.state.sheet;
        const operation = this.state.operation;

        const diffX = startTouch.clientX - touch.clientX + sheet.rowHeader.width;
        const diffY = startTouch.clientY - touch.clientY + sheet.columnHeader.height;

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
        const scroll = operation.scroll
            .setColumnNo(columnNo)
            .setRowNo(rowNo);
        this._onOperationChange(operation.setScroll(scroll));
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this.refs["gwcells"]);
        drag(node, this._onMouseDown, this._onMouseMove, this._onMouseUp);
        //drag(node, this._onTouchStart, this._onTouchMove, this._onTouchEnd);
        this._addKeyPressEvent();
    }

    componentWillUnmount() {
        this._removeKeyPressEvent();
    }

    setInputFocus() {
        const inputer = this.refs["inputer"] as Inputer;
        inputer.setInputFocus();
    }

    _onValueChange = (cellPoint, value) => {

        const sheet = this.state.sheet
            .setValue(cellPoint, value);

        this._onViewModelChange(sheet);
    }
    _onViewModelChange = (sheet) => {
        const nextView = this.props.onChangeSheet(this.state.sheet, sheet);
        if (this.state.sheet === nextView) {
            return;
        }
        //this.setState({sheet: nextView});
        this.setState((prevState, props) => {
            prevState.sheet = nextView;
            return prevState;
        });
    }
    _onOperationChange = (ope) => {
        const nextOpe = this.props.onChangeOperation(this.state.operation, ope);
        if (this.state.operation === nextOpe) {
            return;
        }
        //this.setState({operation: nextOpe});
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
            cursor: operation.HoverCursor
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
                        model={sheet} opeModel={operation}/>

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
