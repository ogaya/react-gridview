import React from "react";

// モデル情報
import OperationModel from "../../model/operation";
import GridViewModel from "../../model/gridview";
import ExtensionModel from "../../model/extension";

// 共通ライブラリ
import {targetToRect, cellRangeToRect} from "../../model/lib/target_to_rect";

// スタイル
const style =  {
  overflow: "hidden",
  position: "absolute",
  top: "0px",
  left: "0px",
  width: "100%",
  height: "100%"
};

//const rect = targetToRect(viewModel, cellPoint, opeModel.scroll);
const ExNodes = React.createClass({
  displayName: "Gridview-ExNodes",
  propTypes: {
    view: React.PropTypes.instanceOf(GridViewModel),
    operation: React.PropTypes.instanceOf(OperationModel),
    extension: React.PropTypes.instanceOf(ExtensionModel)
  },
  _createNodes(){
    const nodes = this.props.view.table
      .filter(cell => this.props.extension.nodes.has(cell.nodeName))
      .map((cell, key) => {
        const UserNode = this.props.extension.nodes.get(cell.nodeName);
        const rect = targetToRect(this.props.view, cell.cellPoint(), this.props.operation.scroll);
        const userNodeStyle =  {
          overflow: "hidden",
          position: "absolute",
          top: rect.top + "px",
          left: rect.left + "px",
          width: rect.width + "px",
          height: rect.height +  "px"
        };
        return (
          <div key={key} style={userNodeStyle}>
            <UserNode />
          </div>);
      })
      .toArray();
    return nodes;
  },
  render() {
    const nodes = this._createNodes();
    //const nodes = null;
    return (
      <div style={style}>
        {nodes}
      </div>
    );
  }
});

module.exports = ExNodes;
