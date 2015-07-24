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
    onChangeView: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      viewModel: new GridViewModel(),
      onChangeView: (prevView, nextView) =>{ return nextView; }
    };
  },
  getInitialState() {
    return {
      viewModel: this.props.viewModel,
      operation: new OperationModel(),
      setInputFocus: () =>{}
    };
  },
  componentWillReceiveProps(nextProps){
    if(this.props.viewModel === nextProps.viewModel){
      return;
    }
    this.setState({viewModel: nextProps.viewModel})
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
    const nextView = this.props.onChangeView(this.props.viewModel, viewModel);
    if (this.props.viewModel === nextView){
      return;
    }
    this.setState({viewModel: nextView});
  },
  _onOperationChange(ope){
    this.setState({operation: ope});
  },
  _onStateChange(viewModel, operation){

    this._onViewModelChange(viewModel);
    this._onOperationChange(operation);
    // this.setState({
    //   viewModel: viewModel,
    //   operation: operation
    // });
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
  GridViewModel
};
