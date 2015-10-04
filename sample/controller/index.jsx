import React from "react";
//import GridView from "../dist/react-gridview.js";
import {GridViewModel, OperationModel} from "../../dist/react-gridview.js";

import TextArea from"./text-area";
import CellArea from"./cell-area";

const areaStyle = {
  height: "90px",
  position: "relative"
};
const valueStyle = {
  position: "absolute",
  bottom: "0px",
  height: "20px",
  width: "100%"
};

const Controller = React.createClass({
  displayName: "Controller",
  propTypes: {
    viewModel: React.PropTypes.instanceOf(GridViewModel),
    operationModel: React.PropTypes.instanceOf(OperationModel),
    onControlView: React.PropTypes.func
  },
  render: function() {
    return (
      <div style={areaStyle}>
        <CellArea viewModel={this.props.viewModel}
          operationModel={this.props.operationModel} onControlView={this.props.onControlView}/>
        <div style={valueStyle}>
          <TextArea viewModel={this.props.viewModel}
            operationModel={this.props.operationModel} onControlView={this.props.onControlView}/>
        </div>
      </div>
    );
  }
});

// <div>文字色</div>
// <div style={tableStyle}>
//   <div style={tCellStyle}>
//     <select name="textcolor" onChange={this._onChangeTextColor}>
//       <option value="">なし</option>
//       <option value="#F00">赤</option>
//       <option value="#0F0">緑</option>
//       <option value="#00F">青</option>
//     </select>
//   </div>
//   <div style={tCellStyle} >
//     <select onChange={this._onChangeVerticalAlign}>
//       <option value={VERTICAL_ALIGN.MIDDLE}>中央</option>
//       <option value={VERTICAL_ALIGN.TOP}>上</option>
//       <option value={VERTICAL_ALIGN.BOTTOM}>下</option>
//     </select>
//   </div>
//   <div style={tCellStyle} >
//     <select onChange={this._onChangeTextAlign}>
//       <option value={TEXT_ALIGN.RIGHT}>右</option>
//       <option value={TEXT_ALIGN.LEFT}>左</option>
//       <option value={TEXT_ALIGN.CENTER}>中央</option>
//     </select>
//   </div>
// </div>
//
// <div>背景色：</div>
// <div>
//   <select name="bgcolor" onChange={this._onChangeBgColor}>
//     <option value="">なし</option>
//     <option value="#F00">赤</option>
//     <option value="#0F0">緑</option>
//     <option value="#00F">青</option>
//   </select>
// </div>
// <div>
//   <input type="button" value="結合" onClick={this._onClickMerge}></input>
//   <input type="button" value="解除" onClick={this._onClickUnMerge}></input>
// </div>

module.exports = Controller;
