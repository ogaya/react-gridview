import React from "react";
import OperationModel from "../../model/operation";

//import "./inputer.styl";

const style = {
  position: "absolute"
};

const Inputer = React.createClass({
  displayName: "Gridview-Cells",
  propTypes: {
    value: React.PropTypes.string,
    operation: React.PropTypes.instanceOf(OperationModel),
    onValueChange: React.PropTypes.func,
    onOperationChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      textValue: ""
    };
  },
  changeText(e) {
    this.setState({textValue: e.target.value});
  },
  _onBlur(){
    const input = this.props.operation.input.setIsInputing(false);
    const ope = this.props.operation.setInput(input);
    this.props.onOperationChange(ope);
  },
  render() {
    return (
      <div style={style}>
        <input type="text" value={this.state.textValue}
          onChange={this.changeText} onBlur={this._onBlur} />
      </div>
    );
  }
});

module.exports = Inputer;
