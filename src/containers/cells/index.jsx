import React from "react";

//import drawGrid from "./controls/grid";
import drawColumnHeader from "./controls/column-header";
import drawRowHeader from "./controls/row-header";
import drawCenterHeader from "./controls/center-header";
import drawTable from "./controls/table";

import GridViewModel from "../../model/gridview";
import CanvasModel from "../../model/canvas";
import OperationModel from "../../model/operation";

const style =  {
  width: "100%",
  height: "100%",
  outline: "none"
};

const Cells = React.createClass({
  displayName: "Gridview-Cells",
  propTypes: {
    id: React.PropTypes.string,
    model: React.PropTypes.instanceOf(GridViewModel),
    operation: React.PropTypes.instanceOf(OperationModel),
    onOperationChange: React.PropTypes.func
  },
  _canvasRender(props){
    const id = props.id;
    const model = props.model;
    const canvasElement = document.getElementById(id);
    const width = canvasElement.width = canvasElement.offsetWidth;
    const height = canvasElement.height = canvasElement.offsetHeight;
    const context = canvasElement.getContext("2d");
    const canvas = new CanvasModel(context, width, height);

    drawCenterHeader(canvas, model.columnHeader, model.rowHeader);
    drawColumnHeader(canvas, model.columnHeader, model.rowHeader);
    drawRowHeader(canvas, model.columnHeader, model.rowHeader);
    drawTable(canvas, model);

    return false;
  },
  _handleResize() {
    this._canvasRender(this.props);
  },
  _keyDown(e){
    console.log(e);
    const input = this.props.operation.input.setIsInputing(true);
    const ope = this.props.operation.setInput(input);
    this.props.onOperationChange(ope);
  },
  componentDidMount(){
    window.addEventListener('resize', this._handleResize);
    this._canvasRender(this.props);

    document.getElementById(this.props.id).onkeydown = this._keyDown;

  },
  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  },
  //shouldComponentUpdate(nextProps, nextState){
  shouldComponentUpdate(nextProps) {
    this._canvasRender(nextProps);
    return false;
  },
  _onClick(e){
    console.log(e);
    console.log(e.clientX);
  },
  render: function () {
    return (
      <canvas contentEditable  id={this.props.id} style={style}
        onClick={this._onClick}/>
    );
  }
});

module.exports = Cells;
