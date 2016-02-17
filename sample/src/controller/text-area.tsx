import * as React from "react";

import {Sheet, Operation, OBJECT_TYPE, SelectInfo} from "react-gridview";

import "./text-area.css";


export interface Props {
    viewModel: Sheet;
    operation: Operation;
    onControlView: (sheet: Sheet) => void;
    onChangeOperation: (prevOpe: Operation, nextOpe: Operation) => void;
    setInputFocus: () => void;
}

export default class TextArea extends React.Component<Props, {}> {
    //const TextArea = React.createClass({
    public static displayName = "TextArea";

    _onChangeSave() {
        const opeModel = this.props.operation;
        const viewModel = this.props.viewModel;
        // セル選択の描画
        const cellPoint = opeModel && opeModel.selectItem && opeModel.selectItem.cellPoint;

        if (!cellPoint) {
            return;
        }

        const view = viewModel.editCell(
            cellPoint, (cell) => {
                return cell.setText(opeModel.input.text);
            });

        this.props.onControlView(view);
    }
  
    /**
     * セルのテキスト変更処理
     * @param  {object} e inputイベントデータ
     * @return {null}   なし
     */
    _onChangeText(e) {
        const opeModel = this.props.operation;
        const input = opeModel.input;

        if (input.isInputing === false) {
            return;
        }

        this.props.onChangeOperation(opeModel, opeModel.setInput(
            input.setText(e.target.value)));

    }
    
    
    _downSelect(ope:Operation) {
        if (!ope.selectItem) {
            return ope;
        }
        // 選択セルを下へ移す
        const target = ope.selectItem.cellPoint.setRowNo(ope.selectItem.cellPoint.rowNo + 1);

        const selectItem = new SelectInfo(ope.selectItem.objectType, target, null, null);
        return ope.setSelectItem(selectItem).resetRange();
    }
    _onKeyDown(e) {
        const opeModel = this.props.operation;
        const input = opeModel.input;

        const selectItem = opeModel.selectItem;
        if ((!selectItem) || (selectItem.objectType !== OBJECT_TYPE.CELL)) {
            return;
        }

        // 円ターキーを押したとき、入力状態を解除する
        if (e.keyCode === 13) {
            const newOpe = opeModel
                .setInput(input.setIsInputing(false));
            this.props.onChangeOperation(
                opeModel, this._downSelect(newOpe));
            this.props.setInputFocus();
            return;
        }

        if (input.isInputing) {
            return;
        }

        this.props.onChangeOperation(opeModel, opeModel.setInput(
            input.setIsInputing(true).setText(this._pickText())));

    }
    _pickText() {
        const opeModel = this.props.operation;
        const viewModel = this.props.viewModel;

        if (!opeModel) {
            return "";
        }

        const selectItem = opeModel.selectItem;
        if ((!selectItem) || (selectItem.objectType !== OBJECT_TYPE.CELL)) {
            return "";
        }

        if (opeModel.input.isInputing) {
            return opeModel.input.text;
        }

        const selectCell = viewModel.getCell(selectItem.cellPoint);
        let cellPoint;
        if (selectCell.mergeRange) {
            cellPoint = selectCell.mergeRange.leftTopPoint;
        }
        else {
            cellPoint = selectItem.cellPoint;
        }
        return (cellPoint) ? viewModel.getCell(cellPoint).text : "";
    }
    render() {
        const opeModel = this.props.operation;
        //const viewModel = this.props.viewModel;

        // セル選択の描画
        const cellPoint = opeModel && opeModel.selectItem && opeModel.selectItem.cellPoint;
        const text = this._pickText();
        const id = (cellPoint) ? cellPoint.toId() : "";

        return (
            <div className="sample-text-area">
                <div className="sample-text-area-id">{id}</div>
                <div className="sample-text-area-box">
                    <input type="text" value={text}
                        onKeyDown={this._onKeyDown.bind(this) }
                        onChange={this._onChangeText.bind(this) } />
                </div>
            </div>
        );
    }
}
