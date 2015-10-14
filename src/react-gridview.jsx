import React from "react";
import ReactDOM from "react-dom";

import Cells from "./containers/cells";
import ExNodes from "./containers/exnodes";
import Stickies from "./containers/stickies";
import Inputer from "./containers/inputer";

//import "./react-gridview.styl";
import {MouseEvent} from "./mouse-event";
import {KeyPress} from "./mixins/key-press";

import GridViewModel from "./model/gridview";
import OperationModel from "./model/operation";
import ExtensionModel from "./model/extension";
import StickyModel from "./model/gridview/sticky";

import {GridViewBar} from "./containers/scrollbar";
import {VERTICAL_ALIGN, TEXT_ALIGN, CellPoint} from "./model/common";
import {drag} from "./util/drag";


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
      this.setState({viewModel: nextProps.viewModel});
    }
    if(this.props.operationModel !== nextProps.operationModel){
      this.setState({operation: nextProps.operationModel});
    }
  },
  componentDidMount(){
    this.setState({setInputFocus: this.refs.inputer.setInputFocus});
    const node = ReactDOM.findDOMNode(this.refs.gwcells);
    drag(node, this._onMouseDown, this._onMouseMove, this._onMouseUp);
    this._addKeyPressEvent();
  },
  componentWillUnmount(){
    this._removeKeyPressEvent();
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
  // 再描画が必要か判定
  shouldComponentUpdate: function(nextProps, nextState) {
    const viewModel = this.state.viewModel;
    const operation = this.state.operation;
    const viewChanged = (viewModel !== nextState.viewModel);
    const opeChanged = JSON.stringify(operation.toJS()) !== JSON.stringify(nextState.operation.toJS());
    //console.log("ope:" + (operation !== nextState.operation));

    return viewChanged || opeChanged;
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
          <Cells onOperationChange={this._onOperationChange}
            setInputFocus={this.state.setInputFocus}
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
