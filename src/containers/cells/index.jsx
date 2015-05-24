import React from "react";

//import drawGrid from "./controls/grid";
import drawColumnHeader from "./controls/column-header";
import drawRowHeader from "./controls/row-header";
import drawCenterHeader from "./controls/center-header";
import drawTable from "./controls/table";

import GridViewModel from "../../model";
import CanvasModel from "../../model/canvas";

import "./cells.styl";
const Cells = React.createClass({
  displayName: "Gridview-Cells",
  propTypes: {
    id: React.PropTypes.string,
    model: React.PropTypes.instanceOf(GridViewModel)
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

    //drawRowHeader(context, width, height);
    //drawGrid(context, width, height);
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
  //shouldComponentUpdate(nextProps, nextState){
  shouldComponentUpdate(nextProps) {
    this._canvasRender(nextProps);
    return false;
  },
  render: function () {
    return (
      <canvas id={this.props.id} className="gridview-cells"/>
    );
  }
});

module.exports = Cells;
