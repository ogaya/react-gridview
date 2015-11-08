import React from "react";
import ReactDOM from "react-dom";

import Cells from "./containers/cells";
import ExNodes from "./containers/exnodes";
import Stickies from "./containers/stickies";
import Inputer from "./containers/inputer";
//import ContextMenu from "./containers/context-menu";

//import "./react-gridview.styl";
import {MouseEvent} from "./mouse-event";
import {KeyPress} from "./mixins/key-press";

import GridViewModel from "./model/sheet";
import OperationModel from "./model/operation";
import ExtensionModel from "./model/extension";
import StickyModel from "./model/sheet/sticky";
import Border from "./model/sheet/border";

import {OBJECT_TYPE} from "./model/sheet/object-type";
import {GridViewBar} from "./containers/scrollbar";
import {VERTICAL_ALIGN, TEXT_ALIGN, BORDER_POSITION, CellPoint} from "./model/common";
import {drag} from "./util/drag";

// スタイルシート読み込み
import "./css.js";

const style = {
  width: "100%",
  height: "100%",
  cursor: "pointer",
  position: "relative"
};

const GridView = React.createClass({
  displayName: "gridview",
  mixins: [KeyPress, MouseEvent],
  propTypes: {
    sheet: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    extension: React.PropTypes.instanceOf(ExtensionModel),
    onChangeSheet: React.PropTypes.func,
    onChangeOperation: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      sheet: new GridViewModel(),
      operationModel: new OperationModel(),
      extension: new ExtensionModel(),
      onChangeSheet: (prevView, nextView) =>{ return nextView; },
      onChangeOperation: (prevVOperation, nextOperation) =>{ return nextOperation; }
    };
  },
  getInitialState() {
    return {
      sheet: this.props.sheet,
      operation: this.props.operationModel
    };
  },
  componentWillReceiveProps(nextProps){
    if(this.props.sheet !== nextProps.sheet){
      this.setState({sheet: nextProps.sheet});
    }
    if(this.props.operationModel !== nextProps.operationModel){
      this.setState({operation: nextProps.operationModel});
    }
  },
  componentDidMount(){
    const node = ReactDOM.findDOMNode(this.refs.gwcells);
    drag(node, this._onMouseDown, this._onMouseMove, this._onMouseUp);
    this._addKeyPressEvent();
  },
  componentWillUnmount(){
    this._removeKeyPressEvent();
  },
  setInputFocus(){
    this.refs.inputer.setInputFocus();
  },
  _onValueChange(cellPoint, value){

    const sheet = this.state.sheet
      .setValue(cellPoint, value);

    this._onViewModelChange(sheet);
  },
  _onViewModelChange(sheet){
    const nextView = this.props.onChangeSheet(this.state.sheet, sheet);
    if (this.state.sheet === nextView){
      return;
    }
    this.setState({sheet: nextView});
  },
  _onOperationChange(ope){
    const nextOpe = this.props.onChangeOperation(this.state.operation, ope);
    if (this.state.operation === nextOpe){
      return;
    }
    this.setState({operation: nextOpe});
  },
  _onStateChange(sheet, operation){
    this._onViewModelChange(sheet);
    this._onOperationChange(operation);
  },
  render: function () {
    const sheet = this.state.sheet;
    const operation = this.state.operation;
    const cellStyle = {
      width: "calc(100% - " + sheet.scroll.horizontalHeight + "px)",
      height: "calc(100% - " + sheet.scroll.verticalWidth + "px)",
      position: "relative",
      cursor: operation.HoverCursor
    };

    return (
      <div className="react-sheet" style={style} ref="gridview"
        onWheel={this._onMouseWheel} onContextMenu={this._onContextMenu}>
        <div style={cellStyle} ref="gwcells"  onMouseMove={this._onMouseMove}>
          <Cells onOperationChange={this._onOperationChange}
            model={sheet} opeModel={operation} onViewModelChange={this._onViewModelChange} />

          <ExNodes view={sheet} operation={operation} extension={this.props.extension} />
          <Stickies view={sheet} operation={operation} extension={this.props.extension} />
        </div>

        <Inputer ref="inputer" opeModel={operation} sheet={sheet}
          onValueChange={this._onValueChange} onStateChange={this._onStateChange}/>
        <GridViewBar sheet={sheet} opeModel={operation} onOperationChange={this._onOperationChange}/>
      </div>
    );
  }
});

export{
  GridView,
  GridViewModel,
  OperationModel,
  ExtensionModel,
  StickyModel,
  Border,
  VERTICAL_ALIGN,
  TEXT_ALIGN,
  BORDER_POSITION,
  OBJECT_TYPE,
  CellPoint
};
