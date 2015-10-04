
import {Point} from "./model/common";
import {operationResult} from "./model/lib/change";
import {pointToGridViewItem} from "./model/lib/select";
import {modelToRangeItem} from "./model/common/cellrange";
import {fitForTarget} from "./model/lib/fit-for-target";
import {OBJECT_TYPE} from "./model/gridview/object-type";

/**
 * ドラッグ時にスクロールする処理
 * @param  {View} viewModel 表示情報
 * @param  {Operation} opeModel  操作情報
 * @return {CellPoint}           スクロール場所
 */
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

  return fitForTarget(viewModel, opeModel, hoverItem.cellPoint);
}

/**
 * メインとなるマウスの書く処理を定義する
 */
const MouseEvent = {
  _keyPress: {
    ctrl: false
  },
  _addEvent(){
    if (document.addEventListener) { // DOMレベル2イベントモデル
      //キャプチャリングイベントハンドラを登録する
      document.addEventListener('keydown', this._onKeyDown, true);
      document.addEventListener('keyup', this._onKeyUp, true);
      document.addEventListener('blur', this._onBlur, true);
    }
  },
  _removeEvent(){
    if (document.removeEventListener) { // DOMレベル2イベントモデル
      document.removeEventListener('mousemove', this._onKeyDown, true);
      document.removeEventListener('mouseup', this._onKeyUp, true);
      document.removeEventListener('blur', this._onBlur, true);
    }
  },
  _onKeyDown(e){
    // この処理は、あくまでマウスイベントをこなすためにある。
    // つまり、キーボードの押しっぱなし状態でジェスチャーを変更させる。
    if(e.keyCode === 17){
      this._keyPress.ctrl = true;
    }
  },
  _onKeyUp(e){
    if(e.keyCode === 17){
      this._keyPress.ctrl = false;
    }
  },
  _onBlur(){
    this._keyPress.ctrl = false;
  },
  /**
   * マウスホイール処理
   * @param  {Object} e イベント引数
   */
  _onMouseWheel(e){
    const opeModel = this.state.operation;
    let value = opeModel.scroll.rowNo + Math.round(e.deltaY / 100);

    if (value < 1) {
      value = 1;
    }

    if (opeModel.scroll.rowNo !== value){
      const scroll = opeModel.scroll.setRowNo(value);
      this._onOperationChange(opeModel.setScroll(scroll));
    }
    e.preventDefault();
  },
  /**
   * マウスアップ処理
   */
  _onMouseUp(){
    const opeModel = this.state.operation;
    const viewModel = this.state.viewModel;
    const newViewModel = operationResult(viewModel, opeModel);

    if (viewModel !== newViewModel){
      this._onViewModelChange(newViewModel);
    }
    const ope = opeModel.setOpeItem(null);
    this._onOperationChange(ope);
  },
  /**
   * マウスダウン処理
   * @param  {Object} e イベント引数
   */
  _onMouseDown(e){
    const viewModel = this.state.viewModel;
    const opeModel = this.state.operation;

    // テーブル上の座標を取得
    const point = new Point(e.offsetX, e.offsetY);

    const item = pointToGridViewItem(viewModel, opeModel, point);
    this.state.setInputFocus();

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

    const rangeItem = modelToRangeItem(viewModel, ope);
    this._onOperationChange(ope.setRangeItem(rangeItem));
  },
  _onMouseMove(e){
    const node = this.refs.gwcells.getDOMNode();
    const viewModel = this.state.viewModel;
    const opeModel = this.state.operation;

    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // テーブル上の座標を取得
    const point = new Point(x, y);

    const item = pointToGridViewItem(viewModel, opeModel, point, true);
    const ope = opeModel.setHoverItem(item);
    const scroll = dragScroll(viewModel, ope);
    const rangeItem = modelToRangeItem(viewModel, ope);

    this._onOperationChange(ope.setRangeItem(rangeItem).setScroll(scroll));
  }
};

export{
  MouseEvent
};
