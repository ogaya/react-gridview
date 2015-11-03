import React from "react";
import ReactDOM from "react-dom";


import drawColumnHeader from "./controls/column-header";
import drawRowHeader from "./controls/row-header";
import drawCenterHeader from "./controls/center-header";

import GridViewModel from "../../model/sheet";
import CanvasModel from "../../model/canvas";
import OperationModel from "../../model/operation";

// スタイルシート読み込み
//import "./css.js";

const style =  {
  position: "absolute",
  top: "0px",
  bottom: "0px",
  width: "100%",
  height: "100%",
  outline: "none"
};

const Header = React.createClass({
  displayName: "Gridview-TableCell",
  propTypes: {
    view: React.PropTypes.instanceOf(GridViewModel),
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onOperationChange: React.PropTypes.func
  },
  _prev: {
    height: 0,
    width: 0
  },
  _canvasRender(props){
    const view = props.view;
    const opeModel = props.opeModel;
    const canvasElement = ReactDOM.findDOMNode(this.refs.gwcells);
    const canvasWidth = canvasElement.offsetWidth;
    const canvasHeigh = canvasElement.offsetHeight;

    if((canvasHeigh === this._prev.height) &&
       (canvasWidth === this._prev.width) &&
       (this.props.opeModel.scroll.rowNo === props.opeModel.scroll.rowNo) &&
       (this.props.opeModel.scroll.columnNo === props.opeModel.scroll.columnNo) &&
       (this.props.view === props.view)){

      return false;
    }

    //console.log("aaaa");

    const width = this._prev.width = canvasElement.width = canvasWidth;
    const height = this._prev.height = canvasElement.height = canvasHeigh;
    const context = canvasElement.getContext("2d");
    const canvas = new CanvasModel(context, width, height);


    drawCenterHeader(canvas, view.columnHeader, view.rowHeader);
    drawColumnHeader(canvas, view.columnHeader, view.rowHeader, opeModel);
    drawRowHeader(canvas, view.columnHeader, view.rowHeader, opeModel);

    return false;
  },
  _handleResize() {
    this._canvasRender(this.props);
  },
  componentDidMount(){
    window.addEventListener("resize", this._handleResize);
    this._canvasRender(this.props);
  },
  componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize);
  },
  shouldComponentUpdate(nextProps) {
    this._canvasRender(nextProps);
    return false;
  },
  render: function () {
    return (
      <canvas className="gw-cells" ref="gwcells" style={style}/>
    );
  }
});

module.exports = Header;
