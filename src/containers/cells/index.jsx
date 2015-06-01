import React from "react";

//import drawGrid from "./controls/grid";
import drawColumnHeader from "./controls/column-header";
import drawRowHeader from "./controls/row-header";
import drawCenterHeader from "./controls/center-header";
import drawTable from "./controls/table";
import drawOperation from "./controls/operation";

import GridViewModel from "../../model/gridview";
import CanvasModel from "../../model/canvas";
import OperationModel from "../../model/operation";
import {targetToRect} from "./controls/lib";

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
    drawOperation(canvas, model, props.operation);

    return false;
  },
  _handleResize() {
    this._canvasRender(this.props);
  },
  // キー王梶の処理
  _keyDown(){

    // inputエリアを表示させる
    const opeModel = this.props.operation;
    const target = opeModel.select.target;
    const rect = targetToRect(this.props.model, target);
    const input = opeModel.input
      .setIsInputing(true)
      .setRect(rect)
      .setTarget(target);
    const ope = opeModel.setInput(input);
    this.props.onOperationChange(ope);
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
  _onClick(e){
    const model = this.props.model;
    const operation = this.props.operation;

    // クリックポイントから選択対象を算出する
    const target = model.pointToTarget(e.clientX, e.clientY);
    const select = operation.select.setTarget(target);
    // 操作モデルを変更する
    this.props.onOperationChange(operation.setSelect(select));
  },
  render: function () {
    return (
      <canvas contentEditable  id={this.props.id} style={style}
        onMouseDown={this._onClick} onKeyDown={this._keyDown}/>
    );
  }
});

module.exports = Cells;
