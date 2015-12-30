//import React from "react";
import ReactDOM from "react-dom";

import {Point} from "./model/common";
import {operationResult} from "./model/lib/change";
import {pointToGridViewItem} from "./model/lib/select";
import {modelToRangeItem} from "./model/common/cell-range";
import {fitForTarget} from "./model/lib/fit-for-target";
import {OBJECT_TYPE} from "./model/sheet/object-type";

//import {targetToRect, cellRangeToRect} from "./model/lib/target_to_rect";


/**
 * ドラッグ時にスクロールする処理
 * @param  {View} sheet 表示情報
 * @param  {Operation} opeModel  操作情報
 * @return {CellPoint}           スクロール場所
 */
function dragScroll(sheet, opeModel){
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

  return fitForTarget(sheet, opeModel, hoverItem.cellPoint);
}

/**
 * メインとなるマウスの書く処理を定義する
 * 要：KeyPress
 */
const MouseEvent = {
  /**
   * マウスホイール処理
   * @param  {Object} e イベント引数
   */
  _onMouseWheel(e){
    const opeModel = this.state.operation;
    let value = opeModel.scroll.rowNo + Math.round(e.deltaY / 100) * 3;

    if (value < 1) {
      value = 1;
    }

    if (opeModel.scroll.rowNo !== value){
      const scroll = opeModel.scroll.setRowNo(value);
      this._onOperationChange(opeModel.setScroll(scroll));
    }
    e.preventDefault();
  },
  _onContextMenu(e){
    e.preventDefault();
  },
  /**
   * マウスアップ処理
   */
  _onMouseUp(){
    const opeModel = this.state.operation;
    const sheet = this.state.sheet;
    const newViewModel = operationResult(sheet, opeModel);

    if (sheet !== newViewModel){
      this._onViewModelChange(newViewModel);
    }
    const ope = opeModel.setOpeItem(null);
    this._onOperationChange(ope);
  },
  /**
   * マウスダウン処理
   *   マウスの下にあるオブジェクトを検出し、選択処理等を行う
   * @param  {Object} e イベント引数
   */
  _onMouseDown(e){

    // 右クリック時、何もしない
    if (e.button === 2){
      return;
    }
    const sheet = this.state.sheet;
    const opeModel = this.state.operation;

    // テーブル上の座標を取得
    const point = new Point(e.offsetX / sheet.scale, e.offsetY / sheet.scale);

    const item = pointToGridViewItem(sheet, opeModel, point);
    this.setInputFocus();

    let ope = opeModel
      .setSelectItem(item)
      .setOpeItem(item);

    if (this._keyPress.ctrl){
      ope = ope.pushClipRanges(ope.rangeItem);
    }
    else {
      ope = ope.clearClipRanges();
    }

    ope = ope.setRangeItem(null);

    const rangeItem = modelToRangeItem(sheet, ope);
    const input = ope.input.setIsInputing(false);
    this._onOperationChange(ope.setRangeItem(rangeItem).setInput(input));
  },
  _onMouseMove(e){
    const node = ReactDOM.findDOMNode(this.refs.gwcells);
    const sheet = this.state.sheet;
    const opeModel = this.state.operation;

    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // テーブル上の座標を取得
    const point = new Point(x / sheet.scale, y / sheet.scale);

    const item = pointToGridViewItem(sheet, opeModel, point, true);
    const ope = opeModel.setHoverItem(item);
    const scroll = dragScroll(sheet, ope);
    const rangeItem = modelToRangeItem(sheet, ope);

    this._onOperationChange(ope.setRangeItem(rangeItem).setScroll(scroll));
  }
};

export{
  MouseEvent
};
