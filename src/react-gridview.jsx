import React from "react";

import Cells from "./containers/cells";
import ExNodes from "./containers/exnodes";
import Stickies from "./containers/stickies";
import Inputer from "./containers/inputer";

//import "./react-gridview.styl";

import GridViewModel from "./model/gridview";
import OperationModel from "./model/operation";
import ExtensionModel from "./model/extension";
import StickyModel from "./model/gridview/sticky";

import {GridViewBar} from "./containers/scrollbar";
import {VERTICAL_ALIGN, TEXT_ALIGN, CellPoint} from "./model/common";
import {drag} from "./util/drag";
import {Point, Rect} from "./model/common";
import {operationResult} from "./model/lib/change";
import {pointToGridViewItem} from "./model/lib/select";
import {modelToRangeItem} from "./model/common/cellrange";
import {fitForTarget} from "./model/lib/fit-for-target";
import {OBJECT_TYPE} from "./model/gridview/object-type";

function dragScroll(viewModel, opeModel){
  const opeItem = opeModel.opeItem;
  const hoverItem = opeModel.hoverItem;

  // 操作中オブジェクトがセルで無い場合、範囲選択しない
  if ((!opeItem) || (opeItem.objectType !== OBJECT_TYPE.CELL)){
    return opeModel.scroll;
  }
  // ホバーアイテムがセルで無い場合、前回の範囲選択情報のままとする。
  if ((!hoverItem) || (hoverItem.objectType !== OBJECT_TYPE.CELL)){
    return opeModel.scroll;
  }

  return fitForTarget(viewModel, opeModel , hoverItem.cellPoint);
}


const style = {
  width: "100%",
  height: "100%",
  cursor: "pointer",
  position: "relative"
};

const GridView = React.createClass({
  displayName: "gridview",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    extension: React.PropTypes.instanceOf(ExtensionModel),
    onChangeView: React.PropTypes.func,
    onChangeOperation: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      viewModel: new GridViewModel(),
      operationModel: new OperationModel(),
      extension: new ExtensionModel(),
      onChangeView: (prevView, nextView) =>{ return nextView; },
      onChangeOperation: (prevVOperation, nextOperation) =>{ return nextOperation; }
    };
  },
  getInitialState() {
    return {
      viewModel: this.props.viewModel,
      operation: this.props.operationModel,
      setInputFocus: () =>{}
    };
  },
  componentWillReceiveProps(nextProps){
    if(this.props.viewModel !== nextProps.viewModel){
      this.setState({viewModel: nextProps.viewModel})
    }
    if(this.props.operationModel !== nextProps.operationModel){
      this.setState({operation: nextProps.operationModel})
    }
  },
  componentDidMount(){
    this.setState({setInputFocus: this.refs.inputer.setInputFocus})
    const node = this.refs.gwcells.getDOMNode();
    drag(node, this._onMouseDown, this._onMouseMove, this._onMouseUp);
  },
  _onValueChange(cellPoint, value){

    const viewModel = this.state.viewModel
      .setValue(cellPoint, value);

    this._onViewModelChange(viewModel);
  },
  _onViewModelChange(viewModel){
    const nextView = this.props.onChangeView(this.state.viewModel, viewModel);
    if (this.state.viewModel === nextView){
      return;
    }
    this.setState({viewModel: nextView});
  },
  _onOperationChange(ope){
    const nextOpe = this.props.onChangeOperation(this.state.operation, ope);
    if (this.state.operation === nextOpe){
      return;
    }
    this.setState({operation: nextOpe});
  },
  _onStateChange(viewModel, operation){
    this._onViewModelChange(viewModel);
    this._onOperationChange(operation);
  },
  _onMouseWheel(e){
    const opeModel = this.state.operation;
    let value = opeModel.scroll.rowNo + Math.round(e.deltaY / 100)

    if (value < 1) {
      value = 1;
    }

    if (opeModel.scroll.rowNo !== value){
      const scroll = opeModel.scroll.setRowNo(value);
      this._onOperationChange(opeModel.setScroll(scroll));
    }
    e.preventDefault();
  },
  // 再描画が必要か判定
  shouldComponentUpdate: function(nextProps, nextState) {
    const viewModel = this.state.viewModel;
    const operation = this.state.operation;
    const viewChanged = (viewModel !== nextState.viewModel);
    const opeChanged = JSON.stringify(operation.toJS()) !== JSON.stringify(nextState.operation.toJS());
    //console.log("ope:" + (operation !== nextState.operation));

    return viewChanged || opeChanged;
  },
  _onMouseUp(){
    const opeModel = this.state.operation;
    const viewModel = this.state.viewModel;
    const newViewModel = operationResult(viewModel, opeModel);

    if (viewModel !== newViewModel){
      this._onViewModelChange(newViewModel);
    }
    const ope = opeModel.setOpeItem(null);
    this._onOperationChange(ope);
  },
  _onMouseDown(e){
    const viewModel = this.state.viewModel;
    const opeModel = this.state.operation;

    // テーブル上の座標を取得
    const point = new Point(e.offsetX, e.offsetY);

    const item = pointToGridViewItem(viewModel, opeModel, point);
    this.state.setInputFocus();

    const ope = opeModel
      .setSelectItem(item)
      .setOpeItem(item)
      .setRangeItem(null);

    const rangeItem = modelToRangeItem(viewModel, ope);
    this._onOperationChange(ope.setRangeItem(rangeItem));
  },
  _onMouseMove(e){
    const node = this.refs.gwcells.getDOMNode();
    const viewModel = this.state.viewModel;
    const opeModel = this.state.operation;

    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // テーブル上の座標を取得
    const point = new Point(x, y);

    const item = pointToGridViewItem(viewModel, opeModel, point, true);
    const ope = opeModel.setHoverItem(item);
    const scroll = dragScroll(viewModel, ope);
    const rangeItem = modelToRangeItem(viewModel, ope);

    this._onOperationChange(ope.setRangeItem(rangeItem).setScroll(scroll));

  },
  render: function () {
    const viewModel = this.state.viewModel;
    const operation = this.state.operation;
    const inputer = <Inputer ref="inputer" opeModel={operation} viewModel={viewModel}
      onValueChange={this._onValueChange} onStateChange={this._onStateChange}/>;

    const cellStyle = {
      width: "calc(100% - " + viewModel.scroll.horizontalHeight + "px)",
      height: "calc(100% - " + viewModel.scroll.verticalWidth + "px)",
      position: "relative",
      cursor: operation.HoverCursor
    };

    return (
      <div style={style} ref="gridview" onWheel={this._onMouseWheel}>
        <div style={cellStyle} ref="gwcells"  onMouseMove={this._onMouseMove}>
          <Cells onOperationChange={this._onOperationChange} setInputFocus={this.state.setInputFocus}
            model={viewModel} opeModel={operation} onViewModelChange={this._onViewModelChange} />

          <ExNodes view={viewModel} operation={operation} extension={this.props.extension} />
          <Stickies view={viewModel} operation={operation} extension={this.props.extension} />
        </div>

        {inputer}
        <GridViewBar viewModel={viewModel} opeModel={operation} onOperationChange={this._onOperationChange}/>
      </div>
    );
  }
});

//module.exports = GridView;

export{
  GridView,
  GridViewModel,
  OperationModel,
  ExtensionModel,
  StickyModel,
  VERTICAL_ALIGN,
  TEXT_ALIGN,
  CellPoint
};
