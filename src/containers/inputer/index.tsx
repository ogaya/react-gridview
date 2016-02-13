import * as React    from "react";
import * as ReactDOM from "react-dom";

import Operation from "../../model/operation";
import Sheet from "../../model/sheet";
import {CellPoint} from "../../model/common";

import {KeyPressble, IKeyPress} from "../../mixins/key-pressble";

import {createInputStyle} from "./create-style";
import {inputKeyDown}     from "./key-behavior";
import {copy, paste}      from "./copy-paste";

import {applyMixins} from "../../util/apply-mixins";

export interface InputerProps {
    ref?: string;
    value?: string;
    sheet: Sheet;
    opeModel: Operation;
    onValueChange: (cellPoint: CellPoint, text: string) => void;
    onStateChange: (sheet: Sheet, operation: Operation) => void;
}

export interface InputerState {
    inputText: string;
    controlCellPoint: any;
}

export default class Inputer extends React.Component<InputerProps, InputerState> implements KeyPressble {
    public static displayName = "Gridview-Cells";
 
    state = {
        inputText: "",
        controlCellPoint: null
    };

    _keyPress: IKeyPress;
    _addKeyPressEvent: () => void;
    _removeKeyPressEvent: () => void;

    componentDidMount() {
        let inputText: any = ReactDOM.findDOMNode(this.refs["inputText"])
        inputText.onkeydown = this._onKeyDown;
        this._addKeyPressEvent();
    }

    componentWillUnmount() {
        this._removeKeyPressEvent();
    }

    _setValue = (nextProps: InputerProps) => {
        const selectItem = this.props.opeModel.selectItem;

        if (!selectItem) {
            return;
        }

        const selectCell = nextProps.sheet.getCell(selectItem.cellPoint);
        let cellPoint;
        if (selectCell.mergeRange) {
            cellPoint = selectCell.mergeRange.leftTopPoint;
        }
        else {
            cellPoint = selectItem.cellPoint;
        }

        nextProps.onValueChange(cellPoint, this.props.opeModel.input.text);
    };

    componentWillReceiveProps(nextProps) {
        const prevInput = this.props.opeModel.input;

        // 入力中→入力解除の場合は、変更値をセルに反映させる。
        if ((prevInput.isInputing === true) &&
            (nextProps.opeModel.input.isInputing === false)) {
            this._setValue(nextProps);
        }

        // 入力解除→入力の場合は、セルの値を削除する
        if ((prevInput.isInputing === false) &&
            (nextProps.opeModel.input.isInputing === true)) {
            //this.setState({inputText: ""});
            this.setState((prevState, props) => {
                prevState.inputText = "";
                return prevState;
            });
        }

        const prevSelectItem = this.props.opeModel.selectItem;
        const nextSelectItem = nextProps.opeModel.selectItem;

        if ((!prevSelectItem) ||
            (!prevSelectItem) ||
            (!prevSelectItem.cellPoint.equals(nextSelectItem.cellPoint))) {
            //this.setState({controlCellPoint: null});
            this.setState((prevState, props) => {
                prevState.controlCellPoint = null;
                return prevState;
            });
        }

    }
    
    componentDidUpdate(prevProps:InputerProps){
        if (prevProps.opeModel.selectItem !== this.props.opeModel.selectItem){
            this.setInputFocus();
        }
        
    }

    setInputFocus = () => {
        const inputTest: any = ReactDOM.findDOMNode(this.refs["inputText"]);
        inputTest.focus();
    }

    _onKeyDown = (e) => {
        return inputKeyDown(e, this);
    }

    changeText = (e) => {
        const input = this.props.opeModel.input
            .setText(e.target.value)
            .setIsInputing(true);
        const ope = this.props.opeModel
            .setInput(input)
            .setCopyingRange(null);
        
        this.props.onStateChange(this.props.sheet, ope);
    }

    _onBlur = () => {
        const input = this.props.opeModel.input.setIsInputing(false);
        const ope = this.props.opeModel.setInput(input);
        this.props.onStateChange(this.props.sheet, ope);
    }

    _onCopy = (e) => {
        e.preventDefault();
        copy(e, this.props);

    }

    _onPaste = (e) => {
        e.preventDefault();
        paste(e, this.props);
    }

    render() {
        const style = createInputStyle(this.props.sheet, this.props.opeModel);
        const value = this.props.opeModel.input.text;

        return (
            <textarea style={style} type="text" ref="inputText" value={value}
                onChange={this.changeText} onBlur={this._onBlur}
                onCopy={this._onCopy} onPaste={this._onPaste}/>
        );
    }
}

applyMixins(Inputer, [KeyPressble]);