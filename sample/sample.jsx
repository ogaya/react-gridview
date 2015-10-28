import React from "react";
import ReactDOM from "react-dom";

// gridviewモデル
import {
  GridView,
  GridViewModel,
  OperationModel,
//  StickyModel,
  ExtensionModel} from "../dist";

// コンポーネント
import Controller from "./controller";
//import {StageMixin} from "../dist/react-helix";

import "./sample.css";

// const mainStyle = {
//   display: "table",
//   width: "100%",
//   height: "calc(100% - 52px)",
//   tableLayout: "fixed"
// };

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
    let viewModel = new GridViewModel();
    let extension = new ExtensionModel();
    extension = extension.addNode("sample", ExSample);
    return {
      viewModel: viewModel,
      operationModel: new OperationModel(),
      extension: extension
    };
  },
  setInputFocus(){
      this.refs.viewer.setInputFocus();
  },
  _onChangeView(prevView, nextView){
    // this.setState({
    //   viewModel: nextView,
    //   viewJson: nextView.toJson()
    // })
    this.setState({
      viewModel: nextView
    });

    return nextView;
  },
  _onChangeOperation(prevOperation, nextOperation){
    //console.log(prevOperation);
    //console.log(nextOperation);

    this.setState({
      operationModel: nextOperation
    });
    return nextOperation;
  },
  _onControlView(view){
    this.setState({
      viewModel: view
    });
    // this.setState({
    //   viewModel: view,
    //   viewJson: view.toJson()
    // })
  },
  render: function() {
    const operation = this.state.operationModel;
    return (
      <div>
        <Controller operationModel={operation} viewModel={this.state.viewModel} setInputFocus={this.setInputFocus}
          onControlView={this._onControlView} onChangeOperation={this._onChangeOperation}/>
        <div className="viewer-area">
          <GridView viewModel={this.state.viewModel} operationModel={operation} ref="viewer"
            extension={this.state.extension} onChangeView={this._onChangeView} onChangeOperation={this._onChangeOperation}/>
        </div>
      </div>
    );
  }
});


ReactDOM.render(
    <Main />,
    document.getElementById('main')
);
