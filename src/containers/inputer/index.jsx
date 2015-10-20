import React from "react";
import ReactDOM from "react-dom";

import OperationModel from "../../model/operation";
import GridViewModel from "../../model/gridview";

import {KeyPress} from "../../mixins/key-press";

import {createInputStyle} from "./create-style";
import {inputKeyDown} from "./key-behavior";


import {copy, paste} from "./copy-paste";

const Inputer = React.createClass({
  displayName: "Gridview-Cells",
  mixins: [KeyPress],
  propTypes: {
    value: React.PropTypes.string,
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onValueChange: React.PropTypes.func,
    onStateChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      inputText: ""
    };
  },
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.inputText).onkeydown  = this._onKeyDown;
    this._addKeyPressEvent();
  },
  componentWillUnmount(){
    this._removeKeyPressEvent();
  },
  componentWillReceiveProps(nextProps){
    const prevInput = this.props.opeModel.input;

    // 入力中→入力解除の場合は、変更値をセルに反映させる。
    if ((prevInput.isInputing === true) &&
        (nextProps.opeModel.input.isInputing === false)){
      const opeModel = this.props.opeModel;
      const cellPoint = opeModel.selectItem && opeModel.selectItem.cellPoint;
      nextProps.onValueChange(cellPoint, this.props.opeModel.input.text);
    }

    // 入力解除→入力の場合は、セルの値を削除する
    if ((prevInput.isInputing === false) &&
        (nextProps.opeModel.input.isInputing === true)){
      this.setState({inputText: ""});
    }
  },
  setInputFocus(){
    ReactDOM.findDOMNode(this.refs.inputText).focus();
  },
  _onKeyDown(e){
    // const setText = (text) => {
    //   this.setState({inputText: text});
    // };
    return inputKeyDown(e, this);
  },
  changeText(e) {
    //this.setState({inputText: e.target.value});
    const input = this.props.opeModel.input.setText(e.target.value);
    const ope = this.props.opeModel.setInput(input);
    this.props.onStateChange(this.props.viewModel, ope);
  },
  _onBlur(){
    const input = this.props.opeModel.input.setIsInputing(false);
    const ope = this.props.opeModel.setInput(input);
    this.props.onStateChange(this.props.viewModel, ope);
  },
  _onCopy(e){
    e.preventDefault();
    copy(e, this.props);

  },
  _onPaste(e){
    e.preventDefault();
    paste(e, this.props);
  },
  render() {
    const style = createInputStyle(this.props.viewModel, this.props.opeModel);
    //const value = this._getValue();
    //const value = this.state.inputText;
    const value = this.props.opeModel.input.text;

    return (
      <textarea style={style} type="text" ref="inputText" value={value}
        onChange={this.changeText} onBlur={this._onBlur}
        onCopy={this._onCopy} onPaste={this._onPaste}/>
    );
  }
});

module.exports = Inputer;
