import * as React from "react";
import {Sheet, Operation} from "react-gridview";

import TextArea from"./text-area.tsx";
import CellArea from"./cell-area.tsx";
import "./index.css";

export interface Props {
    viewModel: Sheet;
    operation: Operation;
    onControlView: (sheet: Sheet) => void;
    onChangeOperation: (prevOpe: Operation, nextOpe:Operation) => void;
    setInputFocus: () => void;
}

export interface State {
    subWindow: any;
}

export default class Controller extends React.Component<Props, State> {
    public static displayName = "Controller";

    constructor(props: Props, context) {
        super(props, context);

        this.state = {
            subWindow: null
        };
    }

    _showSubWindow(subWindow) {
        this.setState({ subWindow: subWindow });
    }
    render() {
        const subWindow = this.state.subWindow;

        return (
            <div className="controller">
                <CellArea
                    viewModel={this.props.viewModel}
                    operation={this.props.operation}
                    onControlView={this.props.onControlView}
                    showSubWindow={this._showSubWindow.bind(this)}
                />
                <div className="value-area">
                    <TextArea
                        viewModel={this.props.viewModel}
                        onChangeOperation={this.props.onChangeOperation}
                        operation={this.props.operation}
                        onControlView={this.props.onControlView}
                        setInputFocus={this.props.setInputFocus}
                    />
                </div>
                {subWindow}
            </div>
        );
    }
}

