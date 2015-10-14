import React from "react";
import ReactDOM from "react-dom";
import "./color-panel.css";

const colors = [
  ["#000000", "#212121", "#424242", "#616161", "#757575", "#9E9E9E", "#BDBDBD", "#E0E0E0", "#EEEEEE", "#F5F5F5", "#FFFFFF"],
  ["#795548", "#3E2723", "#4E342E", "#5D4037", "#6D4C41", "#795548", "#8D6E63", "#A1887F", "#BCAAA4", "#D7CCC8", "#EFEBE9"],
  ["#FF0000", "#B71C1C", "#C62828", "#D32F2F", "#E53935", "#F44336", "#EF5350", "#E57373", "#EF9A9A", "#FFCDD2", "#FFEBEE"],
  ["#FF9800", "#E65100", "#EF6C00", "#F57C00", "#FB8C00", "#FF9800", "#FFA726", "#FFB74D", "#FFCC80", "#FFE0B2", "#FFF3E0"],
  ["#FFFF00", "#F57F17", "#F9A825", "#FBC02D", "#FDD835", "#FFEB3B", "#FFEE58", "#FFF176", "#FFF59D", "#FFF9C4", "#FFFDE7"],
  ["#C6FF00", "#827717", "#9E9D24", "#AFB42B", "#C0CA33", "#CDDC39", "#D4E157", "#DCE775", "#E6EE9C", "#F0F4C3", "#F9FBE7"],
  ["#00E676", "#1B5E20", "#2E7D32", "#388E3C", "#43A047", "#4CAF50", "#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9", "#E8F5E9"],
  ["#18FFFF", "#006064", "#00838F", "#0097A7", "#00ACC1", "#00BCD4", "#26C6DA", "#4DD0E1", "#80DEEA", "#B2EBF2", "#E0F7FA"],
  ["#0000FF", "#0D47A1", "#1565C0", "#1976D2", "#1E88E5", "#2196F3", "#42A5F5", "#64B5F6", "#90CAF9", "#BBDEFB", "#E3F2FD"],
  ["#D500F9", "#4A148C", "#6A1B9A", "#7B1FA2", "#8E24AA", "#9C27B0", "#AB47BC", "#BA68C8", "#CE93D8", "#E1BEE7", "#F3E5F5"],
  ["#FF4081", "#880E4F", "#AD1457", "#C2185B", "#D81B60", "#E91E63", "#EC407A", "#F06292", "#F48FB1", "#F8BBD0", "#FCE4EC"]
];

const ColorPanel = React.createClass({
  displayName: "ColorPanel",
  propTypes: {
    className: React.PropTypes.string,
    defaultText: React.PropTypes.string,
    defaultColor: React.PropTypes.string,
    onSelectColor: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.me).focus();
  },
  _onblur(){
    this.props.showSubWindow(null);
  },
  _onClickDefault(){
    this.props.onSelectColor(this.props.defaultColor);
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
        const topOffset = (colorNo > 0) ? 5 + 40 : 40;
        const style = {
          top: (colorNo * 16 + topOffset) + "px",
          left: (lineNo * 16 + 10) + "px",
          background: colors[lineNo][colorNo]
        };

        const colorNode = (
          <div className="color-node" onMouseDown={this._onClickNode.bind(this, colors[lineNo][colorNo])}
            key={lineNo + "-" + colorNo} style={style} />
        );
        colorNodes.push(colorNode);
      }
    }
    return colorNodes;
  },
  render: function() {
    const colorNodes = this._createColorNodes();
    let className = "color-panel";
    if (this.props.className){
      className = className + " " + this.props.className;
    }

    return (
      <div className={className} tabIndex="0" ref="me" onBlur={this._onblur}>
        <div className="color-def" onClick={this._onClickDefault}>{this.props.defaultText}</div>
        {colorNodes}
      </div>
    );
  }
});

module.exports = ColorPanel;
