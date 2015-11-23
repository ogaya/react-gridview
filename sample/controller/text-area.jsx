import React from "react";

import {Sheet, Operation, OBJECT_TYPE} from "../../dist";

import "./text-area.css";


/**
 * テキスト入力エリア
 */
const TextArea = React.createClass({
  displayName: "TextArea",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(Sheet),
    operationModel: React.PropTypes.instanceOf(Operation),
    onControlView: React.PropTypes.func,
    onChangeOperation: React.PropTypes.func,
    setInputFocus: React.PropTypes.func
  },
  _onChangeSave(){
    const opeModel = this.props.operationModel;
    const viewModel = this.props.viewModel;
    // セル選択の描画
    const cellPoint = opeModel && opeModel.selectItem && opeModel.selectItem.cellPoint;

    if(!cellPoint){
      return;
    }

    const view = viewModel.editCell(
      cellPoint, (cell)=>{
        return cell.setText(opeModel.input.text);
      });

    this.props.onControlView(view);
  },
  /**
   * セルのテキスト変更処理
   * @param  {object} e inputイベントデータ
   * @return {null}   なし
   */
  _onChangeText(e){
    const opeModel = this.props.operationModel;
    const input = opeModel.input;

    if(input.isInputing === false){
      return;
    }

    this.props.onChangeOperation(opeModel, opeModel.setInput(
      input.setText(e.target.value)));

  },
  _onKeyDown(e){
    const opeModel = this.props.operationModel;
    const input = opeModel.input;

    const selectItem = opeModel.selectItem;
    if ((!selectItem) || (selectItem.objectType !== OBJECT_TYPE.CELL)){
      return;
    }

    // 円ターキーを押したとき、入力状態を解除する
    if(e.keyCode === 13){
      this.props.onChangeOperation(opeModel, opeModel
          .setInput(input.setIsInputing(false))
          .downSelect());
      this.props.setInputFocus();
      return;
    }

    if(input.isInputing){
      return;
    }

    this.props.onChangeOperation(opeModel, opeModel.setInput(
      input.setIsInputing(true).setText(this._pickText())));

  },
  _pickText(){
    const opeModel = this.props.operationModel;
    const viewModel = this.props.viewModel;

    if (!opeModel){
      return "";
    }

    const selectItem = opeModel.selectItem;
    if ((!selectItem) || (selectItem.objectType !== OBJECT_TYPE.CELL)){
      return "";
    }

    if (opeModel.input.isInputing){
      return opeModel.input.text;
    }

    const selectCell = viewModel.getCell(selectItem.cellPoint);
    let cellPoint;
    if(selectCell.mergeRange){
      cellPoint = selectCell.mergeRange.leftTopPoint;
    }
    else{
      cellPoint = selectItem.cellPoint;
    }
    return (cellPoint) ? viewModel.getCell(cellPoint).text : "";
  },
  render: function() {
    const opeModel = this.props.operationModel;
    //const viewModel = this.props.viewModel;

    // セル選択の描画
    const cellPoint = opeModel && opeModel.selectItem && opeModel.selectItem.cellPoint;
    const text = this._pickText();
    const id = (cellPoint) ? cellPoint.toId() : "";

    return (
      <div className="sample-text-area">
        <div className="sample-text-area-id">{id}</div>
        <div className="sample-text-area-box">
          <input type="text" value={text} onKeyDown={this._onKeyDown} onChange={this._onChangeText} />
        </div>
      </div>
    );
  }
});

module.exports = TextArea;
