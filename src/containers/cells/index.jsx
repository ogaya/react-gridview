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
import {pointToGridViewItem} from "../../model/lib/select";
import {operationResult} from "../../model/lib/change";

const style =  {
  width: "100%",
  height: "100%",
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

    drawCenterHeader(canvas, model.columnHeader, model.rowHeader);
    drawColumnHeader(canvas, model.columnHeader, model.rowHeader, opeModel);
    drawRowHeader(canvas, model.columnHeader, model.rowHeader);
    drawTable(canvas, model, opeModel);
    drawOperation(canvas, model, props.opeModel);

    // マウスカーソル変更
    const styleStr = STYLE_STRING + "cursor:" + opeModel.HoverCursor;
    canvasElement.setAttribute("style", styleStr);
    return false;
  },
  _handleResize() {
    this._canvasRender(this.props);
  },
  // キー入力の処理
  _keyDown(){
    // 
    // // inputエリアを表示させる
    // const opeModel = this.props.opeModel;
    // const target = opeModel.selectItem && opeModel.selectItem.target;
    // if(!target){
    //   return;
    // }
    // const rect = targetToRect(this.props.model, target, opeModel.scroll);
    // const input = opeModel.input
    //   .setIsInputing(true)
    //   .setRect(rect)
    //   .setTarget(target);
    // const ope = opeModel.setInput(input);
    // this.props.onOperationChange(ope);
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
    const ope = opeModel.setSelectItem(item).setOpeItem(item);
    this.props.onOperationChange(ope);
  },
  _onMouseMove(e){
    const viewModel = this.props.model;
    const opeModel = this.props.opeModel;
    // テーブル上の座標を取得
    const point = new Point(e.offsetX, e.offsetY);

    const item = pointToGridViewItem(viewModel, opeModel, point);
    const ope = opeModel.setHoverItem(item);

    this.props.onOperationChange(ope);

  },
  componentDidMount(){
    window.addEventListener('resize', this._handleResize);
    window.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
    this._canvasRender(this.props);
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
    window.removeEventListener('mousedown', this._onMouseDown);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
  },
  //shouldComponentUpdate(nextProps, nextState){
  shouldComponentUpdate(nextProps) {
    this._canvasRender(nextProps);
    return false;
  },
  render: function () {
    return (
      <canvas contentEditable ref="gwcells" style={style}/>
    );
  }
});

module.exports = Cells;
