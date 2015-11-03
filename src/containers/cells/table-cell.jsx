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
       (this.props.view === props.view)){

      return false;
    }

    //console.log("aaaa");

    const width = this._prev.width = canvasElement.width = canvasWidth;
    const height = this._prev.height = canvasElement.height = canvasHeigh;
    const context = canvasElement.getContext("2d");
    const canvas = new CanvasModel(context, width, height);

    drawTable(canvas, view, opeModel);
    return false;
  },
  _handleResize() {
    this._canvasRender(this.props);
  },
  componentDidMount(){
    window.addEventListener('resize', this._handleResize);
    this._canvasRender(this.props);
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },
  shouldComponentUpdate(nextProps) {
    // if(nextProps.view === this.props.view){
    //   return false;
    // }
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
