import React from "react";
import ReactDOM from "react-dom";

// gridviewモデル
import {
  GridView,
  Sheet,
  Operation,
  Extension
} from "../dist";

// コンポーネント
import Controller from "./controller";

import "./sample.css";

const ExSample = React.createClass({
  render: function() {
    const sampleStyle = {
      background: "#0F0",
      width: "100%",
      height: "100%"
    };

    const values = this.props.refCells
      .map(cell=>{
        return cell.value;
      })
      .join(":");

    return (
      <div style={sampleStyle}>
        {values}
      </div>
    );
  }
});
const Main = React.createClass({
  getInitialState() {
    let viewModel = Sheet
      .createClass();
    let extension = new Extension();
    extension = extension.addNode("sample", ExSample);
    return {
      viewModel: viewModel,
      operation: new Operation(),
      extension: extension
    };
  },
  setInputFocus(){
      this.refs.viewer.setInputFocus();
  },
  _onChangeSheet(prevView, nextView){
    this.setState({
      viewModel: nextView
    });
    return nextView;
  },
  _onChangeOperation(prevOperation, nextOperation){
    this.setState({
      operation: nextOperation
    });
    return nextOperation;
  },
  _onControlView(view){
    this.setState({
      viewModel: view
    });
  },
  render: function() {
    const operation = this.state.operation;
    return (
      <div>
        <Controller operation={operation} viewModel={this.state.viewModel} setInputFocus={this.setInputFocus}
          onControlView={this._onControlView} onChangeOperation={this._onChangeOperation}/>
        <div className="viewer-area">
          <GridView sheet={this.state.viewModel} operation={operation} ref="viewer"
            extension={this.state.extension} onChangeSheet={this._onChangeSheet} onChangeOperation={this._onChangeOperation}/>
        </div>
      </div>
    );
  }
});


ReactDOM.render(
    <Main />,
    document.getElementById("main")
);
