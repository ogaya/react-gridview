import * as React from "react";
import {GridView} from "react-gridview";

import "./index.css";

export interface Props{
    hash?: string;
}

export default class Top extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <div className="subhead">
          What is this?
        </div>
        <div className="report">
          This component provides a spreadsheet interface to your web application. About this.
        </div>

        <GridView className="gridview-sample" />
      </div>
    );
  }
}
