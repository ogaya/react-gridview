import React from "react";

//import drawGrid from "./controls/grid";
import drawColumnHeader from "./controls/column-header";
import drawRowHeader from "./controls/row-header";
import drawCenterHeader from "./controls/center-header";
import drawTable from "./controls/table";

import GridViewModel from "../../model";

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
    const canvas = document.getElementById(id);
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    const context = canvas.getContext("2d");
    drawCenterHeader(context,
        width, height, model.columnHeader, model.rowHeader);

    drawColumnHeader(context,
      width, height, model.columnHeader, model.rowHeader);

    drawRowHeader(context,
        width, height, model.columnHeader, model.rowHeader);

    drawTable(context, width, height, model);

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
