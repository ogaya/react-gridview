import React from "react";
import ReactDOM from "react-dom";


import drawTable from "./controls/table";

import GridViewModel from "../../model/sheet";
import CanvasModel from "../../model/canvas";
import OperationModel from "../../model/operation";
import {Rect} from "../../model/common";

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

const TableCell = React.createClass({
  displayName: "Gridview-TableCell",
  propTypes: {
    sheet: React.PropTypes.instanceOf(GridViewModel),
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onOperationChange: React.PropTypes.func
  },
  _prev: {
    height: 0,
    width: 0
  },
  _canvasRender(props){
    const sheet = props.sheet;
    const opeModel = props.opeModel;
    const canvasElement = ReactDOM.findDOMNode(this.refs.gwcells);
    const canvasWidth = canvasElement.offsetWidth;
    const canvasHeigh = canvasElement.offsetHeight;

    //console.log(window.devicePixelRatio);

    if ((!opeModel.canvasRect) ||
        (opeModel.canvasRect.width !== canvasWidth) ||
        (opeModel.canvasRect.height !== canvasHeigh)){
      const cRect = new Rect(0, 0, canvasWidth, canvasHeigh);
      props.onOperationChange(opeModel.setCanvasRect(cRect));
      return false;
    }

    if((canvasHeigh === this._prev.height) &&
       (canvasWidth === this._prev.width) &&
       (this.props.opeModel.scroll.rowNo === props.opeModel.scroll.rowNo) &&
       (this.props.opeModel.scroll.columnNo === props.opeModel.scroll.columnNo) &&
       (this.props.sheet === props.sheet)){
      return false;
    }

    const width = this._prev.width = canvasElement.width = canvasWidth;
    const height = this._prev.height = canvasElement.height = canvasHeigh;
    const context = canvasElement.getContext("2d");
    var scale = sheet.scale;
    context.scale(scale, scale);
    const canvas = new CanvasModel(context, width, height);

    drawTable(canvas, sheet, opeModel);
    return false;
  },
  _handleResize() {
    this._canvasRender(this.props);
  },
  componentDidMount(){
    this._prev.height = 0;
    this._prev.width = 0;
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

module.exports = TableCell;
