import React from "react";

// gridviewモデル
import {
  GridView,
  GridViewModel,
  OperationModel,
  StickyModel,
  ExtensionModel,
  CellPoint} from "../dist/react-gridview.js";

// コンポーネント
import Controller from "./controller";
//import {StageMixin} from "../dist/react-helix";

const mainStyle = {
  display: "table",
  width: "1000px",
  height: "400px",
  tableLayout: "fixed",
};
const viewerStyle = {
  width: "500px",
  height: "400px",
  display: "table-cell"
};

const spaceStyle ={
  display: "table-cell",
  width: "10px"
};
const converStyle = {
  display: "table-cell",
  width: "50px",
  height: "400px",
  border: "1px solid #999",
  verticalAlign: "top",
  padding: "5px",
  wordWrap: "break-word",
  overflowX: "hidden",
  overflowY: "scroll"
};

const pStyle = {
  width: "490px",
  height: "400px",
  wordWrap: "break-word"
};

const vStyle = {
  height: "400px"
}
const ExSample = React.createClass({
  render: function() {
    const sampleStyle={
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
    viewModel = viewModel.withCell(new CellPoint(2,5), cell =>{
      return cell.setNodeName("sample");
    });
    let sticky = new StickyModel();
    viewModel = viewModel.addSticky(sticky);
    // viewModel = viewModel.setOnChangeCell((prevCell, nextCell) =>{
    //
    //   if(nextCell.columnNo === 1){
    //     return prevCell;
    //   }
    //   if(nextCell.columnNo === 2){
    //     return nextCell;
    //   }
    //   return nextCell.setTextColor("#F00");
    // });

    let extension = new ExtensionModel();
    extension = extension.addNode("sample", ExSample)
    return {
      viewModel: viewModel,
      viewJson: viewModel.toJson(),
      operationModel: new OperationModel(),
      extension: extension
    };
  },
  _onChangeView(prevView, nextView){
    // this.setState({
    //   viewModel: nextView,
    //   viewJson: nextView.toJson()
    // })
    this.setState({
      viewModel: nextView
    })

    return nextView;
  },
  _onChangeOperation(prevOperation, nextOperation){
    this.setState({
      operationModel: nextOperation
    })
    return nextOperation;
  },
  _onControlView(view){
    this.setState({
      viewModel: view
    })
    // this.setState({
    //   viewModel: view,
    //   viewJson: view.toJson()
    // })
  },
  render: function() {
    const convertStr = JSON.stringify(this.state.viewJson);
    const convertView = GridViewModel.fromJson(this.state.viewJson);
    const operation = this.state.operationModel;
    return (
      <div>
        <div>
          <Controller operationModel={operation} viewModel={this.state.viewModel} onControlView={this._onControlView}/>
        </div>
        <div style={mainStyle}>
          <div style={viewerStyle}>
            <div style={vStyle}>
              <GridView viewModel={this.state.viewModel} extension={this.state.extension}
                onChangeView={this._onChangeView} onChangeOperation={this._onChangeOperation}/>
            </div>

          </div>
          <div style={spaceStyle} />
          <div style={converStyle}>
            <div style={pStyle}>
              {convertStr}
            </div>

          </div>
        </div>
      </div>
    );
  }
});

// <div>
//   変換後：
// </div>
// <div style={vStyle}>
//   <GridView viewModel={convertView}/>
// </div>
React.render(
    <Main />,
    document.getElementById('main')
);
