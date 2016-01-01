import * as React from "react";

// モデル情報
import Operation from "../../model/operation";
import Sheet from "../../model/sheet";
import Extension from "../../model/extension";

import "./css.js";

interface Props {
    sheet: Sheet;
    operation: Operation;
    extension: Extension;
}

interface State {
}

export default class ContextMenu extends React.Component<Props, State> {
//const ContextMenu = React.createClass({
  public static displayName = "React-Sheet-ContextMenu";

  render() {
    return (
      <div className="rs-context-menu">
        メニュー
      </div>
    );
  }
}
