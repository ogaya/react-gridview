import React from "react";
import OperationModel from "../../model/operation";

//import "./inputer.styl";

//const style = {
//  position: "absolute"
//};

const Inputer = React.createClass({
  displayName: "Gridview-Cells",
  propTypes: {
    value: React.PropTypes.string,
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onValueChange: React.PropTypes.func,
    onOperationChange: React.PropTypes.func
  },
  componentDidMount: function(){
    this.refs.inputText.getDOMNode().focus();
  },
  getInitialState() {
    return {
      textValue: ""
    };
  },
  changeText(e) {
    const input = this.props.opeModel.input;
    this.setState({textValue: e.target.value});
    this.props.onValueChange(input.target, e.target.value);
  },
  _onBlur(){
    const input = this.props.opeModel.input.setIsInputing(false);
    const ope = this.props.opeModel.setInput(input);
    this.props.onOperationChange(ope);
  },
  // スタイルの生成
  _createStyle(){
    let style = {
      position: "absolute"
    };
    const input = this.props.opeModel.input;

    if (!input.rect){
      return style;
    }
    style.top = input.rect.top;
    style.left = input.rect.left;
    style.width = input.rect.width;
    style.height = input.rect.height;

    return style;
  },
  render() {
    const style = this._createStyle();
    return (
      <div style={style}>
        <input type="text" ref="inputText" value={this.state.textValue}
          onChange={this.changeText} onBlur={this._onBlur} />
      </div>
    );
  }
});

module.exports = Inputer;
