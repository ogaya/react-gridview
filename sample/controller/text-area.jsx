import React from "react";

import {GridViewModel, OperationModel} from "../../dist/react-gridview.js";

import "./text-area.css";

/**
 * テキスト入力エリア
 */
const TextArea = React.createClass({
  displayName: "TextArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  /**
   * セルのテキスト変更処理
   * @param  {object} e inputイベントデータ
   * @return {null}   なし
   */
  _onChangeText(e){
    const opeModel = this.props.operationModel;
    const viewModel = this.props.viewModel;
    // セル選択の描画
    const cellPoint = opeModel && opeModel.selectItem && opeModel.selectItem.cellPoint;

    if(!cellPoint){
      return;
    }

    const view = viewModel.withCell(
      cellPoint, (cell)=>{
        return cell.setText(e.target.value);
      });

    this.props.onControlView(view);
  },
  /**
   * 描画処理
   */
  render: function() {
    const opeModel = this.props.operationModel;
    const viewModel = this.props.viewModel;
    // セル選択の描画
    const cellPoint = opeModel && opeModel.selectItem && opeModel.selectItem.cellPoint;
    const text = (cellPoint) ? viewModel.getCell(cellPoint).text : "";
    const id = (cellPoint) ? cellPoint.toId() : "";

    return (
      <div className="sample-text-area">
        <div className="sample-text-area-id">{id}</div>
        <div className="sample-text-area-box">
          <input type="text" value={text} onChange={this._onChangeText} />
        </div>
      </div>
    );
  }
});

module.exports = TextArea;
