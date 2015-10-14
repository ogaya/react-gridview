import React from "react";
import ReactDOM from "react-dom";


import drawOperation from "./controls/operation";
import GridViewModel from "../../model/gridview";
import CanvasModel from "../../model/canvas";
import OperationModel from "../../model/operation";

// スタイルシート読み込み
import "./css.js";


const style =  {
  position: "absolute",
  top: "0px",
  bottom: "0px",
  width: "100%",
  height: "100%",
  outline: "none"
};


const OperateDecoration = React.createClass({
  displayName: "Gridview-Operate-Decoration",
  propTypes: {
    view: React.PropTypes.instanceOf(GridViewModel),
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onViewModelChange: React.PropTypes.func,
    onOperationChange: React.PropTypes.func,
    setInputFocus: React.PropTypes.func
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
      return false;
    }

    const width = canvasElement.width = canvasWidth;
    const height = canvasElement.height = canvasHeigh;
    const context = canvasElement.getContext("2d");
    const canvas = new CanvasModel(context, width, height);

    drawOperation(canvas, view, props.opeModel);

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
    this._canvasRender(nextProps);
    return false;
  },
  render: function () {
    return (
      <canvas className="gw-cells" ref="gwcells" style={style}/>
    );
  }
});

module.exports = OperateDecoration;
