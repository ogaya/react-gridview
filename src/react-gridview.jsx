import React from "react";

import Cells from "./containers/cells";
import Inputer from "./containers/inputer";

//import "./react-gridview.styl";

import GridViewModel from "./model/gridview";
import OperationModel from "./model/operation";

import {GridViewBar} from "./containers/scrollbar";

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
    onChangeView: React.PropTypes.func,
    onChangeOperation: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      viewModel: new GridViewModel(),
      operationModel: new OperationModel(),
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
  },
  _onValueChange(target, value){

    const viewModel = this.state.viewModel
      .setValue(target, value);

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
    const viewChanged = JSON.stringify(viewModel.toJson()) !== JSON.stringify(nextState.viewModel.toJson());
    const opeChanged = JSON.stringify(operation.toJS()) !== JSON.stringify(nextState.operation.toJS());
    //console.log("ope:" + (operation !== nextState.operation));
    return viewChanged || opeChanged;
  },
  render: function () {
    const viewModel = this.state.viewModel;
    const operation = this.state.operation;
    const inputer = <Inputer ref="inputer" opeModel={operation} viewModel={viewModel}
      onValueChange={this._onValueChange} onStateChange={this._onStateChange}/>;
    return (
      <div style={style} ref="gridview" onWheel={this._onMouseWheel}>
        <Cells onOperationChange={this._onOperationChange} setInputFocus={this.state.setInputFocus}
          model={viewModel} opeModel={operation} onViewModelChange={this._onViewModelChange} />
        {inputer}
        <GridViewBar opeModel={operation} onOperationChange={this._onOperationChange}/>
      </div>
    );
  }
});

//module.exports = GridView;

export{
  GridView,
  GridViewModel,
  OperationModel
};
