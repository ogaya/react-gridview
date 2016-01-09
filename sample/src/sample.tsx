import * as React from "react";
import * as ReactDOM from "react-dom";

// gridviewモデル
import {
GridView,
Sheet,
Operation,
Extension
} from "react-gridview";

// コンポーネント
import Controller from "./controller/index.tsx";

import "./sample.css";


export interface State {
    viewModel: Sheet;
    operation: Operation;
    extension: Extension;
}

export default class Main extends React.Component<{}, State> {

    constructor(props, context) {
        super(props, context);
        let viewModel = Sheet.create();
        //let extension = new Extension();
        //extension = extension.addNode("sample", ExSample);
        this.state = {
            viewModel: viewModel,
            operation: Operation.createClass(),
            extension: null
        };

    }

    setInputFocus() {
        const viewer: any = this.refs["viewer"]
        viewer.setInputFocus();
    }

    _onChangeSheet(prevView: Sheet, nextView: Sheet) {
        this.setState((prevState, props) => {
            prevState.viewModel = nextView;
            return prevState;
        });

        return nextView;
    }
    _onChangeOperation(prevOperation: Operation, nextOperation: Operation) {
        this.setState((prevState, props) => {
            prevState.operation = nextOperation;
            return prevState;
        });

        return nextOperation;
    }
    _onControlView(view: Sheet) {
        this.setState((prevState, props) => {
            prevState.viewModel = view;
            return prevState;
        });
    }
    render() {
        const operation = this.state.operation;
        return (
            <div>
                <Controller
                    operation={operation}
                    viewModel={this.state.viewModel}
                    setInputFocus={this.setInputFocus}
                    onControlView={this._onControlView.bind(this)}
                    onChangeOperation={this._onChangeOperation.bind(this)}
                />
                <div className="viewer-area">
                    <GridView
                        sheet={this.state.viewModel}
                        operation={operation}
                        ref="viewer"
                        onChangeSheet={this._onChangeSheet.bind(this)}
                        onChangeOperation={this._onChangeOperation.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById("main")
);
