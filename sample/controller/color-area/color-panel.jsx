import React from "react";
import ReactDOM from "react-dom";
import "./color-panel.css";

const colors = [
  ["#000000", "#212121", "#424242", "#616161", "#757575", "#9E9E9E", "#E0E0E0", "#EEEEEE", "#F5F5F5", "#FFFFFF"],
  ["#F00", "#F33", "#F55", "#F77"]
];

const ColorPanel = React.createClass({
  displayName: "ColorPanel",
  propTypes: {
    onSelectColor: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.me).focus();
  },
  _onblur(){
    this.props.showSubWindow(null);
  },
  _onClickNode(color){
    this.props.onSelectColor(color);
    this.props.showSubWindow(null);
  },
  _createColorNodes(){
    let colorNodes = [];
    for (let lineNo in colors){
      for(let colorNo in colors[lineNo]){
        const style = {
          top: (colorNo * 15 + 10) + "px",
          left: (lineNo * 15 + 10) + "px",
          background: colors[lineNo][colorNo]
        };
        colorNodes.push(
          <div className="color-node" onMouseDown={this._onClickNode.bind(this, colors[lineNo][colorNo])}
            key={lineNo + "-" + colorNo} style={style} />);
      }
    }
    return colorNodes;
  },
  render: function() {
    const colorNodes = this._createColorNodes();
    return (
      <div className="color-panel" tabIndex="0" ref="me" onBlur={this._onblur}>
        {colorNodes}
      </div>
    );
  }
});

module.exports = ColorPanel;
