import React from "react";
//import GridView from "../dist/react-gridview.js";
import {GridView, GridViewModel, OperationModel,
  VERTICAL_ALIGN, TEXT_ALIGN} from "../../dist/react-gridview.js";

const tableStyle ={
  display: "table"
};

const tCellStyle={
  display: "table-cell",
  margin: "1px"
};

const Controller = React.createClass({
  displayName: "Controller",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  _onChangeTextColor(e){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setTextColor(e.target.value)
      });
    this.props.onControlView(view);
  },
  _onChangeTextAlign(e){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setTextAlign(e.target.value)
      });

    this.props.onControlView(view);

  },
  _onChangeVerticalAlign(e){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setVerticalAlign(e.target.value)
      });

    this.props.onControlView(view);

  },
  _onChangeBgColor(e){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setBackground(e.target.value)
      });

    this.props.onControlView(view);

  },
  _onClickMerge(){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setMergeRange(rangeItem)
      });

    this.props.onControlView(view);

  },
  _onClickUnMerge(){
    const rangeItem = this.props.operationModel.rangeItem;

    const view = this.props.viewModel.withCells(
      rangeItem, (cell)=>{
        return cell.setMergeRange(null)
      });

    this.props.onControlView(view);

  },
  render: function() {
    return (
      <div>
        <div>文字色</div>
        <div style={tableStyle}>
          <div style={tCellStyle}>
            <select name="textcolor" onChange={this._onChangeTextColor}>
              <option value="">なし</option>
              <option value="#F00">赤</option>
              <option value="#0F0">緑</option>
              <option value="#00F">青</option>
            </select>
          </div>
          <div style={tCellStyle} >
            <select onChange={this._onChangeVerticalAlign}>
              <option value={VERTICAL_ALIGN.MIDDLE}>中央</option>
              <option value={VERTICAL_ALIGN.TOP}>上</option>
              <option value={VERTICAL_ALIGN.BOTTOM}>下</option>
            </select>
          </div>
          <div style={tCellStyle} >
            <select onChange={this._onChangeTextAlign}>
              <option value={TEXT_ALIGN.RIGHT}>右</option>
              <option value={TEXT_ALIGN.LEFT}>左</option>
              <option value={TEXT_ALIGN.CENTER}>中央</option>
            </select>
          </div>
        </div>

        <div>背景色：</div>
        <div>
          <select name="bgcolor" onChange={this._onChangeBgColor}>
            <option value="">なし</option>
            <option value="#F00">赤</option>
            <option value="#0F0">緑</option>
            <option value="#00F">青</option>
          </select>
        </div>
        <div>
          <input type="button" value="結合" onClick={this._onClickMerge}></input>
          <input type="button" value="解除" onClick={this._onClickUnMerge}></input>
        </div>
      </div>
    );
  }
});

module.exports = Controller;
