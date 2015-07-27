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
import {fitForTarget} from "../../model/lib/fit-for-target";
import {Point} from "../../model/common";
import {Rect} from "../../model/common";
import {OBJECT_TYPE} from "../../model/gridview/object-type";

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

function dragScroll(viewModel, opeModel){
  const opeItem = opeModel.opeItem;
  const hoverItem = opeModel.hoverItem;

  // 操作中オブジェクトがセルで無い場合、範囲選択しない
  if ((!opeItem) || (opeItem.objectType !== OBJECT_TYPE.CELL)){
    return opeModel.scroll;
  }
  // ホバーアイテムがセルで無い場合、前回の範囲選択情報のままとする。
  if ((!hoverItem) || (hoverItem.objectType !== OBJECT_TYPE.CELL)){
    return opeModel.scroll;
  }

  return fitForTarget(viewModel, opeModel , hoverItem.target);
}

const Cells = React.createClass({
  displayName: "Gridview-Cells",
  propTypes: {
    model: React.PropTypes.instanceOf(GridViewModel),
    opeModel: React.PropTypes.instanceOf(OperationModel),
    onViewModelChange: React.PropTypes.func,
    onOperationChange: React.PropTypes.func,
    setInputFocus: React.PropTypes.func
  },
  _canvasRender(props){
    const model = props.model;
    const opeModel = props.opeModel;
    const canvasElement = this.refs.gwcells.getDOMNode();
    const canvasWidth = canvasElement.offsetWidth;
    const canvasHeigh = canvasElement.offsetHeight;

    if ((!opeModel.canvasRect) ||
        (opeModel.canvasRect.width !== canvasWidth) ||
        (opeModel.canvasRect.height !== canvasHeigh)){
      const cRect = new Rect(0, 0, canvasWidth, canvasHeigh);
      props.onOperationChange(opeModel.setCanvasRect(cRect))
      return;
    }

    const width = canvasElement.width = canvasWidth;
    const height = canvasElement.height = canvasHeigh;
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
    this.props.setInputFocus();

    const ope = opeModel
      .setSelectItem(item)
      .setOpeItem(item)
      .setRangeItem(null);

    const rangeItem = opeModelToRangeItem(ope);
    this.props.onOperationChange(ope.setRangeItem(rangeItem));
  },
  _onMouseMove(e){
    const node = this.refs.gwcells.getDOMNode();
    const viewModel = this.props.model;
    const opeModel = this.props.opeModel;

    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // テーブル上の座標を取得
    const point = new Point(x, y);

    //const point = new Point(e.offsetX, e.offsetY);

    const item = pointToGridViewItem(viewModel, opeModel, point, true);
    const ope = opeModel.setHoverItem(item);
    const scroll = dragScroll(viewModel, ope);
    const rangeItem = opeModelToRangeItem(ope);

    this.props.onOperationChange(ope.setRangeItem(rangeItem).setScroll(scroll));

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
