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
import {targetToRect} from "../../model/lib/target_to_rect";
import {Point} from "../../model/common";


// ライブラリ
import {drag} from "../../util/drag";
import {pointToGridViewItem} from "../../model/lib/select";
import {operationResult} from "../../model/lib/change";
import {opeModelToRangeItem} from "../../model/lib/range";

const style =  {
  width: "100%",
  height: "100%",
  cursor: "pointer",
  outline: "none"
};

const STYLE_STRING = "width:100%;height:100%;outline:none;";

const Cells = React.createClass({
  displayName: "Gridview-Cells",
  propTypes: {
    model: React.PropTypes.instanceOf(GridViewModel),
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onViewModelChange: React.PropTypes.func,
    onOperationChange: React.PropTypes.func
  },
  _canvasRender(props){
    const model = props.model;
    const opeModel = props.opeModel;
    const canvasElement = this.refs.gwcells.getDOMNode();
    const width = canvasElement.width = canvasElement.offsetWidth;
    const height = canvasElement.height = canvasElement.offsetHeight;
    const context = canvasElement.getContext("2d");
    const canvas = new CanvasModel(context, width, height);
    //context.scale(2,2);

    drawTable(canvas, model, opeModel);
    drawOperation(canvas, model, props.opeModel);
    drawCenterHeader(canvas, model.columnHeader, model.rowHeader);
    drawColumnHeader(canvas, model.columnHeader, model.rowHeader, opeModel);
    drawRowHeader(canvas, model.columnHeader, model.rowHeader, opeModel);
    // マウスカーソル変更
    const styleStr = STYLE_STRING + "cursor:" + opeModel.HoverCursor;
    canvasElement.setAttribute("style", styleStr);
    return false;
  },
  _handleResize() {
    this._canvasRender(this.props);
  },
  _onMouseUp(){
    const opeModel = this.props.opeModel;
    const viewModel = this.props.model;
    const newViewModel = operationResult(viewModel, opeModel);

    if (viewModel !== newViewModel){
      this.props.onViewModelChange(newViewModel);
    }
    const ope = opeModel.setOpeItem(null);
    this.props.onOperationChange(ope);
  },
  _onMouseDown(e){
    const viewModel = this.props.model;
    const opeModel = this.props.opeModel;

    // テーブル上の座標を取得
    const point = new Point(e.offsetX, e.offsetY);

    const item = pointToGridViewItem(viewModel, opeModel, point);

    //console.log(item);
    const ope = opeModel
      .setSelectItem(item)
      .setOpeItem(item)
      .setRangeItem(null);
    this.props.onOperationChange(ope);
  },
  _onMouseMove(e){

    const viewModel = this.props.model;
    const opeModel = this.props.opeModel;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // テーブル上の座標を取得
    const point = new Point(x, y);

    //const point = new Point(e.offsetX, e.offsetY);

    const item = pointToGridViewItem(viewModel, opeModel, point);
    const ope = opeModel.setHoverItem(item);
    const rangeItem = opeModelToRangeItem(ope);

    this.props.onOperationChange(ope.setRangeItem(rangeItem));

  },
  componentDidMount(){
    const node = this.refs.gwcells.getDOMNode();
    drag(node, this._onMouseDown, this._onMouseMove, this._onMouseUp);
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
      <canvas onMouseMove={this._onMouseMove} ref="gwcells" style={style}/>
    );
  }
});

module.exports = Cells;
