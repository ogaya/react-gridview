import React from "react";
//import GridView from "../dist/react-gridview.js";
import {GridView, GridViewModel} from "../dist/react-gridview.js";
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
  width: "500px",
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
  height: "200px"
}
const Main = React.createClass({
  getInitialState() {
    let viewModel = new GridViewModel();
    viewModel = viewModel.setOnChangeCell((prevCell, nextCell) =>{

      if(nextCell.columnNo === 1){
        return prevCell;
      }
      if(nextCell.columnNo === 2){
        return nextCell;
      }
      return nextCell.setTextColor("#F00");
    });
    return {
      viewModel: viewModel,
      viewJson: viewModel.toJson()
    };
  },
  _onChangeView(prevView, nextView){
    this.setState({
      viewModel: nextView,
      viewJson: nextView.toJson()
    })

    return nextView;
  },
  render: function() {
    const convertStr = JSON.stringify(this.state.viewJson);
    const view = GridViewModel.fromJson(this.state.viewJson);
    return (
      <div style={mainStyle}>
        <div style={viewerStyle}>
          <div style={vStyle}>
            <GridView  onChangeView={this._onChangeView} />
          </div>
          <div>
            変換後：
          </div>
          <div style={vStyle}>
            <GridView viewModel={view}/>
          </div>
        </div>
        <div style={spaceStyle} />
        <div style={converStyle}>
          <div style={pStyle}>
            {convertStr}
          </div>

        </div>
      </div>
    );
  }
});


React.render(
    <Main />,
    document.getElementById('main')
);
