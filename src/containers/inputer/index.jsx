import React from "react";
import OperationModel from "../../model/operation";
import GridViewModel from "../../model/gridview";

import {createInputStyle} from "./create-style";
import {inputKeyDown} from "./key-behavior";

const Inputer = React.createClass({
  displayName: "Gridview-Cells",
  propTypes: {
    value: React.PropTypes.string,
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onValueChange: React.PropTypes.func,
    onStateChange: React.PropTypes.func
  },
  componentDidMount(){
    this.refs.inputText.getDOMNode().onkeydown  = this._onKeyDown;
  },
  componentDidUpdate(prevProps, prevState){
    this.refs.inputText.getDOMNode().focus();
  },
  // componentWillUpdate(nextProps, nextState){
  //   const viewModel = nextProps.viewModel;
  //   const opeModel = nextProps.opeModel;
  //
  //   if(!opeModel.selectItem){
  //     return;
  //   }
  //   if(!opeModel.selectItem.target){
  //     return;
  //   }
  //   const cell = viewModel.getCell(opeModel.selectItem.target);
  //   console.log(cell.value);
  //   this.setState({textValue: cell.value});
  // },
  // getInitialState() {
  //   return {
  //     textValue: ""
  //   };
  // },
  _onKeyDown(e){
    return inputKeyDown(e, this.props);
  },
  changeText(e) {
    const input = this.props.opeModel.input;
    //this.setState({textValue: e.target.value});
    this.props.onValueChange(input.target, e.target.value);
  },
  _onBlur(){
    const input = this.props.opeModel.input.setIsInputing(false);
    const ope = this.props.opeModel.setInput(input);
    this.props.onStateChange(this.props.viewModel, ope);
    //console.log("blure");
  },
  _getValue(){
    const opeModel = this.props.opeModel;
    if(!opeModel.input){
      return "";
    }
    if (!opeModel.input.isInputing){
      return "";
    }
    if(!opeModel.selectItem){
      return "";
    }
    if(!opeModel.selectItem.target){
      return "";
    }
    const cell = this.props.viewModel.getCell(opeModel.selectItem.target);
    return cell.value;
  },
  render() {
    const style = createInputStyle(this.props.opeModel);
    const value = this._getValue();

    return (
      <input style={style} type="text" ref="inputText" value={value}
        onChange={this.changeText} onBlur={this._onBlur} />
    );
  }
});

module.exports = Inputer;
