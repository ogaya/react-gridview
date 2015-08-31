import React from "react";

// モデル
import OperationModel from "../../model/operation";
import GridViewModel from "../../model/gridview";
import ExtensionModel from "../../model/extension";

import {Point, Rect} from "../../model/common";

// スタイル
const style =  {
  overflow: "hidden",
  position: "absolute",
  top: "0px",
  left: "0px",
  width: "100%",
  height: "100%"
};

// 表示領域の位置を算出する
function getRenderRect(view, operation){
    const canvasRect = operation.canvasRect || new Rect(0 ,0, 0, 0);

    const x = view.columnHeader.items.get(operation.scroll.columnNo).left;
    const y = view.rowHeader.items.get(operation.scroll.rowNo).top;

    return new Rect(x, y, canvasRect.width, canvasRect.height);
}

// 貼り付けオブジェクト
const Stickies  = React.createClass({
  displayName: "Stickies",
  propTypes: {
    operation: React.PropTypes.instanceOf(OperationModel),
    view: React.PropTypes.instanceOf(GridViewModel),
    extension: React.PropTypes.instanceOf(ExtensionModel),
    onOperationChange: React.PropTypes.func
  },
  _createNodes(){
    const renderRect = getRenderRect(this.props.view, this.props.operation);
    const nodes = this.props.view.stickies
      .filter(sticky => renderRect.isIntersected(sticky.location))
      .map((sticky, key) => {
        //const UserNode = this.props.extension.nodes.get(cell.nodeName);
        const rect = new Rect(
          sticky.location.left - renderRect.left,
          sticky.location.top - renderRect.top,
          sticky.location.width,
          sticky.location.height);
        const userNodeStyle =  {
          overflow: "hidden",
          position: "absolute",
          background: "#F00",
          top: rect.top + "px",
          left: rect.left + "px",
          width: rect.width + "px",
          height: rect.height +  "px"
        };

        return (
          <div key={key} style={userNodeStyle}>
            HEY HEY HEY
          </div>);
      })
      .toArray();
    return nodes;
  },
  render() {
    const nodes = this._createNodes();
    return (
      <div style={style}>
        {nodes}
      </div>
    );
  }
});
// <div style={contents} />
module.exports = Stickies;
