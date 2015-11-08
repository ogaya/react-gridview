import React from "react";

// モデル情報
import OperationModel from "../../model/operation";
import GridViewModel from "../../model/sheet";
import ExtensionModel from "../../model/extension";

import "./css.js";

//const rect = targetToRect(sheet, cellPoint, opeModel.scroll);
const ContextMenu = React.createClass({
  displayName: "React-Sheet-ContextMenu",
  propTypes: {
    view: React.PropTypes.instanceOf(GridViewModel),
    operation: React.PropTypes.instanceOf(OperationModel),
    extension: React.PropTypes.instanceOf(ExtensionModel)
  },
  render() {
    return (
      <div className="rs-context-menu">
        メニュー
      </div>
    );
  }
});

module.exports = ContextMenu;
