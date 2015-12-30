import React from "react";
import ReactDOM from "react-dom";

import {Border} from "../../../dist";
import SimpleButton from "../common/simple-button";


import FullIcon from "./full.png";
import CrossIcon from "./cross.png";
import MiddleIcon from "./middle.png";
import CenterIcon from "./center.png";
import GridIcon from "./grid.png";
import TopIcon from "./top.png";
import LeftIcon from "./left.png";
import RightIcon from "./right.png";
import BottomIcon from "./bottom.png";
import NoneIcon from "./none.png";

import "./line-panel.css";
const LINE_TYPE = {
  FULL: "FULL",
  CROSS: "CROSS",
  MIDDLE: "MIDDLE",
  CENTER: "CENTER",
  GRID: "GRID",
  TOP: "TOP",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  BOTTOM: "BOTTOM",
  NONE: "NONE"
};

const lines = [
  [
    {icon: FullIcon, lineType: LINE_TYPE.FULL},
    {icon: CrossIcon, lineType: LINE_TYPE.CROSS},
    {icon: MiddleIcon, lineType: LINE_TYPE.MIDDLE},
    {icon: CenterIcon, lineType: LINE_TYPE.CENTER},
    {icon: GridIcon, lineType: LINE_TYPE.GRID}
  ],
  [
    {icon: TopIcon, lineType: LINE_TYPE.TOP},
    {icon: LeftIcon, lineType: LINE_TYPE.LEFT},
    {icon: RightIcon, lineType: LINE_TYPE.RIGHT},
    {icon: BottomIcon, lineType: LINE_TYPE.BOTTOM},
    {icon: NoneIcon, lineType: LINE_TYPE.NONE}
  ]
];

const LinePanel = React.createClass({
  displayName: "LinePanel",
  propTypes: {
    className: React.PropTypes.string,
    onSelectBorder: React.PropTypes.func,
    showSubWindow: React.PropTypes.func
  },
  componentDidMount(){
    ReactDOM.findDOMNode(this.refs.me).focus();
  },
  _onblur(){
    this.props.showSubWindow(null);
  },
  _onClickLine(lineType){
    let border = Border.create()
      .setColors(["#000"])
      .setWeight(2);
    this.props.onSelectBorder(border, lineType);
    this.props.showSubWindow(null);
  },
  _createLineNodes(){
    let nodes = [];

    for (let lineNo in lines){
      for (let itemNo in lines[lineNo]){
        const line = lines[lineNo][itemNo];
        const style = {
          top: (lineNo * 25 + 15) + "px",
          left: (itemNo * 25 + 5) + "px"
        };
        nodes.push(<SimpleButton key={line.lineType} className="line-node" style={style}
          icon={line.icon} onClick={this._onClickLine.bind(this, line.lineType)}/>);
      }
    }

    return nodes;
  },
  render: function() {
    let className = "line-panel";
    if (this.props.className){
      className = className + " " + this.props.className;
    }

    const lineNodes = this._createLineNodes();

    return (
      <div className={className} tabIndex="0" ref="me" onBlur={this._onblur}>
        {lineNodes}
      </div>
    );
  }
});

//<div className="line-panel-child" unselectable="on"></div>

//module.exports = ColorPanel;

export{
  LinePanel,
  LINE_TYPE
};
