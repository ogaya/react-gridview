import * as React from "react";

import createTopItems       from "./items/top.tsx";
import createGridViewItems  from "./items/gridview.tsx";
import createSheetItems     from "./items/sheet.tsx";
import createOperationItems from "./items/operation.tsx";

import "./index.css";

interface Props{
    hash: string;
}

export default class SideMenu extends React.Component<Props,{}>{
  render() {
    return (
      <div className="side-menu">
        <ul>
          {createTopItems(this.props.hash)}
          {createGridViewItems(this.props.hash)}
          {createSheetItems(this.props.hash)}
          {createOperationItems(this.props.hash)}
        </ul>

      </div>
    );
  }
};
